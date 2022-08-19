const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const app = express();

require('dotenv/config')
const api = process.env.API_URL
// middleware
app.use(express.json())
app.use(morgan('tiny'))
app.get(`${api}/products`, (req, res)=>{
    const product = {
        id: 1,
        name: "Amad Ul Hassan",
        image: "some_url"
    }
    res.send(product)
});
app.post(`${api}/products`, (req, res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct)
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Database connection is ready...")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log(api)
    console.log("server is running http://localhost:3000")
})