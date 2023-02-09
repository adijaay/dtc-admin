const express = require('express');
const { Me, logOut, verifyUser, userLogin } = require('./login');
const route = express.Router();


route.put("/me", Me);
route.put("/login", userLogin);
route.delete("/logout", logOut);

exports.aroute = route;