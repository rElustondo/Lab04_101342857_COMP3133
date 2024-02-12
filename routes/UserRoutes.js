const express = require('express');
const User = require('../models/Users');
const app = express();

app.post("/users", async (req,res)=>{
    try{
        let user = req.body
        const newUser = new User(user);
        await newUser.validate();
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        console.log(error)
        res.status(400).json({ error: error.message });
    }
})

module.exports = app