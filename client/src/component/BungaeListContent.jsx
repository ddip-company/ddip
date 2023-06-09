import Card from "./Card";
import * as cardFunction from "../util/cardFunction";

const BungaeListContent = ({ bungaeList }) => {
  return (
    <ul className="card-div">
      {bungaeList.map((item, idx) => {
        if (!item) {
          return (
            <li key={idx} className="card-container">
              <div className="notify-head">"모집중인 번개가 없습니다"</div>
              <div className="notify-body">-no schedule-</div>
            </li>
          );
        }
        const {
          id,
          owner,
          title,
          location,
          createdAt,
          meetingAt,
          numberOfParticipants,
          numberOfRecruits
        } = item;
        const status = cardFunction.getBungaeStatus(createdAt, meetingAt);
        const place = location.city + " " + location.state;
        const time = cardFunction.formatDate(meetingAt);

        return (
          <Card
            key={id}
            id={id}
            status={status}
            place={place}
            time={time}
            createdAt={createdAt}
            meetingAt={meetingAt}
            title={title}
            emoji={owner.emoji}
            nickname={owner.nickname}
            numberOfParticipants={numberOfParticipants}
            numberOfRecruits={numberOfRecruits}
          />
        );
      })}
    </ul>
  );
};

export default BungaeListContent;
