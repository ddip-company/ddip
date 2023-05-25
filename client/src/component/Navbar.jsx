import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import Modal from "./Modal";
import Button from "./Button";
import { localList } from "../static/dummy/localList";

// useContext는 전역으로 관리하는 데이터를 받아올 수 있게 하는 함수

const Navbar = () => {
  const { isLoggined, userInfo } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState({
    sido: "",
    sigugun: ""
  });
  const { sido, sigugun } = selectedLocal;
  const localIsSelected = sido !== "" && sigugun !== "";
  const [currentSido, setCurrentSido] = useState(0);
  const [currentSigugun, setCurrentSigugun] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const selectSidoHandler = (idx, text) => {
    setCurrentSido(idx);
    setSelectedLocal({ sido: text, sigugun: "" });
    setCurrentSigugun((prev) => ({ ...prev, sigugun: null }));
  };
  const selectSigugunHandler = (idx, text) => {
    setCurrentSigugun(idx);
    setSelectedLocal((prev) => ({ ...prev, sigugun: text }));
  };
  const resetSelectionHandler = () => {
    setCurrentSido(0);
    setCurrentSigugun(null);
    setSelectedLocal({
      sido: "",
      sigugun: ""
    });
  };

  return (
    <div className="nav-container">
      <div className="nav-containerLeft">
        <img
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="logo img"
          width="100px"
          height="50px"
        />

        <div className="nav-searchBar">
          <img
            className="searchImg"
            src={process.env.PUBLIC_URL + "/img/search.png"}
            alt="search img"
          />
          <input
            className="nav-input"
            placeholder="어떤 번개를 찾으시나요?"
          ></input>
        </div>
        <div className="nav-local" onClick={openModal}>
          <img
            className="mapImg"
            src={process.env.PUBLIC_URL + "/img/map.png"}
            alt="map img"
          />
          <div className="local">지역</div>
        </div>
        <Button margin="margin" styles="blue">
          검색
        </Button>
        <div className="local-selected">
          {localIsSelected ? (
            <p className="selected">{`${sido} ${sigugun}`}</p>
          ) : null}
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <h1 className="localList-header">지역선택</h1>
          <div className="localList-wrapper">
            <div>
              <div className="list-title">시·도</div>
              <ul className="sido-list">
                {localList.map(({ sido }, idx) => (
                  <li
                    key={idx}
                    className={
                      idx === currentSido ? "active list-li" : "list-li"
                    }
                    onClick={() => selectSidoHandler(idx, sido)}
                  >
                    {sido}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="list-title">시·구·군</div>
              <ul className="sigugun-list">
                {localList[currentSido].sigugun.map((el, idx) => (
                  <li
                    key={idx}
                    className={
                      idx === currentSigugun ? "active list-li" : "list-li"
                    }
                    onClick={() => selectSigugunHandler(idx, el)}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="button-container">
            <Button
              styles="gray"
              fullWidth="full-width"
              onClick={resetSelectionHandler}
            >
              초기화
            </Button>
            <Button styles="blue" fullWidth="full-width" onClick={closeModal}>
              확인
            </Button>
          </div>
        </Modal>
      </div>
      <div className="nav-containerRight">
        <div className="nav-btn">
          <Link to="/">
            <div className="nav-btn-text">번개목록</div>
          </Link>
          {!isLoggined ? null : (
            <Link to="/signup">
              <div className="nav-mainbtn-text">번개만들기</div>
            </Link>
          )}
          {!isLoggined ? null : (
            <Link to={`/mypage/${userInfo.nickname}`}>
              <span className="nav-btn-text">마이페이지</span>
            </Link>
          )}
          {!isLoggined ? (
            <Link to="/login">
              <div className="nav-btn-text">로그인</div>
            </Link>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
