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
const member = model.member

//endpoint menampilkan semua data member, method: GET, function: findAll()
app.get("/", (req,res) => {
    member.findAll()
        .then(result => {
            res.json({
                member : result
            })
        })
        .catch(error => {
             res.json({
                message: error.message
            })
        })
})

//menampilkan data member berdasarkan id
app.get("/:id_member", (req, res) =>{
    member.findOne({ where: {id_member: req.params.id_member}})
    .then(result => {
        res.json({
            member: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data member, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        tlp : req.body.tlp
    }

    member.create(data)
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

//endpoint mengupdate data member, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_member : req.params.id
    }
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        tlp : req.body.tlp
    }
    member.update(data, {where: param})
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

//endpoint menghapus data member, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_member : req.params.id
    }
    member.destroy({where: param})
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