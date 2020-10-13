const express = require('express');
const dotenv = require('dotenv');

dotenv.config();


const app = express()

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({message: 'Api working'})
})

app.use('/api/register', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})