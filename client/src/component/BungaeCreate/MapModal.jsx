import { useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import InputWithLabel from "../UI/InputWithLabel";
import MapSearchMarkers from "./MapSearchMarkers";
import MapSearchPagination from "./MapSearchPagination";
import MapSearchList from "./MapSearchList";
import "../../styles/css/BungaeCreatePage.css";

const { kakao } = window;

function MapModal({ isMapOpen, handleCloseMap, handleSelectAddress }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [pagination, setPagination] = useState({});
  const [center, setCenter] = useState({
    lat: 37.566769,
    lng: 126.978323
  });
  const [overlayMap, setOverlayMap] = useState(null);

  const ulRef = useRef(null);

  const handleChagneKeyword = (e) => {
    setKeyWord(e.target.value);
  };

  const handleClickList = (position) => {
    setCenter(position);
  };
  const handleMouseOverForOverlayMap = (idx) => {
    setOverlayMap(idx);
  };
  const handleMouseOutForOverlayMap = () => {
    setOverlayMap(null);
  };

  const handleClickPagination = (page) => {
    pagination.gotoPage(page);
    ulRef.current.scrollTo(0, 0);
  };

  const places = new kakao.maps.services.Places();

  const displayPlaces = (data) => {
    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체
    const bounds = new kakao.maps.LatLngBounds();
    const markers = [];

    for (let i = 0; i < data.length; i++) {
      markers.push({
        position: {
          lat: data[i].y,
          lng: data[i].x
        },
        place: data[i].place_name,
        address: data[i].road_address_name,
        idx: i
      });

      const latLng = new kakao.maps.LatLng(data[i].y, data[i].x);
      // LatLngBounds 객체에 좌표를 추가
      bounds.extend(latLng);
    }
    setMarkers(markers);
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정
    map.setBounds(bounds);
  };

  const displayPagination = (pagination) => {
    const { ...rest } = pagination;
    const pages = [];
    for (let i = 1; i <= pagination.last; i++) {
      pages.push(i);
    }
    setPagination({ ...rest, pages });
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      const { ...rest } = pagination;
      setPagination(rest);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      window.alert("키워드를 입력해주세요.");
      return;
    }
    places.keywordSearch(keyword, placesSearchCB, { size: 10 });
  };

  return (
    <Modal isOpen={isMapOpen} onClose={handleCloseMap}>
      <div className="map-container">
        <Map
          center={center}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "5px"
          }}
          level={9}
          onCreate={setMap}
        >
          <div className="map-searchContainer">
            <form className="map-searchForm" onSubmit={handleSubmitSearch}>
              <InputWithLabel
                value={keyword}
                placeholder="장소를 입력해주세요"
                onChange={handleChagneKeyword}
              />
              <Button styles="blue" type="submit" fullHeight="full-height">
                <img
                  src={process.env.PUBLIC_URL + "/img/search-white.svg"}
                  alt="search button"
                />
              </Button>
            </form>
            <MapSearchList
              markers={markers}
              ref={ulRef}
              handleClickList={handleClickList}
              handleMouseOverList={handleMouseOverForOverlayMap}
              handleMouseOutList={handleMouseOutForOverlayMap}
              handleSelectAddress={handleSelectAddress}
            />
            <MapSearchPagination
              pagination={pagination}
              handleClickPagination={handleClickPagination}
            />
          </div>
          <Button
            styles="lightblue"
            fullWidth="fullWidth"
            onClick={handleCloseMap}
          >
            &times;
          </Button>
          <MapSearchMarkers
            markers={markers}
            overlayMap={overlayMap}
            handleMouseOverMarker={handleMouseOverForOverlayMap}
            handleMouseOutMarker={handleMouseOutForOverlayMap}
          />
        </Map>
      </div>
    </Modal>
  );
}

export default MapModal;
