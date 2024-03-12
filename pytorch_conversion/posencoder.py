import torch
import torch.nn as nn
import math

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        # Create a long enough positional encoding
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * -(math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        # Register as a buffer that is not a model parameter
        self.register_buffer('pe', pe)

    def forward(self, x):
        # x is [batch_size, seq_len, feature_size]
        # Adjust positional encoding to have the same size as the input
        pe = self.pe[:x.size(1), :]  # Shape: [seq_len, d_model]
        pe = pe.squeeze(1)  # Remove the singleton dimension
        # Ensure pe is expanded to match the batch size of x
        pe = pe.unsqueeze(0).repeat(x.size(0), 1, 1)  # Shape: [batch_size, seq_len, d_model]
        # The add operation below should now be vali