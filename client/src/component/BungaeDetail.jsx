import { useNavigate } from "react-router-dom";
import * as cardFunction from "../util/cardFunction";
import Button from "./UI/Button";
import "../styles/css/BungaeDetailPage.css";
import * as authApi from "../api/auth";
import { useState } from "react";

function BungaeDetail({ bungaeDetail, isParticipating }) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const currentUser = userInfo.nickname;
  const [errorMessage, setErrorMessage] = useState("");

  const {
    id,
    title,
    owner,
    location,
    createdAt,
    meetingAt,
    openChat,
    numberOfParticipants,
    numberOfRecruits,
    description
  } = bungaeDetail;

  const meetingLoacation = cardFunction.getMeetingLocation(location);
  const meetingTime = cardFunction.getMeetingTime(meetingAt);
  const meetingDate = cardFunction.getMeetingDate(meetingAt);
  const createdDate = cardFunction.getFormattedCreationDate(createdAt);

  const handleClickEdit = () => {
    navigate(`/bungae-edit/${id}`, { state: { ...bungaeDetail } });
  };

  const token = localStorage.getItem("token");

  const handleClickDelete = async () => {
    const confirmation = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      try {
        await authApi.bungaeDelete(id, token);
        navigate("/bungae-list");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClickParticipate = async () => {
    try {
      if (!isParticipating) {
        await authApi.participate(id, token);
        window.location.reload();
      } else {
        await authApi.leave(id, token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        setErrorMessage("모집이 마감되었습니다!");
      }
    }
  };

  const canEditOrDelete = currentUser === bungaeDetail.owner.nickname;

  return (
    <>
      <section className="bungaeDetail-header">
        <div className="bungaeDetail-title">{title}</div>
        <div className="bungaeDetail-headerContainer">
          <div className="bungae-owner-date">
            <div className="bungae-owner">
              {owner.emoji} {owner.nickname}
            </div>
            <div>{createdDate}</div>
          </div>
          {canEditOrDelete && (
            <div className="bungae-edit-and-delete">
              <Button styles="lightblue" onClick={handleClickEdit}>
                수정
              </Button>
              <Button styles="gray" onClick={handleClickDelete}>
                삭제
              </Button>
            </div>
          )}
        </div>
      </section>
      <ul className="bungaeDetail-InfoContainer">
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">모임 장소</div>
          <div>{meetingLoacation}</div>
        </li>
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">모임 날짜</div>
          <div>{meetingDate}</div>
        </li>
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">모임 시간</div>
          <div>{meetingTime}</div>
        </li>
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">연락 방법</div>
          <a href={openChat} target="_blank" rel="noopener noreferrer">
            카카오톡 오픈채팅
          </a>
        </li>
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">모집 현황</div>
          <div>{`${numberOfParticipants} / ${numberOfRecruits}`}</div>
        </li>
      </ul>
      <div className="button-wrapper">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {isParticipating ? (
          <Button
            styles="blue"
            margin="margin"
            onClick={handleClickParticipate}
          >
            참석 취소
          </Button>
        ) : (
          <Button
            styles="blue"
            margin="margin"
            onClick={handleClickParticipate}
          >
            번개 참석하기
          </Button>
        )}
      </div>
      <section className="bungaeDetail-introductionContent">
        <div className="bungae-introduction-title">[ 번개 소개 ]</div>
        <div className="bungae-introduction-description">{description}</div>
      </section>
    </>
  );
}

export default BungaeDetail;
