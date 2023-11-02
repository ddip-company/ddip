import { forwardRef } from "react";
import Button from "../UI/Button";
import * as mapUtils from "../../util/mapUtils";

const { kakao } = window;

function MapSearchListItem(
  {
    markers,
    handleClickList,
    handleMouseOverList,
    handleMouseOutList,
    handleSelectAddress
  },
  ref
) {
  const handleRegisterButtonClick = (marker) => {
    const lat = marker.position.lat;
    const lng = marker.position.lng;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;

        handleSelectAddress(address);
      } else {
        console.error("주소 변환 실패:", status);
      }
    };
    geocoder.coord2Address(lng, lat, callback);
  };

  return (
    <ul className="map-search-list" ref={ref}>
      {markers.map((marker) => {
        const position = mapUtils.getBackgroundPosition(marker.idx);
        return (
          <li className="SearchListItem" key={marker.idx}>
            <div
              className="MarkerAndPlaceContainer"
              onClick={() => handleClickList(marker.position)}
              onMouseOver={() => handleMouseOverList(marker.idx)}
              onMouseOut={() => handleMouseOutList(marker.idx)}
            >
              <span
                className="Marker"
                style={{ backgroundPosition: position }}
              />
              <div className="PlaceInfoContainer">
                <div className="place-name">{marker.place}</div>
                <div className="place-address">{marker.address}</div>
              </div>
            </div>
            <Button
              styles="blue"
              fullWidth="fullWidth"
              type="submit"
              onClick={() => handleRegisterButtonClick(marker)}
            >
              등록하기
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default forwardRef(MapSearchListItem);
