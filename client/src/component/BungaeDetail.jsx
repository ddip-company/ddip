import { useNavigate } from "react-router-dom";
import * as cardFunction from "../util/cardFunction";
import Button from "./Button";
import "../styles/css/BungaeDetailPage.css";

function BungaeDetail({ bungaeDetail }) {
  const navigate = useNavigate();
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
  const createdDate = cardFunction.getFormattedCreationDate(createdAt);

  const handleClickEdit = () => {
    navigate(`/bungae/${id}/edit`, { state: { ...bungaeDetail } });
  }; //수정페이지로 이동?

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
          <div className="bungae-edit-and-delete">
            <Button styles="lightblue" onClick={handleClickEdit}>
              수정
            </Button>
            <Button styles="gray">삭제</Button>
          </div>
        </div>
      </section>
      <ul className="bungaeDetail-InfoContainer">
        <li className="bungaeDetail-InfoContentWrapper">
          <div className="bungae-content-title">모임 장소</div>
          <div>{meetingLoacation}</div>
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
      <div className="button-Wrapper">
        <Button styles="blue" margin="margin">
          번개 참가하기
        </Button>
      </div>
      <section className="bungaeDetail-IntroductionContent">
        <div className="bungae-introduction-title">[ 번개 소개 ]</div>
        <div className="bungae-introduction-description">{description}</div>
      </section>
    </>
  );
}

export default BungaeDetail;
