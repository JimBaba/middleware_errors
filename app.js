const express = require('express')
const morgan = require('morgan')
const AppError = require('./AppError')
const app = express()


// MIDDLEWARE
// app.use(morgan('dev'))
app.use((req,res,next) => {
    req.requestTime = Date.now()
    console.log(req.method, req.path)
    return next()
})

app.use('/dogs', (req,res,next) => {
    console.log("Runs only on /dogs")
    return next()
})

// MIDDLEWARE END

// EROOR HANDLING START

app.use((err,req,res,next) => {
    console.log("***********************************************")
    console.log("********************ERROR**********************")
    console.log("***********************************************")
    console.log(err)
    next(err)
})

// EROOR HANDLING END

// FUNCTIONS
const verify = (req,res,next) => {
     
    if(req.query.password === "myPass"){
        next()
    } 
    throw new AppError("You need a password!!!!", 401)
}

// FUNCTIONS ENd

app.listen('3000', () => {
    console.log("Listening")
})

app.get('/', (req,res) => {
    console.log(`Request Time: ${req.requestTime}`)
    res.send("Homepage")
})

app.get('/dogs', (req,res) => {
    res.send("Dog Page")
})

app.get('/secret', verify, (req,res) => {
    res.send("my secret page")
})

app.use((req,res) => {
    res.status(404).send("NOT FOUND")
})