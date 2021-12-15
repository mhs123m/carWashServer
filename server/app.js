require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user');
const storeRouter = require('./routes/store');
const morgan = require('morgan')
const cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser: true,
	useUnifiedTopology: true,
})

app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(userRouter);
app.use(storeRouter);


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

module.exports = app