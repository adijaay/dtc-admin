import "./sectiontable.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./popup.css";
import Loader from "./loader";
import Waveloader from "./waveloader";
import ReactPaginate from "react-paginate";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import url from "../config/link";
// import logo from '../../public/logo192.png';

const SectionTable = (props) => {
  const [data, setdata] = useState([]);
  const [file, setFile] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [chnamadata, setChnamadata] = useState("");
  const [chgambardata, setChgambardata] = useState("");
  const [chgambardata64, setChgambardata64] = useState(null);
  const [chiddata, setChiddata] = useState("");
  const [nfound, setNfound] = useState(false);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(true);
  const [isdelete, setIsdelete] = useState(false);
  const [showProgressBar, setProgressBarVisibility] = useState(false);

  const [pagetotal, setPagetotal] = useState(0);
  const getdata = async (id, first, limit) => {
    let tek2 = "%" + id + "%";
    // console.log(tek2);
    await Axios.put(url + props.getdb, {
      nama: tek2,
      first: first,
      limit: limit,
    }).then(async (response) => {
      if (response.data.length === 0) {setNfound(true); if(selectedPage !== 0) setSelectedPage(selectedPage - 1)}
      else setNfound(false);
      setdata(response.data);
      //   let img = response.data;
      //   await img.map((val) => {
      //     let link = url + val[props.gambar];
      //     console.log(link);
      //     loadSprite(link)
      //   })
    });
    setLoad(false);
  };

  //   function loadSprite(src) {
  //     setLoad(true);
  //     var sprite = new Image();
  //     console.log("image load");
  //     sprite.onload = function() {
  //         console.log("image load");
  //     };
  //     sprite.src = src;
  // }

  const getTotal = async (limit, nama) => {
    let tek2 = "%" + nama + "%";
    await Axios.put(url + props.totalget, { nama: tek2 }).then((res) => {
      let data = res.data;
      data.map((val) => {
        setPagetotal(Math.ceil(val.count / limit));
      });
    });
  };

  const [selectedPage, setSelectedPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const handlepage = async (e) => {
    let selected = e.selected;
    setSelectedPage(selected);
  };

  useEffect(() => {
    setOffset(selectedPage * limit);
  }, [selectedPage]);

  useEffect(() => {
    setLoad(true);
    getTotal(limit, search);
    console.log("get jalan");
    getdata(search, offset, limit);
  }, [offset, showProgressBar]);

  useEffect(() => {
    setLoad(true);
    setSelectedPage(0);
    getTotal(limit, search);
    getdata(search, offset, limit);
  }, [search]);

  const toggleEditKPopup = () => {
    setIsEditOpen(!isEditOpen);
    if (isEditOpen === false) {
      setChgambardata64(null);
      setChgambardata("");
      setChiddata("");
      setChnamadata("");
      setIschange(false);
      setFile(null);
    }
  };

  const toggleAddKPopup = () => {
    setIsAddOpen(!isAddOpen);
    if (isAddOpen === false) {
      setChgambardata64(null);
      setChgambardata("");
      setChiddata("");
      setChnamadata("");
      setFile(null);
    }
  };

  const toggleDelete = () => {
    setIsdelete(!isdelete);
    if (isdelete === false) {
      setChgambardata("");
      setChgambardata64(null);
      setChiddata("");
      setChnamadata("");
      setFile(null);
    }
  };

  const getdataId = async (id) => {
    Axios.put(url + props.getdbId, { id: id }).then((response) => {
      const data = response.data;
        data.map((val) => {
          setChiddata(val[props.id]);
          console.log(chiddata);
          setChnamadata(val[props.nama]);
          console.log(chnamadata);
          setChgambardata(val[props.gambar]);
          console.log("jalan");
        });
    });

    toggleEditKPopup();
  };

  const getdataDelete = async (id) => {
    Axios.put(url + props.getdbId, { id: id }).then((response) => {
      const data = response.data;
        data.map((val) => {
          setChiddata(val[props.id]);
          console.log(chiddata);
          setChnamadata(val[props.nama]);
          console.log(chnamadata);
          setChgambardata(val[props.gambar]);
        });
    });
    toggleDelete();
  };

  const handleNamadataChange = (event) => {
    setChnamadata(event.target.value);
    console.log(chnamadata);
  };

  const [ischange, setIschange] = useState(false);

  const handleGambardataChange = async (e) => {
    try {
      setIschange(true);
      setFile(e.target.files[0]);
      const base64K = await convertToBase64(e.target.files[0]);
      setChgambardata64(base64K);
    } catch {
      setChgambardata64(null);
      setIschange(false);
    }
  };

  const updatedata = async (id, e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    console.log("hai");
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", chnamadata);
    formData.append("image", file);
    const data = Object.fromEntries(formData);
    console.log(formData);
    console.log(data);
    let update;
    // Axios.put("http://192.168.6.235:3001/" + props.update, {namadata: chnamadata, gambardata: chgambardata, id : id})
    update = await Axios({
      method: "post",
      url: url + props.update,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    toggleEditKPopup();
    setProgressBarVisibility(false);
  };

  const adddata = async (e) => {
    e.preventDefault();
    // console.log("hai");
    setProgressBarVisibility(true);
    const formData = new FormData();
    formData.append("name", chnamadata);
    formData.append("image", file);
    let add;
    add = await Axios({
      method: "post",
      url: url + props.add,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    // getdata([]);
    // console.log(data);
    // console.log("jalan");
    toggleAddKPopup();
    setProgressBarVisibility(false);
    // window.location.reload()
  };

  const deletedata = async (id) => {
    setProgressBarVisibility(true);
    const deleted = await Axios.put(
      url + props.delete,
      { id: id }
    );
    // window.location.reload();
    toggleDelete();
    setProgressBarVisibility(false);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="visimisi-container" id={props.title}>
        <div className="row">
          <h1 className="profil">{props.title}</h1>
          <form>
            <input
              type="text"
              className="search"
              placeholder={"search " + props.title}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            ></input>
          </form>
          <h1
            className="button add"
            onClick={() => toggleAddKPopup()}
            id="misibtn"
          >
            +
          </h1>
        </div>
        {load ? (
          <Waveloader />
        ) : (
          <div
            style={{
              minHeight:
                "calc(clamp(20px, 10vh, 10vw)*5 + (clamp(20px, 10vh, 10vw)*5)*.3)",
            }}
          >
            <table>
              <tr>
                <th></th>
                <th>{props.tabletitle}</th>
                <th>Action</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="table-img">
                      <div
                        className="table-center"
                        style={{
                          //   backgroundImage: ` url(${url + val[props.gambar]})`,
                          //   backgroundPosition: "50% 50%",
                          //   backgroundSize: "contain",
                          width: "50%",
                          height: "clamp(20px, 10vh, 10vw)",
                          //   backgroundRepeat: "no-repeat",
                          margin: "5% 25%",
                        }}
                      >
                        <LazyLoadImage
                          src={url + val[props.gambar]}
                          height={'100%'}
                          width={'100%'}
                          style={
                            {
                            objectFit: "contain",
                          }
                        }
                        />
                      </div>
                    </td>
                    <td className="table-name">{val[props.nama]}</td>
                    <td className="table-btn">
                      <div className="table-center">
                        <button onClick={() => getdataId(val[props.id])}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="black"
                            width={"100%"}
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
                        </button>
                        <button onClick={() => getdataDelete(val[props.id])}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="red"
                            width={"80%"}
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
            {nfound && (
              <>
                <h1 className="not-found">data not found</h1>
              </>
            )}
          </div>
        )}
        <div className="end">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break"}
            pageCount={pagetotal}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(e) => handlepage(e)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
        <div className="edit-data-container">
          {isAddOpen && (
            <>
              <div className="popup-box">
                <div className="box">
                  <span className="close-icon" onClick={toggleAddKPopup}>
                    x
                  </span>
                  <h1 style={{ fontWeight: "300" }}>Tambah {props.title}</h1>
                  <form
                    onSubmit={(event) => adddata(event)}
                    encType="multipart/form-data"
                  >
                    <div className="data-img-check">
                      <img src={chgambardata64} style={{ maxWidth: "50%" }} />
                    </div>
                    <input
                      required
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      name="image"
                      id="image"
                      onChange={handleGambardataChange}
                    ></input>
                    <input
                      required
                      type="text"
                      placeholder={"nama " + props.title}
                      value={chnamadata}
                      onChange={handleNamadataChange}
                    ></input>
                    {/* <textarea required rows={5} placeholder="link gambar..." value={chgambardata} onChange={handleGambardataChange}></textarea> */}
                    <input type="submit" value="save"></input>
                  </form>
                </div>
              </div>
            </>
          )}
          {isEditOpen && (
            <>
              <div className="popup-box">
                <div className="box">
                  <span className="close-icon" onClick={toggleEditKPopup}>
                    x
                  </span>
                  <h1>Edit data</h1>
                  <form onSubmit={(event) => updatedata(chiddata, event)}>
                    <div className="data-img-check">
                      <img
                        src={ischange ? chgambardata64 : url + chgambardata}
                        style={{ maxWidth: "50%" }}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      id="imageupdate"
                      name="imageupdate"
                      onChange={handleGambardataChange}
                    ></input>
                    <input
                      required
                      type="text"
                      placeholder={"nama " + props.title}
                      value={chnamadata}
                      onChange={handleNamadataChange}
                    ></input>
                    <input type="submit" value="save"></input>
                  </form>
                </div>
              </div>
            </>
          )}
          {isdelete && (
            <div className="popup-logout">
              <div className="popup-box">
                <div className="box">
                  <h1 style={{ color: "black", fontSize: "calc(10px + 1vw)" }}>
                    Hapus {chnamadata}?
                  </h1>
                  <div className="row">
                    <h1
                      className="button logout"
                      onClick={() => deletedata(chiddata)}
                      id="profilbtn"
                    >
                      Hapus
                    </h1>
                    <h1
                      className="button"
                      id="cancel-logout"
                      onClick={() => setIsdelete(false)}
                    >
                      Batal
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showProgressBar && (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionTable;
