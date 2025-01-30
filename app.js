const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/todoModel');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to ToDo List App!');
});

app.post('/todos', async (req, res) => { 
    try {
        const newTodo = new Task({ 
            title: req.body.text, 
        });
        await newTodo.save();
        res.json(newTodo); 
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while adding a task');
    }
});



app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});