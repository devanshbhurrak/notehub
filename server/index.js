const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./Routes/auth')
const notesRoutes = require('./Routes/notes')
const app = express();
const PORT = process.env.PORT || 6969

dotenv.config();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("Connection error:", err));

app.get('/', (req, res) => {
    res.send("sever is running")
})

app.use('/auth', authRoutes)
app.use('/notes', notesRoutes)
app.use('/files', express.static('files'))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})
