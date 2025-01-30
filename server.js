const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001; 


const dbURI = 'mongodb://localhost:27017/organizationIT'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB veritabanına bağlandı');
    app.listen(port, () => { 
      console.log(`Sunucu ${port} portunda çalışıyor`);
    });
  })
  .catch(err => console.log('MongoDB bağlantı hatası:', err));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  date: Date
});

const Task = mongoose.model('Task', taskSchema); 


app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json({ error: err.message }));
});



app.post('/tasks', (req, res) => {
  const newTask = new Task(req.body);
  newTask.save()
    .then(task => res.status(201).json(task)) 
    .catch(err => res.status(400).json({ error: err.message }));
});


app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'Görev bulunamadı' });
            }
            res.status(204).end(); 
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.patch('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Görev bulunamadı' });
        }
        res.json(task);
      })
      .catch(err => res.status(400).json({ error: err.message }));
  });