from sklearn.discriminant_analysis import StandardScaler
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import tensorflow as tf
import torch
import os


def grab_n_previous_prices(model_data, n):
    """
    For the given model_data, grab the n previous prices and store as a list
    in a new column called 'n_previous_prices' for each row's associated 'Date'.
    The current date's price should not be included in the list of previous prices.
    :param pd.DataFrame model_data: data (model_data to grab from)
    :param int n: Number of previous prices to grab
    """
    # Create a new column to store the n_previous_prices
    model_data['n_previous_prices'] = None

    # Iterate through each row
    for index, row in model_data.iterrows():
        # Grab the date and price for the current row
        date = row['Date']
        price = row['Price']

        # Grab the n previous prices
        n_previous_prices = model_data.loc[model_data['Date'] < date]['Price'].tail(n).tolist()

        # Store the n_previous_prices in the new column
        model_data.at[index, 'n_previous_prices'] = n_previous_prices

    return model_data


def months_ahead_output(model_data, months_ahead, output_column_name='Price'):
    """
    For the given model_data, shift the 'Price' column such that it's some number `months_ahead`
    ahead of the current date so the model using this data can predict the prcie that many
    months ahead.
    :param pd.DataFrame model_data: data (model_data to grab from)
    :param int months_ahead: Number of months ahead to shift the 'Price' column
    """
    # Shift the 'Price' column by `months_ahead` months
    model_data[output_column_name] = model_data[output_column_name].shift(-months_ahead)

    return model_data


def divide_inputs_and_outputs(row, output_column_name='Price'):
    """
    Create a column to specifically be input into an ML model and a column for output
    :param pd.DataFrame row: row to divide

    :return: row with input and output columns
    """
    output = row[output_column_name]
    inputs = row[2:-1].tolist()

    # For each element in n_previous_price, add it to the inputs
    for price in row['n_previous_prices']:
        inputs.append(price)

    return pd.Series([inputs, output], index=['inputs', 'output'])


def format_for_ML_usage_tf(inputs, outputs, num_input_samples):
    """
    Given the inputs and outputs for the model, format the data to be used for ML.
    This is accomplished by splitting the data into training/test tensors
    :param inputs: inputs for the model (list of lists)
    :param output: output for the model (list of values)

    :return: The tensors responsible for testing/training the model and the scaler used to scale the data
            (x_train_tensor, x_test_tensor, y_train_tensor, y_test_tensor, scaler)
    """
    
    # Create a train/test split for the dataset
    x_train, x_test, y_train, y_test = train_test_split(inputs, outputs, test_size=0.2, shuffle=False)

    # Determine if there are any nan values in x_train
    for i in range(len(x_train)):
        if np.isnan(x_train[i]).any():
            print(f'x_train[{i}] has nan values! Check the data!')

    # Convert them all to numpy arrays
    x_train = np.array(x_train).reshape(-1, num_input_samples)
    x_test = np.array(x_test).reshape(-1, num_input_samples)
    y_train = np.array(y_train).reshape(-1, 1) # required reshape for StandardScaler
    y_test = np.array(y_test).reshape(-1, 1) # required reshape for StandardScaler

    # Standardize/Normalize the dataset
    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train).reshape(-1, num_input_samples, 1)
    x_test_scaled = scaler.transform(x_test).reshape(-1, num_input_samples, 1)
    y_train_scaled = scaler.fit_transform(y_train)
    y_test_scaled = scaler.transform(y_test)

    # Convert to tensors for model ingestion (true training data)
    x_train_tensor = tf.convert_to_tensor(x_train_scaled)
    x_test_tensor = tf.convert_to_tensor(x_test_scaled)
    y_train_tensor = tf.convert_to_tensor(y_train_scaled)
    y_test_tensor = tf.convert_to_tensor(y_test_scaled)

    return (x_train_tensor, x_test_tensor, y_train_tensor, y_test_tensor, scaler)


def format_for_ML_usage_torch(inputs, outputs, num_input_samples, num_features=9):
    """
    Given the inputs and outputs for the model, format the data to be used for ML with PyTorch.
    This is accomplished by splitting the data into training/test sets, scaling, and converting to PyTorch tensors.
    :param inputs: inputs for the model (list of lists)
    :param outputs: output for the model (list of values)
    :param num_input_samples: Number of samples in input sequences
    :param num_features: Number of features per input sample

    :return: The tensors responsible for testing/training the model and the scaler used to scale the data
            (x_train_tensor, x_test_tensor, y_train_tensor, y_test_tensor, scaler)
    """

    # Create a train/test split for the dataset
    x_train, x_test, y_train, y_test = train_test_split(inputs, outputs, test_size=0.2, shuffle=False)

    # Check for NaN values in x_train
    for i in range(len(x_train)):
        if np.isnan(x_train[i]).any():
            print(f'x_train[{i}] has nan values! Check the data!')

    # Convert to numpy arrays without unnecessary reshaping
    x_train = np.array(x_train)
    x_test = np.array(x_test)
    y_train = np.array(y_train).reshape(-1, 1)  # Only reshape y because we want to scale it as a single column
    y_test = np.array(y_test).reshape(-1, 1)

    # Standardize/Normalize the dataset
    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)
    y_train_scaled = scaler.fit_transform(y_train)
    y_test_scaled = scaler.transform(y_test)

    # Convert scaled data to PyTorch tensors
    x_train_tensor = torch.tensor(x_train_scaled, dtype=torch.float32)
    x_test_tensor = torch.tensor(x_test_scaled, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train_scaled, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test_scaled, dtype=torch.float32)

    return (x_train_tensor, x_test_tensor, y_train_tensor, y_test_tensor, scaler)


def get_model_data_from_directory(model_data_directory, sample_columns, N_TREND_SAMPLES=3):
    """
    Based off the directory provided in the constant MODEL_DATA_DIRECTORY, grab the model_data

    :return: A finalized csv of the model data ready for numpy/tensor conversion
    """
    # Grab all the files in the directory
    model_data = pd.DataFrame(columns = sample_columns)
    for file in os.listdir(model_data_directory):
        data_to_concat = pd.read_csv(os.path.join(model_data_directory, file))
        
        # Sort model data where the earliest date comes first and the latest data comes last
        data_to_concat['Date'] = pd.to_datetime(data_to_concat['Date'])
        data_to_concat = data_to_concat.sort_values(by='Date')

        # Get the n previous prices
        data_to_concat = grab_n_previous_prices(data_to_concat, N_TREND_SAMPLES)

        # Remove the rows where the len(n_previous_prices) != N_TREND_SAMPLES
        data_to_concat = data_to_concat[data_to_concat['n_previous_prices'].apply(lambda x: len(x) == N_TREND_SAMPLES)]

        # The 'Sentiment' column contains some nan values when articles weren't published. Replace these with 0
        data_to_concat['Sentiment'] = data_to_concat['Sentiment'].fillna(0)

        # Concat all the data together
        model_data = pd.concat([model_data, data_to_concat], ignore_index=True).drop(columns=['Unnamed: 0'])

    return model_data