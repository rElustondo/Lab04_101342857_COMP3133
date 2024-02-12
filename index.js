const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(userRouter);

const connectionString = "mongodb+srv://rodrigo:YHzLdkuvhwHQ8ZUZ@cluster0.bbqnvc3.mongodb.net/comp3133_lab04?retryWrites=true&w=majority"

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
    app.listen(SERVER_PORT, () => { console.log('Server is running...')
});
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

