const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongoose')
const cors = require('cors')
const conf = require('config')


const app = express()
const PORT = conf.get('port') || 6000


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/api/group', require('./routes/groups.routes'))
app.use('/api/user', require('./routes/users.routes'))
app.use('/api/lead', require('./routes/leads.routes'))
app.use('/api/login', require('./routes/login.routes'))


const serverStart = async () => {
    try {
        await mongo.connect(conf.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen( PORT, () => console.log(`Started at port ${PORT}`) )
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

serverStart()