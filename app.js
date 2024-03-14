const express = require('express')
const morgan = require('morgan')
const AppError = require('./AppError')
const app = express()


// FUNCTIONS

const verify = (req,res,next) => {
     console.log(req.query.password)
    if(req.query.password === "MyPass"){
        next()
    } 
    throw new AppError("Unauthorized!", 403)
}

// FUNCTIONS END


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


// PATHING START

app.get('/', (req,res) => {
    console.log(`Request Time: ${req.requestTime}`)
    res.send("Homepage")
})

app.get('/error', (req,res) => {
    dog.bark()
})

app.get('/dogs', (req,res) => {
    res.send("Dog Page")
})

app.get('/secret', verify, (req,res) => {
    res.send("my secret page")
})

// PATHING END

// ERROR HANDLING START

// app.use((err,req,res,next) => {
//     console.log("***********************************************")
//     console.log("********************ERROR**********************")
//     console.log("***********************************************")
//     console.log(err)
//     next(err)
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err
    res.status(status).send(message)
})

// ERROR HANDLING END

app.listen('3000', () => {
    console.log("Listening")
})

