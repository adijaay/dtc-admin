const argon2 = require('argon2');
const {db} = require('../config/db');

function callUser(uname, sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, [uname], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                var stringUser = JSON.stringify(result);
                var jsonUser = JSON.parse(stringUser);
                resolve(jsonUser[0]);
            }
        })
    })
}


const userLogin = async (req, res) => {
    const sqlSelect = "SELECT * from `users` where username = ?";
    const user = await callUser(req.body.username, sqlSelect);
    // db.query(sqlSelect, [req.body.username]
    //     ,(err, result) => {
    //     console.log(JSON.stringify(result));
    //     var stringUser = JSON.stringify(result);
    //     var jsonUser = JSON.parse(stringUser);
    //     console.log(jsonUser[0]);
    // }
    // );
    // console.log(req.body.username);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const hashPassword = await argon2.hash(req.body.password);
    const match = await argon2.verify(hashPassword, user.password);
    if(!match) {
        return res.status(400).json({msg: "Wrong Password"});
    }
    req.session.userId = user.uid;
    const uid = user.uid;
    const name = user.name;
    const username = user.username;
    res.status(200).json({uid, name, username});
    console.log(req.session.userId);
}

const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const sqlSelect = "SELECT uid, name, username FROM `users` WHERE uid = ?"
    const user = callUser(req.session.userId, sqlSelect);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

const logOut = async (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}

const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
    return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const sqlSelect = "SELECT uid, name, username FROM `users` WHERE uid = ?"
    const user = callUser(req.session.userId, sqlSelect);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.uid;
    next();
}

exports.userLogin = userLogin;
exports.Me = Me;
exports.logOut = logOut;
exports.verifyUser = verifyUser;

