import "../styles/css/MeetingLocation.css";
import Button from "./UI/Button";

function MeetingLocation({ meetingLocation, handleOpenMap }) {
  return (
    <div className="LocationWrapper">
      <div className="label-wrapper">
        <span>모임 장소</span>
      </div>
      <div className="LocationBox">
        <div className="location-display-box">
          {!meetingLocation && <p>지도에서 장소를 지정해주세요</p>}
          {meetingLocation && <p className="active">{meetingLocation}</p>}
        </div>
        <Button
          styles="lightblue"
          fullWidth="fullWidth"
          fullHeight="height"
          onClick={handleOpenMap}
        >
          장소 지정하기
        </Button>
      </div>
    </div>
  );
}

export default MeetingLocation;
