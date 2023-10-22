const express = require('express')
const mongoose = require('mongoose')
const commentRouter = require('./routes/commentRoute')
const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoute')

const url = 'mongodb://localhost:27017/blogdatabase'

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected to MongoDB...')
})


app.use('/users',userRouter)

app.use('/posts',postRouter)

app.use('/comments',commentRouter)

app.listen(9000, () => {
    console.log('Server started')
})