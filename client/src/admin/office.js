import Axios from "axios";
import { useEffect, useState } from "react";
import "./editOffice.css";
import Loader from "./loader";
import Waveloader from "./waveloader";
import ReactPaginate from "react-paginate";
import Water from "./water";
import url from "../config/link";

export default function Office() {
  const [office, setOffice] = useState([]);
  const [search, setSearch] = useState("");
  const [nfound, setNfound] = useState(false);

  const getOffice = async (nama) => {
    setLoad(true);
    const type = "%" + nama + "%";
    await Axios.put(url + "getoffice", { nama: type }).then(
      (response) => {
        let data = response.data;
        data.map((val) => {
          setPagetotal(Math.ceil(val.count / limit));
        });
      }
    );
    setLoad(false);
  };

  const getOfficebyNama = async (nama, first, limit) => {
    setLoad(true);
    const type = "%" + nama + "%";
    await Axios.put(url + "getofficebynama", {
      nama: type,
      first: first,
      limit: limit,
    }).then((response) => {
      if (response.data.length == 0) setNfound(true);
      else setNfound(false);
      setOffice(response.data);
    });
    setLoad(false);
  };

  const [showProgressBar, setProgressBarVisibility] = useState(false);
  const [load, setLoad] = useState(false);

  const [selectedPage, setSelectedPage] = useState(0);
  const [pagetotal, setPagetotal] = useState(0);
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
    getOffice(search);
    getOfficebyNama(search, offset, limit);
  }, [showProgressBar, search, offset]);

  const [isAddOOpen, setIsAddOOpen] = useState(false);
  const [isEditOOpen, setIsEditOOpen] = useState(false);
  const [chidoffice, setChidoffice] = useState("");
  const [chkotaoffice, setChkotaoffice] = useState("");
  const [chjalanoffice, setChjalanoffice] = useState("");
  const [chlatoffice, setChlatoffice] = useState("");
  const [chlongoffice, setChlongoffice] = useState("");

  const toggleAddOPopup = () => {
    setIsAddOOpen(!isAddOOpen);
    if (isAddOOpen === false) {
      setChkotaoffice("");
      setChjalanoffice("");
      setChlatoffice("");
      setChlongoffice("");
    }
  };

  const toggleEditOPopup = () => {
    setIsEditOOpen(!isEditOOpen);
    if (isEditOOpen === false) {
      setChkotaoffice("");
      setChjalanoffice("");
      setChlatoffice("");
      setChlongoffice("");
    }
  };

  function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    console.log(charCode);
    if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  const handleLatChange = (e) => {
    let amount = e.target.value;
    if (!amount || amount.match(/^(-{0,1})?(\d{1,})?(\.\d{0,9})?$/))
      setChlatoffice(amount);
  };

  const handleLongChange = (e) => {
    let amount = e.target.value;
    if (!amount || amount.match(/^(-{0,1})?(\d{1,})?(\.\d{0,9})?$/))
      setChlongoffice(amount);
  };

  const getOfficeId = (id) => {
    Axios.put(url + "getofficebyid", { id: id }).then(
      (response) => {
        const data = response.data;
        {
          data.map((val) => {
            setChidoffice(val.ID_OFFICE);
            setChkotaoffice(val.kota);
            // console.log(chkotaoffice);
            setChjalanoffice(val.jalan);
            // console.log(chjalanoffice);
            setChlatoffice(val.latitude);
            setChlongoffice(val.longitude);
            // console.log("jalan")
          });
        }
      }
    );

    toggleEditOPopup();
  };

  const updateOffice = async (id, e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    const update = await Axios.put(url +"updateoffice", {
      kota: chkotaoffice,
      jalan: chjalanoffice,
      lat: chlatoffice,
      long: chlongoffice,
      id: id,
    });
    toggleEditOPopup();
    setProgressBarVisibility(false);
    // getOffice();
  };

  const deleteOffice = async (id) => {
    // console.log("hai");
    setProgressBarVisibility(true);
    const deleted = await Axios.put(url+ "deleteoffice", {
      id: id,
    });
    toggleDelete();
    setProgressBarVisibility(false);
  };

  const addOffice = async (e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    // console.log("hai");
    const add = await Axios.post(url +"addoffice", {
      kota: chkotaoffice,
      jalan: chjalanoffice,
      lat: chlatoffice,
      long: chlongoffice,
    });
    toggleAddOPopup();
    setProgressBarVisibility(false);
  };

  const [isdelete, setIsdelete] = useState(false);

  const toggleDelete = () => {
    setIsdelete(!isdelete);
    if (isdelete === false) {
      setChkotaoffice("");
      setChjalanoffice("");
      setChlatoffice("");
      setChlongoffice("");
    }
  };

  const getdataDelete = (id) => {
    Axios.put(url +"getofficebyid", { id: id }).then(
      (response) => {
        const data = response.data;
        {
          data.map((val) => {
            setChidoffice(val.ID_OFFICE);
            setChkotaoffice(val.kota);
            // console.log(chkotaoffice);
            setChjalanoffice(val.jalan);
            // console.log(chjalanoffice);
            setChlatoffice(val.latitude);
            setChlongoffice(val.longitude);
            // console.log("jalan")
          });
        }
      }
    );
    toggleDelete();
  };

  return (
    <div className="visimisi-container" id="office">
      {showProgressBar && (
        <>
          <Water />
        </>
      )}
      <div className="row">
        <h1 className="profiil">Office</h1>
        <form>
          <input
            type="text"
            className="search"
            placeholder={"search office"}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          ></input>
        </form>
        <h1 className="button add" onClick={() => toggleAddOPopup()}>
          +
        </h1>
      </div>
      <div className="office-editor-container col">
        {load ? (
          <Waveloader />
        ) : (
          <table>
            <tr>
              <th>Kota</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
            {office.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="table-name">{val.kota}</td>
                  <td className="table-name">{val.jalan}</td>
                  <td className="table-btn">
                    <div className="table-center">
                      <button onClick={() => getOfficeId(val.ID_OFFICE)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="black"
                          width={"100%"}
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </button>
                      <button onClick={() => getdataDelete(val.ID_OFFICE)}>
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
        )}
        {nfound && (
          <>
            <h1 className="not-found">data not found</h1>
          </>
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

        {isdelete && (
          <div className="popup-logout">
            <div className="popup-box">
              <div className="box">
                <h1
                  style={{
                    color: "black",
                    fontSize: "calc(10px + 1vw)",
                  }}
                >
                  Apakah anda ingin menghapus {chkotaoffice}?
                </h1>
                <div className="row">
                  <h1
                    className="button logout"
                    onClick={() => deleteOffice(chidoffice)}
                    id="profilbtn"
                  >
                    Hapus
                  </h1>
                  <h1
                    className="button"
                    id="cancel-logout"
                    onClick={() => toggleDelete()}
                  >
                    Batal
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
        {isAddOOpen && (
          <div className="edit-office-container">
            <div className="popup-box">
              <div className="box">
                <span className="close-icon" onClick={toggleAddOPopup}>
                  x
                </span>
                <form onSubmit={(event) => addOffice(event)}>
                  <label>Kota</label>
                  <input
                    required
                    value={chkotaoffice}
                    placeholder="Kota"
                    onChange={(event) => {
                      setChkotaoffice(event.target.value);
                    }}
                  ></input>
                  <label>Alamat</label>
                  <textarea
                    required
                    placeholder="Jalan"
                    value={chjalanoffice}
                    onChange={(event) => {
                      setChjalanoffice(event.target.value);
                    }}
                  />
                  <div className="row">
                    <div className="col">
                      <label>Latitude</label>
                      <input
                        required
                        type="text"
                        placeholder="Latitude"
                        value={chlatoffice}
                        onChange={(event) => {
                          handleLatChange(event);
                        }}
                      ></input>
                    </div>
                    <div className="col">
                      <label>Longitude</label>
                      <input
                        required
                        type="text"
                        placeholder="Longitude"
                        value={chlongoffice}
                        onChange={(event) => {
                            handleLongChange(event);
                          }}
                      ></input>
                    </div>
                  </div>
                  <input type="submit" value="save"></input>
                </form>
              </div>
            </div>
          </div>
        )}
        {isEditOOpen && (
          <div className="edit-office-container">
            <div className="popup-box">
              <div className="box">
                <span className="close-icon" onClick={toggleEditOPopup}>
                  x
                </span>
                <form onSubmit={(event) => updateOffice(chidoffice, event)}>
                  <label>Kota</label>
                  <input
                    required
                    value={chkotaoffice}
                    onChange={(event) => {
                      setChkotaoffice(event.target.value);
                    }}
                  ></input>
                  <label>Alamat</label>
                  <textarea
                    required
                    placeholder="Jalan"
                    value={chjalanoffice}
                    onChange={(event) => {
                      setChjalanoffice(event.target.value);
                    }}
                  />
                  <div className="row">
                    <div className="col">
                      <label>Latitude</label>
                      <input
                        required
                        type="text"
                        placeholder="Latitude"
                        value={chlatoffice}
                        onChange={(event) => {
                            handleLatChange(event);
                          }}
                      ></input>
                    </div>
                    <div className="col">
                      <label>Longitude</label>
                      <input
                        required
                        type="text"
                        placeholder="Longitude"
                        value={chlongoffice}
                        onChange={(event) => {
                            handleLongChange(event);
                          }}
                      ></input>
                    </div>
                  </div>
                  <input type="submit" value="save"></input>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* </div>
                  );
                })} */}
      </div>
    </div>
  );
}
