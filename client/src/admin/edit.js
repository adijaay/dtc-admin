import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./edit.css";
import "./editProfil.css";
import "./editKategori.css";
import "./editOffice.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "./auth";
import SectionTable from "./sectiontable";
import "react-quill/dist/quill.snow.css";
import "./sectiontable.css";
import Office from "./office";
import Profil from "./profil";
import { LogOut, reset } from "./auth";
import { a } from 'react-router-hash-link';
import Loader from "./loader";

import Axios from "axios";
import "./popup.css";
import url from "../config/link";

export default function Edit() {
  const { isError, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(isSuccess);
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // console.log(isError + " " + isSuccess);
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  const [isLogoutOpen, SetIsLogoutOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [editL, setEditL] = useState(false);
  const [dataL, setDataL] = useState([]);
  const [load, setLoad] = useState(false);
  const [slogo, setSlogo] = useState(null);
  const [page, setPage] = useState(1);

  function toggleNavbar() {
    // console.log("next")
    setNavbar(true);
    // console.log(navbar)
  }

  useEffect(() => {
    // if(window.innerWidth < 930 && navbar === true) setNavbar(false);
    if (window.innerWidth >= 930) setNavbar(true);
    if (navbar === true)
      document
        .getElementById("editor")
        .addEventListener("click", setNavbarWidth);
    window.addEventListener("resize", fixNavbar);
  });

  const setNavbarWidth = () => {
    const width = window.innerWidth;
    if (navbar === true && width < 930) setNavbar(false);
  };

  const fixNavbar = () => {
    const width = window.innerWidth;
    // console.log(width);
    if (width > 929) setNavbar(true);
    else setNavbar(false);
  };

  const toggleEditL = () => {
    getDataL();
    setEditL(!editL);
    if (editL === false) {
      setDataL([""]);
    }
  };

  const handlePage = (e, id) => {
    e.preventDefault();
    setPage(id);
  }

  const getPage = (id, check) => {
    if(id === check) return true;
    else return false;
  }

  const handleLogofChange = async (id, nama, e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const formDataL = new FormData();
      formDataL.append("id", id);
      formDataL.append("name", nama);
      formDataL.append("image", e.target.files[0]);
      const update = await updateData(formDataL);
      setLoad(false);
      if (load === false) {
        getDataL();
      }
    } catch {
      setLoad(false);
    }
  };

  const [imageload, setImageload] = useState(false);

  useEffect(() => {
    getDataL([]);
  }, []);

  const getDataL = async () => {
    const get = await Axios.get(url + "getlogo").then(
      (response) => {
        let data = response.data;
        setDataL(data);
        {
          data.slice(0, 1).map((val) => {
            setSlogo(val.gambar_logo);
          });
        }
      }
    );
    setImageload(true);
  };

  const updateData = async (data) => {
    const updated = await Axios({
      method: "post",
      url: url + "updatelogo",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const toggleLogout = () => {
    SetIsLogoutOpen(!isLogoutOpen);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="editor">
      <>
      {/* navbar */}
        <>
          <div className="bar" onClick={toggleNavbar}>
            <svg
              className="bar-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={"20px"}
              fill={"white"}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
          <div
            className={navbar ? "navbar-left" : "navbar-left-closed"}
            id="navbar-left"
          >
            <div className="navbar-profile-img">
              <div className="profile-img" onClick={toggleEditL}>
                {imageload && (
                  <>
                    <img
                      src={url + slogo}
                      style={{ width: "80%", maxHeight: "100%" }}
                    />
                  </>
                )}
                <h1>edit</h1>
              </div>
            </div>
            <div className="list-container">
              <a className={getPage(page, 1) ? "list-active" : "list-edit"} onClick={(e) => handlePage(e, 1)}>
                Profil
              </a>
              <a className={getPage(page, 2) ? "list-active" : "list-edit"} onClick={(e) => handlePage(e, 2)}>
                Kategori Produk
              </a>
              <a className={getPage(page, 3) ? "list-active" : "list-edit"} onClick={(e) => handlePage(e, 3)}>
                Office
              </a>
              <a className={getPage(page, 4) ? "list-active" : "list-edit"} onClick={(e) => handlePage(e, 4)}>
                Mitra
              </a>
              <a className={getPage(page, 5) ? "list-active" : "list-edit"} onClick={(e) => handlePage(e, 5)}>
                Partner
              </a>
            </div>
            <h1 className="logout" onClick={toggleLogout}>
              Logout
            </h1>
          </div>
          {editL && (
            <>
              <div className="logo">
                <div className="popup-box">
                  {load && <Loader />}
                  <div className="box">
                    <span className="close-icon" onClick={toggleEditL}>
                      x
                    </span>
                    <div className="row">
                      {dataL.map((val) => {
                        return (
                          <div className="col">
                            <div className="data-img-check">
                              <img
                                src={url + val.gambar_logo}
                                style={{
                                  width: "80%",
                                  minWidth: "100px",
                                  minHeight: "auto",
                                }}
                              />
                            </div>
                            <label>{val.nama_logo}</label>
                            <input
                              required
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/gif"
                              name="image"
                              id="image"
                              onChange={(e) =>
                                handleLogofChange(val.id_logo, val.nama_logo, e)
                              }
                            ></input>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {isLogoutOpen && (
            <div className="popup-logout">
              <div className="popup-box">
                <div className="box">
                  <h1 style={{ color: "black", fontSize: "calc(10px + 1vw)" }}>
                    Apakah Anda yakin untuk keluar?
                  </h1>
                  <div className="row">
                    <h1
                      className="button logout"
                      onClick={() => logout()}
                      id="profilbtn"
                    >
                      Logout
                    </h1>
                    <h1
                      className="button"
                      id="cancel-logout"
                      onClick={() => toggleLogout()}
                    >
                      cancel
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>

        <div className="edit-container" id="editor">
          {getPage(page, 1) && <Profil />} 

          {getPage(page, 2) && 
          <SectionTable
            totalget="getkategori"
            getdb="getkategoribynama"
            getdbId="getkategoribyid"
            update="updatekategori"
            add="addkategori"
            delete="deletekategori"
            title="Kategori"
            nama="nama_kategori"
            gambar="gambar_kategori"
            id="id_kategori"
            tabletitle="Nama Kategori"
          />}

          {getPage(page, 3) && <Office />}

          {getPage(page, 4) && 
          <SectionTable
          totalget="getmitra"
          getdb="getmitrabynama"
          getdbId="getmitrabyid"
          update="updatemitra"
          add="addmitra"
          delete="deletemitra"
          title="Mitra"
          nama="nama_mitra"
          gambar="gambar_mitra"
          id="ID_MITRA"
          tabletitle="Nama Mitra"
        />
          }

          {getPage(page, 5) && 
          <SectionTable
          totalget="getpartner"
          getdb="getpartnerbynama"
          getdbId="getpartnerbyid"
          update="updatepartner"
          add="addpartner"
          delete="deletepartner"
          title="Partner"
          nama="nama_partner"
          gambar="gambar_partner"
          id="ID_PARTNER"
          tabletitle="Nama Partner"
        />
          }
          
        </div>
      </>
    </div>
  );
}
