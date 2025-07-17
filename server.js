const express = require('express');
const path = require('path');
const fs = require('fs')
// const locations = require('../location.json');
const { json } = require('stream/consumers');
const app = express();
const host = '0.0.0.0';
const port = 3000;


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/', express.static('www'));

app.get('/login', (req, res) => {
    res.sendFile((path.join(__dirname + '/www/index.html')))
});

// app.get('/locations', (req, res) => {
//     res.send(JSON.stringify(locations))
// });

// app.post('/bookride', (req, res, next) => {
//     const bookridejson = JSON.stringify(req.body)
//     console.log(bookridejson)
//     const dataBuffer = fs.readFileSync('cdrel.json')
//     const dataJSON = dataBuffer.toString()
//     const cdrels = JSON.parse(dataJSON)
//     cdrels.push(JSON.parse(bookridejson))
//     const cdrelsstringfy = JSON.stringify(cdrels)
//     fs.writeFileSync('cdrel.json', cdrelsstringfy)
//     res.json(JSON.parse(cdrelsstringfy))
// })

app.listen(port, host, () => {
    console.log(`server listening on port ${port}`)
})
