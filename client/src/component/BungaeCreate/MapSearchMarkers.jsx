import { Fragment } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

function MapSearchMarkers({
  markers,
  overlayMap,
  handleMouseOverMarker,
  handleMouseOutMarker
}) {
  return (
    <>
      {markers.map((marker) => {
        return (
          <Fragment key={marker.idx}>
            <MapMarker
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
                size: { width: 36, height: 37 },
                options: {
                  spriteSize: { width: 36, height: 691 },
                  spriteOrigin: { x: 0, y: marker.idx * 46 + 10 },
                  offset: { x: 13, y: 37 }
                }
              }}
              position={marker.position}
              onMouseOver={() => handleMouseOverMarker(marker.idx)}
              onMouseOut={handleMouseOutMarker}
            ></MapMarker>
            {overlayMap === marker.idx && (
              <CustomOverlayMap
                position={marker.position}
                yAnchor={1.5}
                xAnchor={0.5}
              >
                <div className="OverlayContent">{marker.place}</div>
                <div className="OverlayTail"></div>
              </CustomOverlayMap>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default MapSearchMarkers;
