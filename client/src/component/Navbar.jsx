import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./UI/LogoutButton";
import "../styles/css/Navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { localList } from "../static/dummy/localList";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggined, userInfo } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedLocal, setSelectedLocal] = useState({
    sido: "",
    sigugun: "",
    gu: ""
  });
  const { sido, sigugun } = selectedLocal;
  const localIsSelected = sido !== "" && sigugun !== "";
  const [currentSido, setCurrentSido] = useState(0);
  const [currentSigugun, setCurrentSigugun] = useState(null);

  const handleSearch = () => {
    const data = {
      keyword: inputValue,
      country: "",
      city: selectedLocal.sido,
      state: selectedLocal.sigugun,
      street: selectedLocal.gu,
      zipCode: "",
      detail: ""
    };
    navigate("/bungae-search", { state: data });
  };

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
    const sigugunParts = text.split(" ");

    if (sigugunParts.length > 1) {
      // 띄어쓰기가 포함된 경우
      setSelectedLocal((prev) => ({
        sido: prev.sido, // 시도는 그대로 유지
        sigugun: sigugunParts[0], // 첫 번째 부분을 시군으로 설정
        gu: sigugunParts.slice(1).join(" ") // 나머지 부분을 구로 설정
      }));
    } else {
      // 띄어쓰기가 없는 경우
      setSelectedLocal((prev) => ({
        sido: prev.sido, // 시도는 그대로 유지
        sigugun: text, // 그냥 선택된 시군으로 설정
        gu: "" // 구는 빈 문자열로 설정
      }));
    }
  };

  const resetSelectionHandler = () => {
    setCurrentSido(0);
    setCurrentSigugun(null);
    setSelectedLocal({
      sido: "",
      sigugun: "",
      gu: ""
    });
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="nav-container">
      <div className="nav-containerLeft">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/img/logo.png"}
            alt="logo img"
            width="100px"
            height="50px"
          />
        </Link>
        <div className="nav-searchBar">
          <img
            className="searchImg"
            src={process.env.PUBLIC_URL + "/img/search.png"}
            alt="search img"
          />
          <input
            className="nav-input"
            placeholder="어떤 번개를 찾으시나요?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleInputKeyPress}
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
        <Button margin="margin" styles="blue" onClick={handleSearch}>
          검색
        </Button>
        <div className="local-selected">
          {localIsSelected ? (
            <p className="selected">{`${sido} ${sigugun} ${selectedLocal.gu}`}</p>
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
                    role="menuitem"
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
                    role="menuitem"
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
          <Link to="/bungae-list">
            <div className="nav-btn-text">번개목록</div>
          </Link>
          {!isLoggined ? null : (
            <Link to="/bungae-create">
              <div className="nav-mainbtn-text">번개만들기</div>
            </Link>
          )}
          {!isLoggined ? (
            <Link to="/guide">
              <div className="nav-btn-text">이용안내</div>
            </Link>
          ) : (
            <Link to={`/mypage/${userInfo.nickname}`}>
              <div className="nav-btn-text">마이페이지</div>
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
    </section>
  );
};

export default Navbar;
