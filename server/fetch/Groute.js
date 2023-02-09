const express = require('express');
// const {  } = require('../auth/login');
const { getProfilbyID, getKategori, getOffice, getMitra, getPartner, getFooter, getLogoID} = require('./controller');
const route = express.Router();

route.put("/api/getlogo", getLogoID);
route.put("/api/getprofil", getProfilbyID);
route.get("/api/getkategori", getKategori);
route.get("/api/getoffice", getOffice);
route.get("/api/getmitra", getMitra);
route.get("/api/getpartner", getPartner);
route.get("/api/getfooter", getFooter);

exports.groute = route;