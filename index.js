//import library functions for nodejs application
const express = require('express')
const cors = require('cors')

//create server for node application
app = express()

//for json object from request
app.use(express.json())

//allow website to access crud operation with nodejs application
app.use(cors())

//route function from other modules
require('./routes/partners')(app)
require('./routes/users')(app)
require('./routes/account')(app)
require('./routes/camera')(app)
require('./routes/usr_map')(app)

//listen port on nodejs application
app.listen(3000)