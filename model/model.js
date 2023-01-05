const mysql = require('mysql2')

//mysql configuration for node js application
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'GARUDA',
    port:3306
})

//connection checking function store in variable in connect variable
const connect = ()=>{
    connection.connect(err => {
        if (err) {
            console.log('database not connected')
        }
        else {
            console.log('database connected')
        }
    })
}

//exports this variable to better other can access easily in other files
module.exports = {connection , connect}