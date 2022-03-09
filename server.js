import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Videos from './dbModels.js'

//App configuration
const app = express()
const port = process.env.PORT || 9000
const connection_url ='mongodb+srv://mydb:mydb@cluster0.xqguj.mongodb.net/mydb?retryWrites=true&w=majority'

//Middleware

app.use(express.json())
app.use(cors())

// Datatbase connection

mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
    )

//API  ENDPOINTS
app.get('/', (req,res) => {
    res.status(200).send("Hello World")
})
app.post('/v2/posts' , (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
         if (err){
             res.status(500).send(err)
         }else {
             res.status(201).send(data)
         }
    })
})

app.get('/v2/posts', (req,res) => {
    Videos.find((err,data) => {
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})




app.listen(port, () => console.log(`Listening on localhost: ${port}`))