const express = require('express');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
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

app.get('/fud-ista/select', (req, res) => {
    res.sendFile((path.join(__dirname + '/www/index.html')))
});

app.get('/fud-ista/pay', (req, res) => {
    res.sendFile((path.join(__dirname + '/www/index.html')))
});

app.get('/fud-ista/address', (req, res) => {
    res.sendFile((path.join(__dirname + '/www/index.html')))
});

app.get('/acknowledgeui', function(req, res) {
    res.sendFile('acknowledge.html', {root: __dirname })
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
        if (JSON.stringify(objval.acknowledge) == signtre) {
            signature = JSON.stringify(objval.acknowledge)
        }
    }
    res.format({
        json() {
            res.send(signature)
        }
    })
})

app.get('/getcustomerlist', (req, res, next) => {
    const dataBuffer = fs.readFileSync('customer.json')
    const dataJSON = dataBuffer.toString()
    let response
    let responseData
    let error
    let custlisttemplate = "<div style='display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:45px'>"
    for (let [keyvall, objval] of Object.entries(JSON.parse(dataJSON))) {
        // console.log(keyvall, "$",objval.customervegis)
        for (let [keyval2, objval2] of Object.entries(objval.customervegis)) {
            // console.log(keyval2, "$", objval2)
            custlisttemplate += "<p style='margin-top: 0px;margin-bottom: 0px;'><span>" + keyval2 + " - </span>" + objval2 + "</p>"
        }
        for (let [keyval3, objval3] of Object.entries(objval.address)) {
            // console.log(keyval3, "$", objval3)
            custlisttemplate += "<p style='margin-top: 0px;margin-bottom: 0px;'><span>" + keyval3 + " - </span>" + objval3 + "</p>"
        }
        custlisttemplate += "<p style='color:white;background-color:orange;margin-top: 0px;margin-bottom: 0px;'>" + objval.acknowledge + "</p>"
        custlisttemplate += "<p style='color:white;background-color:orange;margin-top: 0px;margin-bottom: 0px;'>" + objval.free + "</p>"
        custlisttemplate += "<p style='color:white;background-color:orange;margin-top: 0px;margin-bottom: 0px;'>" + objval.lattitude + "</p>"
        custlisttemplate += "<p style='color:white;background-color:orange;margin-top: 0px;margin-bottom: 0px;'>" + objval.longitude + "</p>"
        custlisttemplate += "<p style='color:red;margin-top: 0px;margin-bottom: 0px;'>******************</p>"
    }
    custlisttemplate += "</div>"
    res.send(custlisttemplate)
})

app.listen(port, host, () => {
    console.log(`server listening on port ${port}`)
})
