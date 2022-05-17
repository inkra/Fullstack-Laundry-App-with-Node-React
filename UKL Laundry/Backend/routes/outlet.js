//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const outlet = model.outlet

//endpoint menampilkan semua data outlet, method: GET, function: findAll()
app.get("/", (req,res) => {
    outlet.findAll()
        .then(result => {
            res.json({
                outlet : result
            })
        })
        .catch(error => {
             res.json({
                message: error.message
            })
        })
})

//menampilkan data outlet berdasarkan id
app.get("/:id_outlet", (req, res) =>{
    outlet.findOne({ where: {id_outlet: req.params.id_outlet}})
    .then(result => {
        res.json({
            outlet: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data outlet, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        tlp : req.body.tlp
    }

    outlet.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data outlet, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_outlet : req.params.id
    }
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        tlp : req.body.tlp
    }
    outlet.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data outlet, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_outlet : req.params.id
    }
    outlet.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app