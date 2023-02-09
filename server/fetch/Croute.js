const express = require('express');
const { verifyUser } = require('../auth/login');
const {getProfilbyID, updateProfil, getKategori, getKategoribyID, getKategoribyNAMA, updateKategori, deleteKategori, getOffice, getOfficebyID, updateOffice, deleteOffice, getMitra, getMitrabyID, getMitrabyNAMA, updateMitra, deleteMitra, getPartner, getPartnerbyID, getPartnerbyNAMA, updatePartner, deletePartner, getFooter, updateFooter, addOffice, addKategori, addMitra, addPartner, getLogo, updateLogo, updateImageProfil, getOfficebyNama, getTotalKategori, getTotalOffice, getTotalMitra, getTotalPartner } = require('./controller');
const route = express.Router();
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./");
    },
    filename: function(req, file, cb){
        // const ext = file.mimetype.split("/")[1];
        console.log(file);
        console.log(req.body.name);
        const nama = req.body.name.replace(/\s/g, '');
        cb(null, `uploads/dtcimage-${nama}-${Date.now()}.png`);
    }
});
const limits = {
    fields: 10,
    fileSize: 500 * 1024,
    files: 1,
  };

const upload = multer({
    storage: storage
});

const resize = async (req, res, next) => {
    if(req.file){ const { filename: image } = req.file;
   
    req.body.imagename = "";
    await sharp(req.file.path)
    .resize({
        fit: sharp.fit.contain,
        width: 800
    })
     .toFile(
         path.resolve(req.file.destination,'resize',image)
     )
     let newPath = 'resize/'+image;
     req.body.imagename = newPath;
    //  console.log(req.file.path);
     fs.unlinkSync(req.file.path)
     req.file.filename = newPath;
    //  console.log(req.file.path)
     }
     next();
}

route.get("/getlogo", verifyUser, getLogo);
route.post("/updatelogo", verifyUser, upload.single("image"), resize, updateLogo);
route.post("/updateimageprofil", verifyUser, upload.single("image"), updateImageProfil);
route.put("/getprofil", verifyUser, getProfilbyID);
route.put("/updateprofil",verifyUser, updateProfil);
route.put("/getkategori", verifyUser, getTotalKategori);
route.put("/getkategoribyid", verifyUser, getKategoribyID);
route.put("/getkategoribynama", verifyUser, getKategoribyNAMA);
route.post("/updatekategori", verifyUser, upload.single("image"), resize, updateKategori);
route.put("/deletekategori", verifyUser, deleteKategori);
route.post("/addkategori", verifyUser, upload.single("image"), resize, addKategori);
route.put("/getoffice", verifyUser, getTotalOffice);
route.put("/getofficebynama", verifyUser, getOfficebyNama);
route.put("/getofficebyid", verifyUser, getOfficebyID);
route.put("/updateoffice", verifyUser, updateOffice);
route.put("/deleteoffice", verifyUser, deleteOffice);
route.post("/addoffice", verifyUser, addOffice);
route.put("/getmitra", verifyUser, getTotalMitra);
route.put("/getmitrabyid", verifyUser, getMitrabyID);
route.put("/getmitrabynama", verifyUser, getMitrabyNAMA);
route.post("/updatemitra", verifyUser, upload.single("image"), resize, updateMitra);
route.put("/deletemitra", verifyUser, deleteMitra);
route.post("/addmitra",verifyUser, upload.single("image"), resize, addMitra);
route.put("/getpartner", verifyUser, getTotalPartner);
route.put("/getpartnerbyid", verifyUser, getPartnerbyID);
route.put("/getpartnerbynama", verifyUser, getPartnerbyNAMA);
route.post("/updatepartner", verifyUser, upload.single("image"), resize, updatePartner);
route.put("/deletepartner", verifyUser, deletePartner);
route.post("/addpartner",verifyUser, upload.single("image"), resize, addPartner);
route.get("/getfooter", verifyUser, getFooter);
route.put("/updatefooter", verifyUser, updateFooter);

exports.croute = route;