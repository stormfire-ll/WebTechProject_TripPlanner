const express = require('express')
const path = require('path')
const http = require('http') 
const fs = require('fs')    //library for file handling

const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'files')))

//Server setup
const server = http.createServer(function(req, res){
    res.writeHead(200, { 'Content-type': 'text/html' })
    fs.readFile('index.html', function(error, data){
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        }
        res.end()
    }) 
})

//Endpoints: User Authentication
app.get('/register', (req, res) => { 
    res.render('register.html')
})

app.get('/login'), (req, res) => {
    res.render('login.html')
}

server.listen(port, function(error) { //function called if error: pass error or nothing if successful
    if (error) {
        console.log('Listening on port' + port + 'failed.', error) //!no log
    } else {
        console.log('Server is listening on port' + port)
    }
})