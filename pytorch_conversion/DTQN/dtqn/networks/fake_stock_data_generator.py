
import pandas as pd
import numpy as np

def generate_stock_data(days=100, initial_price=100):
    # Set seed for reproducibility
    np.random.seed(42)

    # Generate fake stock price data
    prices = [initial_price]

    # Simulate stock price changes
    for _ in range(1, days):
        # Random fluctuation: -5% to +5% change, with occasional steep changes up to ±20%
        change_percent = np.random.normal(0, 0.03) + np.random.choice([0, np.random.uniform(-0.2, 0.2)], p=[0.9, 0.1])
        new_price = prices[-1] * (1 + change_percent)
        prices.append(new_price)

    # Create DataFrame
    df_prices = pd.DataFrame({'Day': range(1, days + 1), 'Price': prices})

    # Determine warnings based on steep changes
    def determine_warning(change):
        if abs(change) >= 5 and abs(change) < 10:
            return 'Moderate'
        elif abs(change) >= 10:
            return 'High'
        else:
            return None

    # Calculate day-to-day percentage change in prices
    df_prices['Percent_Change'] = df_prices['Price'].pct_change() * 100
    df_prices['Warning'] = df_prices['Percent_Change'].apply(determine_warning)

    df_prices.to_csv('fake_stock_data.csv', index=False)



# Example usage
if __name__ == "__main__":
    df_prices = generate_stock_data(10000)
