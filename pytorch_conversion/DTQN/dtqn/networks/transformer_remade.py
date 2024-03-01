import torch
import torch.nn as nn
from posencoder import PositionalEncoding


class TransformerBlock(nn.Module):
    def __init__(self, d_model, head_size, num_heads, ff_dim, dropout=0):
        super(TransformerBlock, self).__init__()
        self.attention = nn.MultiheadAttention(embed_dim=d_model, num_heads=num_heads, dropout=dropout)
        self.conv1 = nn.Conv1d(in_channels=d_model, out_channels=ff_dim, kernel_size=1)
        self.conv2 = nn.Conv1d(in_channels=ff_dim, out_channels=d_model, kernel_size=1)
        self.layernorm1 = nn.LayerNorm(d_model)
        self.layernorm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, query, key, value):
        # Note: MultiheadAttention expects input of shape (L, N, E) where L is the sequence length, N is the batch size, and E is the embedding dimension.
        attn_output, _ = self.attention(query, key, value)
        out1 = self.layernorm1(query + attn_output)
        
        # Conv1D layers expect input of shape (N, C, L), hence we permute
        out1_permuted = out1.permute(1, 2, 0)
        ff_output = F.relu(self.conv1(out1_permuted))
        ff_output = self.conv2(ff_output)
        
        # Permute back to match the MultiheadAttention output shape
        ff_output = ff_output.permute(2, 0, 1)
        out2 = self.layernorm2(out1 + self.dropout(ff_output))
        
        return out2

class TransformerModel(nn.Modu):
    def __init__(self, num_input_samples, d_model, head_size, num_heads, ff_dim, dropout=0, num_transformers=10):
        super(TransformerModel, self).__init__()  # Corrected super() call
        self.d_model = d_model
        self.input_projection = nn.Linear(1, d_model)
        self.pos_encoding = PositionalEncoding(d_model, num_input_samples)
        self.transformers = nn.ModuleList([
            TransformerBlock(d_model, head_size, num_heads, ff_dim, dropout) 
            for _ in range(num_transformers)
        ])
        self.global_avg_pooling = nn.AdaptiveAvgPool1d(1)
        self.output_layer = nn.Linear(d_model, 1)

    def forward(self, x):
        x = self.input_projection(x)  # Projects input to d_model dimensions
        x = x + self.pos_encoding(x)  # Apply positional encoding

        for transformer in self.transformers:
            x = transformer(x, x, x)  # Process through transformer blocks

        x = x.mean(dim=1, keepdim=True)  # Aggregate features
        x = self.output_layer(x)  # Apply the output layer to get the final prediction
        
        return x
