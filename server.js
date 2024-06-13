const express = require('express');
const connectDB = require('./db/db');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

//connect db
connectDB();

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})