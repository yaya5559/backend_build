

const express = require('express');
const mongoose =  require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadRoutes = require("./routes/upload");
const path = require("path")


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log('MongoDB Connected'))//if the connection is successful
  .catch(err => console.log(err)); //  if conn fails


const Users = require('./models/Users');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const videoRoutes = require('./routes/videoRoutes');


app.use('/api/video', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname,"uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

