import { useEffect, useState } from "react";
import "../styles/css/Card.css";
import * as cardFunction from "../util/cardFunction";
import { useNavigate } from "react-router-dom";

function Card({
  id,
  status,
  title,
  emoji,
  nickname,
  place,
  time,
  meetingAt,
  numberOfParticipants,
  numberOfRecruits
}) {
  const navigate = useNavigate();
  const [duration, setDuration] = useState("00:00:00");
  useEffect(() => {
    if (status.text === "모집마감") {
      setDuration("00:00:00");
      return;
    }
    const interval = setInterval(() => {
      const newDuration = cardFunction.updateRemainingTime(meetingAt, interval);
      setDuration(newDuration);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [meetingAt, status.text]);

  return (
    <li
      className={`card-container ${status.color}`}
      onClick={() => navigate(`/bungae-detail/${id}`)}
    >
      <div className={`card-deadline ${status.color}`}>{status.text}</div>
      <div className="card-title">{title}</div>
      <div className="card-box">
        <div className="box-left">
          <p className="card-emoji">{emoji}</p>
          <div className="card-nickname">{nickname}</div>
        </div>
        <div className="box-right">
          <img
            className="recruitsImg"
            src={process.env.PUBLIC_URL + "/img/people.png"}
            alt="peolpe img"
          />
          <div className="card-recruits">{`${numberOfParticipants}/${numberOfRecruits}`}</div>
        </div>
      </div>
      <div className="card-local">{place}</div>
      <div className="card-time">{time}</div>
      <p className="card-footer">번개 마감 까지</p>
      <div className="card-count">{duration}</div>
    </li>
  );
}

export default Card;
