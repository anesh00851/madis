const express = require('express');
const path = require('path');
const fs = require('fs')
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

app.get('/madis/select', (req, res) => {
    res.sendFile((path.join(__dirname + '/www/index.html')))
});

app.post('/addcustomer', (req, res, next) => {
    const bookridejson = JSON.stringify(req.body)
    // console.log(bookridejson)
    const dataBuffer = fs.readFileSync('customer.json')
    const dataJSON = dataBuffer.toString()
    const cdrels = JSON.parse(dataJSON)
    cdrels.push(JSON.parse(bookridejson))
    const cdrelsstringfy = JSON.stringify(cdrels)
    fs.writeFileSync('customer.json', cdrelsstringfy)
    res.json(JSON.parse(cdrelsstringfy))
})

app.get('/getaddress/:mobilenumber', (req, res, next) => {
    const dataBuffer = fs.readFileSync('address.json')
    const dataJSON = dataBuffer.toString()
    const cdrels = JSON.parse(dataJSON)
    let address = {}
    for (let [keyvall, objval] of Object.entries(cdrels)) {
        if (keyvall, objval.mobileinput === req.params.mobilenumber) {
            address = objval
        }
    }
    res.format({
        json() {
            res.send(address)
        }
    })
})

app.post('/addaddress', (req, res, next) => {
    const addressjson = JSON.stringify(req.body)
    // console.log(addressjson)
    const dataBuffer = fs.readFileSync('address.json')
    const dataJSON = dataBuffer.toString()
    const cdrels = JSON.parse(dataJSON)
    cdrels.push(JSON.parse(addressjson))
    const cdrelsstringfy = JSON.stringify(cdrels)
    fs.writeFileSync('address.json', cdrelsstringfy)
    res.json(JSON.parse(addressjson))
})

app.post('/acknowledge', (req, res, next) => {
    const bookridejson = JSON.stringify(req.body)
    // console.log(bookridejson)
    const dataBuffer = fs.readFileSync('acknowledge.json')
    const dataJSON = dataBuffer.toString()
    const cdrels = JSON.parse(dataJSON)
    cdrels.push(JSON.parse(bookridejson))
    const cdrelsstringfy = JSON.stringify(cdrels)
    fs.writeFileSync('acknowledge.json', cdrelsstringfy)
    res.json(JSON.parse(cdrelsstringfy))
})

app.post('/getacknowledge', (req, res, next) => {
    const signtre = JSON.stringify(req.body.acknowledge)
    // console.log(signtre)
    const dataBuffer = fs.readFileSync('acknowledge.json')
    const dataJSON = dataBuffer.toString()
    const cdrels = JSON.parse(dataJSON)
    // console.log("@", cdrels)
    let signature = {}
    for (let [keyvall, objval] of Object.entries(cdrels)) {
            // console.log(keyvall,"$",objval.acknowledge)
            if(JSON.stringify(objval.acknowledge) == signtre){
                signature = JSON.stringify(objval.acknowledge)
            }
    }
    res.format({
        json() {
            res.send(signature)
        }
    })
})

app.listen(port, host, () => {
    console.log(`server listening on port ${port}`)
})
