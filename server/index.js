const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

//Connecting to DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }catch(error){
        console.error("Error connecting MongoDB");
        process.exit(1);
    }
};

connectDB();


// Middlewares
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);


const PORT = 8000;

app.listen(PORT,() => {
    console.log("Listining on port number " + PORT);
})

