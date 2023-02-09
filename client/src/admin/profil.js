import React, { useEffect, useRef, useState } from "react";
import "./edit.css";
import "./editProfil.css";
import "./editKategori.css";
import "./editOffice.css";
// import axios, { Axios } from "axios";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "./auth";
import Loader from "./loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./sectiontable.css";
import Water from "./water";
import url from "../config/link";

export default function Profil() {
  const { isError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profil, setProfil] = useState("");
  const [image, setImage] = useState(null);
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [alamatfooter, setAlamatfooter] = useState("");
  const [emailfooter, setEmailfooter] = useState("");
  const [telpfooter, setTelpfooter] = useState("");
  const [whatsappfooter, setWhatsappfooter] = useState("");
  const [load, setLoad] = useState(true);
  const [toggleV, setToggleV] = useState(false);
  const [toggleM, setToggleM] = useState(false);

  const getProfil = async () => {
    await Axios.put(url + "getprofil", {
      id: 1,
    }).then((response) => {
      const data = response.data;
        data.map((val) => {
          setProfil(val.profildesc);
        });
    });
    setLoad(false);
  };
  const getVisi = async () => {
    await Axios.put(url + "getprofil", { id: 2 }).then(
      (response) => {
        const data = response.data;
          data.map((val) => {
            setVisi(val.profildesc);
          });
      }
    );
  };
  const getMisi = async () => {
    await Axios.put(url +"getprofil", { id: 3 }).then(
      (response) => {
        const data = response.data;
          data.map((val) => {
            setMisi(val.profildesc);
          });
      }
    );
  };

  const getImage = async (id) => {
    // setLoad(true);
    // console.log(id);
    await Axios.put(url + "getprofil", {
      id: id,
    }).then((response) => {
      const data = response.data;
        data.map((val) => {
          let link = url + val.gambar_profil;
          setImage(link);
        });
    });
    // setLoad(false);
    if (id === 2) if (toggleV === false) getToggleV();
    if (id === 3) {
      if (toggleM === false) {
        getToggleM();
      }
    }
  };

  const getToggleV = () => {
    setToggleV(!toggleV);
    // if (toggle === false) setImage(null);
  };

  const getToggleM = () => {
    setToggleM(!toggleM);
    // if (toggle === false) setImage(null);
  };

  const handleLogofChange = async (id, nama, e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    try {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", nama);
      formData.append("image", e.target.files[0]);
      await updateData(formData);
      setProgressBarVisibility(false);
      if (showProgressBar === false) {
        getImage(id);
      }
    } catch {
      setProgressBarVisibility(false);
    }
  };

  const updateData = async (data) => {
    await Axios({
      method: "post",
      url: url + "updateimageprofil",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const getFooter = async () => {
    await Axios.get(url + "getfooter").then((response) => {
      const dataf = response.data;
      {
        dataf.map((val) => {
          setAlamatfooter(val.jalan_kantor);
          setEmailfooter(val.email);
          setTelpfooter(val.no_telp);
          setWhatsappfooter(val.whatsapp);
        });
      }
    });
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    // console.log(isSuccess);
    dispatch(getMe());
  }, [dispatch]);

  useEffect(
    () => {
      // console.log(isError + " " + isSuccess);
      if (isError) {
        navigate("/");
      }
      // if(width < 930) setNavbar(false);
      getProfil("");
      // console.log(profil);
      getVisi("");
      // console.log(visi);
      getMisi("");
      // console.log(misi);
      // console.log(office);
      getFooter([]);
    },
    [isError],
    [],
    []
  );

  const handleProfilChange = (html) => {
    window.onbeforeunload = () => "unsaved";
    setProfil(html);
    const btn = document.getElementById("profilbtn");
    btn.style = "color: white; background-color: green; display: flex";
  };

  const handleVisiChange = (html) => {
    window.onbeforeunload = () => "unsaved";
    setVisi(html);
    const btn = document.getElementById("visibtn");
    btn.style = "color: white; background-color: green; display: flex";
    const btn2 = document.getElementById("editvisi");
    btn2.style = "display: none";
  };

  const handleMisiChange = (html) => {
    window.onbeforeunload = () => "unsaved";
    setMisi(html);
    const btn = document.getElementById("misibtn");
    btn.style = "color: white; background-color: green; display: flex";
    const btn2 = document.getElementById("editmisi");
    btn2.style = "display: none";
  };

  const updateProfil = async () => {
    setProgressBarVisibility(true);
    const update = await Axios.put(url + "updateprofil", {
      profildesc: profil,
      id: 1,
    });
    setProfil(profil);
    const btn = document.getElementById("profilbtn");
    btn.style = "display: none";
    setProgressBarVisibility(false);
  };

  const updateVisi = async () => {
    setProgressBarVisibility(true);
    const update = await Axios.put(url + "updateprofil", {
      profildesc: visi,
      id: 2,
    });
    setVisi(visi);
    const btn = document.getElementById("visibtn");
    btn.style = "display: none";
    const btn2 = document.getElementById("editvisi");
    btn2.style = "display: flex";
    setProgressBarVisibility(false);
  };

  const updateMisi = async () => {
    setProgressBarVisibility(true);
    const update = await Axios.put(url + "updateprofil", {
      profildesc: misi,
      id: 3,
    });
    setMisi(misi);
    const btn = document.getElementById("misibtn");
    btn.style = "display: none";
    const btn2 = document.getElementById("editmisi");
    btn2.style = "display: flex";
    setProgressBarVisibility(false);
  };

  const updateFooter = async (e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    // console.log("hai")
    const update = await Axios.put(url + "updatefooter", {
      alamat: alamatfooter,
      email: emailfooter,
      telp: telpfooter,
      wa: whatsappfooter,
      id: 1,
    });
    setProgressBarVisibility(false);
  };

  const [showProgressBar, setProgressBarVisibility] = useState(false);

  return (
    <>
        {load ? 
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Water />
        </div>
       : 
        <>
        {showProgressBar && <Loader />}
            <div className="profil-container" id="profil">
              <div className="row">
                <h1 className="Profil">Profil</h1>
                <h1
                  className="button"
                  onClick={() => updateProfil()}
                  id="profilbtn"
                >
                  save
                </h1>
              </div>
              <form>
                <ReactQuill
                  style={{ width: "95%" }}
                  theme="snow"
                  value={profil}
                  onChange={handleProfilChange}
                />
              </form>
            </div>

            <div className="profil-container" id="visi">
              <div className="row">
                <h1 className="Profil">Visi</h1>
                <h1
                  className="button"
                  onClick={() => updateVisi()}
                  id="visibtn"
                >
                  save
                </h1>
                <h1
                  className="button"
                  onClick={() => getImage(2)}
                  style={{ display: "flex" }}
                  id="editvisi"
                >
                  edit gambar
                </h1>
              </div>
              {toggleV && (
                <div className="popup-box">
                  <div className="box">
                    <span className="close-icon" onClick={getToggleV}>
                      x
                    </span>
                    <h1 style={{ fontWeight: "300" }}>Edit Gambar Visi</h1>
                    <form encType="multipart/form-data">
                      <div className="data-img-check">
                        <img src={image} style={{ maxWidth: "80%" }} />
                      </div>
                      <input
                        required
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        name="image"
                        id="image"
                        onChange={(e) => handleLogofChange(2, "visi", e)}
                      ></input>
                    </form>
                  </div>
                </div>
              )}
              <form>
                <ReactQuill
                  style={{ width: "95%" }}
                  theme="snow"
                  value={visi}
                  onChange={handleVisiChange}
                />
              </form>
            </div>

            <div className="profil-container" id="misi">
              <div className="row">
                <h1 className="Profil">Misi</h1>
                <h1
                  className="button"
                  onClick={() => updateMisi()}
                  id="misibtn"
                >
                  save
                </h1>
                <h1
                  className="button"
                  onClick={() => getImage(3)}
                  style={{ display: "flex" }}
                  id="editmisi"
                >
                  edit gambar
                </h1>
              </div>
              {toggleM && (
                <div className="popup-box">
                  <div className="box">
                    <span className="close-icon" onClick={getToggleM}>
                      x
                    </span>
                    <h1 style={{ fontWeight: "300" }}>Edit Gambar Misi</h1>
                    <form encType="multipart/form-data">
                      <div className="data-img-check">
                        <img src={image} style={{ maxWidth: "80%" }} />
                      </div>
                      <input
                        required
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        name="image"
                        id="image"
                        onChange={(e) => handleLogofChange(3, "misi", e)}
                      ></input>
                    </form>
                  </div>
                </div>
              )}
              <form>
                <ReactQuill
                  style={{ width: "95%" }}
                  theme="snow"
                  value={misi}
                  onChange={handleMisiChange}
                />

                {/* <textarea rows={10} id='profil' style={{height: `auto`}} value={misi}  onChange={handleMisiChange}></textarea> */}
              </form>
            </div>

            <div className="visimisi-container" id="kontak">
              <h1 className="profil">Kontak</h1>
              <div className="office-editor-container flow">
                <div className="edit-office-container shadow">
                  <form onSubmit={(event) => updateFooter(event)}>
                    <label>Alamat Kantor Pusat</label>
                    <textarea
                      value={alamatfooter}
                      onChange={(event) => setAlamatfooter(event.target.value)}
                    ></textarea>
                    <label>Email</label>
                    <input
                      className="height-auto"
                      type="text"
                      value={emailfooter}
                      onChange={(event) => setEmailfooter(event.target.value)}
                    ></input>
                    <div className="row">
                      <div className="col">
                        <label>No. Telepon</label>
                        <input
                          type="text"
                          value={telpfooter}
                          onChange={(event) =>
                            setTelpfooter(event.target.value)
                          }
                        ></input>
                      </div>
                      <div className="col">
                        <label>Whatsapp</label>
                        <input
                          type="text"
                          value={whatsappfooter}
                          onChange={(event) =>
                            setWhatsappfooter(event.target.value)
                          }
                        ></input>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="save changes"
                      className="footer-btn height-auto"
                    ></input>
                  </form>
                </div>
              </div>
            </div>
        </>
    }    
    </>
  );
}
