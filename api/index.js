const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');  // For generating unique IDs

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Store data (in-memory)
let jsonData = [];

// Endpoint to store data
app.post('/store', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({ message: 'Invalid JSON data' });
    }

    // Add unique ID to the data
    const newData = { ...data, id: uuid.v4() };
    jsonData.push(newData);

    // (Optional) Save to file
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2));

    res.json({ message: 'Data stored successfully', data: newData });
});

// Endpoint to retrieve stored data
app.get('/data', (req, res) => {
    res.json(jsonData);
});

// Endpoint to delete data by ID
app.delete('/data/:id', (req, res) => {
    const { id } = req.params;

    // Find the index of the data to be deleted
    const index = jsonData.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Data not found' });
    }

    // Remove the item from the array
    jsonData.splice(index, 1);

    // (Optional) Update the file with the new data
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2));

    res.json({ message: 'Data deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
