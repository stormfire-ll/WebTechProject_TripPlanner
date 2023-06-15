const http = require('http') 
const fs = require('fs')
const port = 3000

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

server.listen(port, function(error) { //function called if error: pass error or nothing if successful
    if (error) {
        console.log('Something went wrong', error) //!no log
    } else {
        console.log('Server is listening on port' + port)
    }
})