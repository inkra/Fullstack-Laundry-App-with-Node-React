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
const user = model.user

//endpoint menampilkan semua data user, method: GET, function: findAll()
app.get("/", auth, async (req,res) => {
    let result =  await user.findAll({
        include: [
            "outlet",
            {
                model: model.outlet,
                as : "outlet",
            }
        ]
    })
    res.json({
        user: result
    })
})

//menampilkan data user berdasarkan id
app.get("/:id_user", async (req, res) =>{
    let result =  await user.findOne({
        where: {id_user: req.params.id_user},
        include: [
            "outlet",
            {
                model: model.outlet,
                as : "outlet",
            }
        ]
    })
    res.json({
        user: result
    })
})

//endpoint untuk menyimpan data user, METHOD: POST, function: create
app.post("/", auth, (req,res) => {
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password),
        id_outlet : req.body.id_outlet,
        role : req.body.role
    }

    user.create(data)
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

//endpoint mengupdate data user, METHOD: PUT, function:update
app.put("/:id", auth,(req,res) => {
    let param = {
        id_user : req.params.id
    }
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        id_outlet : req.body.id_outlet,
        role : req.body.role
    }
    user.update(data, {where: param})
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

//endpoint menghapus data user, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
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

//login
app.post("/auth", async (req,res) => {
  
    let result =  await user.findOne({
        where: {username: req.body.username, password: md5(req.body.password)},
        include: [
            "outlet",
            {
                model: model.outlet,
                as : "outlet",
            }
        ]
    })
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app