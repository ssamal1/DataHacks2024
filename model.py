import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader, Dataset
import numpy as np

# Step 1: Load and preprocess the data
data = pd.read_csv('data.csv')

# Handle missing values
data['length'] = data['length'].replace('m', '', regex=True).astype(float)
data['length'] = data['length'].fillna(data['length'].mean())
data['lived_in'] = data['lived_in'].fillna(method='ffill')
data['species'] = data['species'].fillna(method='ffill')

# Extract relevant features and target
features = ['period', 'lived_in', 'length']
target = 'name'
data = data[features + [target]]

# Encode categorical features and target
label_encoders = {}
for col in ['period', 'lived_in', 'name']:  # Include 'name' for target encoding
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le

# Define PyTorch dataset and dataloader
class DinosaurDataset(Dataset):
    def __init__(self, data):
        self.features = data[features].values.astype(float)
        self.targets = data[target].values
        self.label_encoders = label_encoders

    def __len__(self):
        return len(self.features)

    def __getitem__(self, idx):
        features = torch.tensor(self.features[idx])
        target = torch.tensor(self.targets[idx], dtype=torch.long)  # Ensure target is of type long (integer)
        return features, target

# Define a simple neural network model
class DinosaurPredictor(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(DinosaurPredictor, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, hidden_size)
        self.fc4 = nn.Linear(hidden_size, hidden_size)  # Additional hidden layer
        self.fc5 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.fc3(x)
        x = self.relu(x)
        x = self.fc4(x)  # Adding another layer
        x = self.relu(x)  # Activation function
        x = self.fc5(x)
        return x

input_size = len(features)
hidden_size = 128  # Increase the number of neurons in the hidden layers
output_size = len(label_encoders[target].classes_)

model = DinosaurPredictor(input_size, hidden_size, output_size)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)  # Try different learning rates (e.g., lr=0.01, lr=0.0001)

# Prepare data and train the model
dataset = DinosaurDataset(data)
train_set, val_set = train_test_split(dataset, test_size=0.2, random_state=42)

train_loader = DataLoader(train_set, batch_size=32, shuffle=True)
val_loader = DataLoader(val_set, batch_size=32)


def train_model(model, train_loader, val_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs.float())
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()

        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                outputs = model(inputs.float())
                _, predicted = torch.max(outputs, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()  # Calculate number of correctly predicted samples
                val_loss += criterion(outputs, labels).item()

        # Calculate validation accuracy
        validation_accuracy = (correct / total) * 100 if total > 0 else 0.0

        # Print training progress
        print(f'Epoch {epoch+1}/{num_epochs}, '
              f'Training Loss: {running_loss/len(train_loader):.4f}, '
              f'Validation Loss: {val_loss/len(val_loader):.4f}, '
              f'Validation Accuracy: {validation_accuracy:.2f}%')



# Training the model
train_model(model, train_loader, val_loader, criterion, optimizer, num_epochs=10)
