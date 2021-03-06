const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
// const bodyParser = require('body-parser');

const app = express()

app.use(express.json());
app.use(express.urlencoded());


const port = 8000;
var apiRouter = require("./routes/api");

app.use(cors());
app.use(apiRouter)
// console.log(Math.sqrt(7676467767676576576576575675677))
// console.log(2+2)
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

var mongoUrl = 'mongodb://127.0.0.1/pizzaShop'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`)
})
