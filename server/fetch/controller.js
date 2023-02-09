const {db} = require('../config/db');
var fs = require('fs');

async function wait (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
    });
  }

const getLogo = (req, res) => {
    const sqlSelect = "SELECT * FROM logo";
    db.query(sqlSelect, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
};

const getLogoID = (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM logo WHERE id_logo = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
};

const updateLogo = (req, res) => {
    const id = req.body.id;
    const gambar = req.file.filename;
    let sqlSelect = "SELECT `gambar_logo` FROM `logo` WHERE id_logo = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if(err) console.log(err);
        else{
            if(result[0].gambar_logo === null) console.log("null")
            else {
                try{
                    fs.unlinkSync(result[0].gambar_logo);
                } catch{
                    console.log("error");
                }
            }
        }
    })
    let sqlUpdate = "UPDATE logo SET gambar_logo = ? WHERE id_logo = ?";
    db.query(sqlUpdate, [gambar, id], (err, result) => {
        if(err) console.log(err)
        else{
            res.send(result);
        }
    })
}

 const getProfilbyID = (req, res) => {
    // console.log("profil jalan")
    const id = req.body.id;
    const sqlSelect = "SELECT `profildesc`, `gambar_profil` FROM `profil` WHERE ID = ?";
    db.query(sqlSelect, [id],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

    const getKategori = (req, res) => {
        const sqlSelect = "SELECT * FROM kategori";
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        });
    };

    const getTotalKategori = (req, res) => {
        const nama = req.body.nama;
        const sqlSelect = "SELECT count(*) as count FROM kategori WHERE nama_kategori LIKE ?";
        db.query(sqlSelect, [nama], (err, result) => {
            res.send(result);
        });
    };



 const getKategoribyID = (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM `kategori` WHERE ID_kategori = ?";
    db.query(sqlSelect, [id],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const getKategoribyNAMA = (req, res) => {
    const nama = req.body.nama;
    const first = req.body.first;
    const limit = req.body.limit;
    const sqlSelect = "SELECT * FROM `kategori` WHERE nama_kategori LIKE ? LIMIT ?, ?";
    db.query(sqlSelect, [nama, first, limit],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const getMitra = (req, res) => {
    const sqlSelect = "SELECT * FROM mitra";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

const getTotalMitra = (req, res) => {
    const nama = req.body.nama;
    const sqlSelect = "SELECT count(*) as count FROM mitra WHERE nama_mitra LIKE ?";
    db.query(sqlSelect, [nama], (err, result) => {
        res.send(result);
    });
};


 const getMitrabyNAMA = (req, res) => {
    const nama = req.body.nama;
    const first = req.body.first;
    const limit = req.body.limit;
    const sqlSelect = "SELECT * FROM `mitra` WHERE nama_mitra LIKE ? LIMIT ?, ?";
    db.query(sqlSelect, [nama, first, limit],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};


 const getOfficebyID = (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM `office` WHERE ID_OFFICE = ?";
    db.query(sqlSelect, [id],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};


 const getOffice = async (req, res) => {
    const sqlSelect = "SELECT *FROM office";
    let get = db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
    console.log(get);
};

const getTotalOffice = async (req, res) => {
    const nama = req.body.nama;
    const sqlSelect = "SELECT count(*) as count FROM office WHERE concat(kota, jalan) LIKE ?";
    let get = db.query(sqlSelect, [nama], (err, result) => {
        res.send(result);
    });
};

const getOfficebyNama = async (req, res) => {
    const nama = req.body.nama;
    const first = req.body.first;
    const limit = req.body.limit;
    const sqlSelect = "SELECT * FROM office WHERE concat(kota, jalan) LIKE ? LIMIT ?, ?";
    let get = db.query(sqlSelect, [nama, first, limit], (err, result) => {
        res.send(result);
    });
};

 const getFooter = (req, res) => {
    const sqlSelect = "SELECT * FROM footer";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

 const updateProfil = (req, res) => {
    const id = req.body.id;
    const profildesc = req.body.profildesc;
    db.query(
        "UPDATE profil SET profildesc = ? WHERE ID = ?",
        [profildesc, id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
};

const updateImageProfil = async(req, res) => {
    console.log(req.file);
    if(req.file){
        if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG)$/)){
            res.send({msg:'Pilih Gambar'});
            console.log("error")
        }
        else{
            // console.log("update kategori jalan")
            const id = req.body.id;
            const gambar = req.file.filename;
            // console.log(gambarKategori);
            db.query(
                "SELECT gambar_profil FROM profil WHERE ID = ?",
                [id],
                (err, result) => {
                    try{
                        const path = result[0].gambar_profil;
                        console.log(path)
                        if(path != gambar) fs.unlinkSync(path);
                        console.log("delete gambar profil")
                    }catch{
                        console.log("path not found");
                    }
                }
            );
            await wait(1*100);
            // console.log("delete gambar jalan");
            db.query(
                "UPDATE profil SET  gambar_profil = ? WHERE ID = ?",
                [gambar, id],
                (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(result);
                    }
                }
            );
            // console.log("update gambar jalan");
        }
    }
    else{
        console.log("update profil image failed");
    }
}

 const updateKategori = async(req, res) => {
    console.log(req.file);
    if(req.file){
        if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
            res.send({msg:'Pilih Gambar'});
            console.log("error")
        }
        else{
            // console.log("update kategori jalan")
            const id = req.body.id;
            const namaKategori = req.body.name;
            const gambarKategori = req.file.filename;
            // console.log(gambarKategori);
            db.query(
                "SELECT gambar_kategori FROM kategori WHERE ID_kategori = ?",
                [id],
                (err, result) => {
                    try{
                        const path = result[0].gambar_kategori;
                        console.log(path)
                        if(path != gambarKategori) fs.unlinkSync(path);
                        console.log("delete gambar kategori")
                    }catch{
                        console.log("path not found");
                    }
                }
            );
            await wait(1*100);
            // console.log("delete gambar jalan");
            db.query(
                "UPDATE kategori SET nama_kategori = ?, gambar_kategori = ? WHERE ID_kategori = ?",
                [namaKategori, gambarKategori, id],
                (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(result);
                    }
                }
            );
            // console.log("update gambar jalan");
        }
    }
    else{
        console.log("update kategori without pict")
        const id = req.body.id;
        const namaKategori = req.body.name;
        db.query(
            "SELECT gambar_kategori FROM kategori WHERE ID_kategori = ?",
            [id],
            (err, result) => {
                try{
                    const path = result[0].gambar_kategori;
                    let resPath = `uploads/dtcimage-${req.body.name.replace(/\s/g, '')}-${Date.now()}.png`;
                    fs.renameSync(path, resPath);
                    db.query(
                        "UPDATE kategori SET nama_kategori = ?, gambar_kategori = ? WHERE ID_kategori = ?",
                        [namaKategori, resPath, id],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {
                                res.send(result);
                            }
                        }
                    );
                }catch{
                    console.log(err);
                }
            }
        );
        
    }
        
        
    
    
};

 const deleteKategori = (req, res) => {
    const id = req.body.id;
    db.query(
        "SELECT gambar_kategori FROM kategori WHERE ID_kategori = ?",
        [id],
        (err, result) => {
            try{
                const path = result[0].gambar_kategori;
                fs.unlinkSync(path);
            }catch{
                console.log("path not found");
            }
        }
    );
    db.query(
        "DELETE from kategori where id_kategori = ?",
        [id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else res.send(result);
        }
    );
};

 const addKategori = (req, res) => {
    if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
        res.send({msg:'Pilih Gambar'});
        console.log("wrong filetype");
    }
    else{
        const nama = req.body.name;
        const gambar = req.file.filename;
        db.query(
            "INSERT INTO `kategori`(`nama_kategori`, `gambar_kategori`) VALUES (?,?)",
            [nama, gambar],
            (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    }
    
};

 const getMitrabyID = (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM `mitra` WHERE ID_MITRA = ?";
    db.query(sqlSelect, [id],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const addMitra = (req, res) => {
    if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
        res.send({msg:'Pilih Gambar'});
        console.log("wrong filetype")
    }
    else{
        const nama = req.body.name;
        const gambar = req.file.filename;
        db.query(
            "INSERT INTO `mitra`(`nama_mitra`, `gambar_mitra`) VALUES (?,?)",
            [nama, gambar],
            (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send(result);
                    // console.log("jalan")
                }
            }
        );
    }
    
};

 const updateMitra = async(req, res) => {
    // console.log(req.file);
    if(req.file){
        if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
            res.send({msg:'Pilih Gambar'});
            console.log("wrong filetype")
        }
        else{
            const nama = req.body.name;
            const gambar = req.file.filename;
            const id = req.body.id;
            // console.log(nama);
            db.query(
                "SELECT gambar_mitra FROM mitra WHERE ID_MITRA = ?",
                [id],
                (err, result) => {
                    try{
                        const path = result[0].gambar_mitra;
                        console.log(path)
                        if(path != gambar)fs.unlinkSync(path);
                        console.log("delete gambar mitra")
                    }catch{
                        console.log("path not found");
                    }
                }
            );
            await wait(1*100);
            db.query(
                "UPDATE `mitra` SET `nama_mitra` = ?, `gambar_mitra` = ? WHERE ID_MITRA = ?",
                [nama, gambar, id],
                (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(result);
                        // console.log("jalan")
                    }
                }
            );
        }
    }
    else{
        const nama = req.body.name;
        const id = req.body.id;
        db.query(
            "SELECT gambar_mitra FROM mitra WHERE ID_MITRA = ?",
            [id],
            (err, result) => {
                if(err){
                    console.log(err)
                }
                else{
                    const path = result[0].gambar_mitra;
                    let resPath = `uploads/dtcimage-${nama.replace(/\s/g, '')}-${Date.now()}.png`;
                    fs.renameSync(path, resPath);
                    db.query(
                        "UPDATE `mitra` SET `nama_mitra` = ?, `gambar_mitra` = ? WHERE ID_MITRA = ?",
                        [nama, resPath, id],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {
                                res.send(result);
                            }
                        }
                    );
                }
                
            }
        )
    }
    
    
};

 const deleteMitra = (req, res) => {
    const id = req.body.id;
    db.query(
        "SELECT gambar_mitra FROM mitra WHERE ID_MITRA = ?",
        [id],
        (err, result) => {
            const path = result[0].gambar_mitra;
            fs.unlinkSync(path);
        }
    )
    db.query(
        "DELETE FROM `mitra` WHERE ID_MITRA = ?",
        [id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
                // console.log("jalan")
            }
        }
    );
};

 const getPartner = (req, res) => {
    const sqlSelect = "SELECT * FROM `partner`";
    db.query(sqlSelect, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

const getTotalPartner = (req, res) => {
    const nama = req.body.nama;
    const sqlSelect = "SELECT count(*) as count FROM `partner` WHERE nama_partner LIKE ?";
    db.query(sqlSelect, [nama], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const getPartnerbyID = (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM `partner` WHERE ID_PARTNER = ?";
    db.query(sqlSelect, [id],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const getPartnerbyNAMA = (req, res) => {
    const nama = req.body.nama;
    const first = req.body.first;
    const limit = req.body.limit;
    const sqlSelect = "SELECT * FROM `partner` WHERE nama_partner LIKE ? LIMIT ?, ?";
    db.query(sqlSelect, [nama, first, limit],  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

 const addPartner = (req, res) => {
    if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
        res.send({msg:'Pilih Gambar'});
        console.log("worng filetype")
    }
    else{
        const nama = req.body.name;
        const gambar = req.file.filename;
        db.query(
            "INSERT INTO `partner`(`nama_partner`, `gambar_partner`) VALUES (?,?)",
            [nama, gambar],
            (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send(result);
                    // console.log("jalan")
                }
            }
        );
    }
    
};

 const updatePartner = async (req, res) => {
    // console.log(req.file);
    if(req.file){
        if(!req.file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG|gif|GIF)$/)){
            res.send({msg:'Pilih Gambar'});
            console.log("wrong filetype")
        }
        else{
            const nama = req.body.name;
            const gambar = req.file.filename;
            const id = req.body.id;
            // console.log("jalan");
            db.query(
                "SELECT gambar_partner FROM partner WHERE ID_PARTNER = ?",
                [id],
                (err, result) => {
                    try{
                        const path = result[0].gambar_partner;
                        console.log(path)
                        if(path != gambar) fs.unlinkSync(path);
                        console.log("delete gambar partner")
                    } catch{
                        console.log("path not found");
                    }
                }
            )
            await wait(1*100);
            db.query(
                "UPDATE `partner` SET `nama_partner` = ?, `gambar_partner` = ? WHERE ID_PARTNER = ?",
                [nama, gambar, id],
                (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(result);
                        // console.log("jalan")
                    }
                }
            );
        }
    }
    else{
        const nama = req.body.name;
        const id = req.body.id;
        db.query(
            "SELECT gambar_partner FROM partner WHERE ID_PARTNER = ?",
            [id],
            (err, result) => {
                if(err){
                    console.log(err)
                }
                else{
                    const path = result[0].gambar_partner;
                    let resPath = `uploads/dtcimage-${nama.replace(/\s/g, '')}-${Date.now()}.png`;
                    fs.renameSync(path, resPath);
                    db.query(
                        "UPDATE `partner` SET `nama_partner` = ?, gambar_partner = ? WHERE ID_PARTNER = ?",
                        [nama, resPath, id],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {
                                res.send(result);
                                // console.log("jalan")
                            }
                        }
                    ); 
                }
            }
        )
        
    }
    
    
};

 const deletePartner = (req, res) => {
    const id = req.body.id;
    db.query(
        "SELECT gambar_partner FROM partner WHERE ID_PARTNER = ?",
        [id],
        (err, result) => {
            try{    
                const path = result[0].gambar_partner;
                fs.unlinkSync(path);
            } catch {
                console.log("path not found");
            }
        }
    )
    db.query(
        "DELETE FROM `partner` WHERE ID_PARTNER = ?",
        [id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
                // console.log("jalan")
            }
        }
    );
};

 const updateOffice = (req, res) => {
    const id = req.body.id;
    const kota = req.body.kota;
    const jalan = req.body.jalan;
    const lat = req.body.lat;
    const long = req.body.long;
    db.query(
        "UPDATE office SET kota = ?, jalan = ?, latitude = ?, longitude = ? WHERE id_office = ?",
        [kota, jalan, lat, long, id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
};

 const deleteOffice = (req, res) => {
    const id = req.body.id;
    db.query(
        "DELETE from office where id_office = ?",
        [id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else res.send(result);
        }
    );
};


 const addOffice = (req, res) => {
    const kota = req.body.kota;
    const jalan = req.body.jalan;
    const lat = req.body.lat;
    const long = req.body.long;
    db.query(
        "INSERT INTO `office` (`kota`, `jalan`, `latitude`, `longitude`)  VALUES (?, ?, ?, ?)",
        [kota, jalan, lat, long],
        (err, result) => {
            if(err) {   
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
};

 const updateFooter = (req, res) => {
    const id = req.body.id;
    const alamat = req.body.alamat;
    const email = req.body.email;
    const telp = req.body.telp;
    const wa = req.body.wa;
    db.query(
        "UPDATE footer SET jalan_kantor = ?, email = ?, no_telp = ?, whatsapp = ? WHERE id_footer = ?",
        [alamat, email, telp, wa, id],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
};

exports.getLogo = getLogo;
exports.getLogoID = getLogoID;
exports.updateLogo = updateLogo;
exports.getProfilbyID = getProfilbyID;
exports.updateProfil = updateProfil;
exports.updateImageProfil = updateImageProfil;
exports.getKategori = getKategori;
exports.getTotalKategori = getTotalKategori;
exports.getKategoribyID = getKategoribyID;
exports.getKategoribyNAMA = getKategoribyNAMA;
exports.updateKategori = updateKategori;
exports.deleteKategori = deleteKategori;
exports.addKategori = addKategori;
exports.getOffice = getOffice;
exports.getTotalOffice = getTotalOffice;
exports.getOfficebyNama = getOfficebyNama;
exports.getOfficebyID = getOfficebyID;
exports.updateOffice = updateOffice;
exports.deleteOffice = deleteOffice;
exports.addOffice = addOffice;
exports.getMitra = getMitra;
exports.getTotalMitra = getTotalMitra;
exports.getMitrabyID = getMitrabyID;
exports.getMitrabyNAMA = getMitrabyNAMA;
exports.updateMitra = updateMitra;
exports.deleteMitra = deleteMitra;
exports.addMitra = addMitra;
exports.getPartner = getPartner;
exports.getTotalPartner = getTotalPartner;
exports.getPartnerbyID = getPartnerbyID;
exports.getPartnerbyNAMA = getPartnerbyNAMA;
exports.updatePartner = updatePartner;
exports.deletePartner = deletePartner;
exports.addPartner = addPartner;
exports.getFooter = getFooter;
exports.updateFooter = updateFooter;