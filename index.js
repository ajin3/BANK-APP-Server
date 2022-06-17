//server creation

// import express

const express = require('express')

//import dataService 

const dataService = require('./services/data.service')

//server app create using express

const app = express()

//parse JSON data

app.use(express.json())

//Bank server

//Register API

app.post('/register',(req,res)=>{
//register solving
const result = dataService.register(req.body.username,req.body.acno,req.body.password)
res.status(result.statusCode).json(result)
})

//Login API

app.post('/login',(req,res)=>{
    //login solving
    const result = dataService.login(req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)
    })

//Deposit API

app.post('/deposit',(req,res)=>{
    //deposit solving
    const result = dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
    })

//Withdraw API

app.post('/withdraw',(req,res)=>{
    //deposit solving
    const result = dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
    })

    //Transaction API

app.post('/transaction',(req,res)=>{
    //transaction solving
    const result = dataService.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
    })


//User request resolving

//GET request - to fetch data

app.get('/',(req,res)=>{
    res.send("GET Request")
})

//POST Request - to create data

app.post('/',(req,res)=>{
    res.send("POST Request")
})

//PUT Request - to modify entire data

app.put('/',(req,res)=>{
    res.send("PUT Request")
})

//PATCH Request - to modify partially

app.patch('/',(req,res)=>{
    res.send("PATCH Request")
})

//DELETE Request - to delete data

app.delete('/',(req,res)=>{
    res.send("DELETE Request")
})

//set up port number to the server app

app.listen(3000,()=>{
    console.log("Server started at 3000");
})