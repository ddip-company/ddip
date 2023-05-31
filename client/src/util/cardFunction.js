import { bungaeStatus } from "../static/bungaeStatus";

export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}시${minutes}분`;
};

export const updateRemainingTime = (meetingAt, interval) => {
  const duration = new Date(meetingAt);

  const currentTime = new Date();
  let remainingTime = duration - currentTime;

  if (remainingTime <= 0 || !meetingAt) {
    clearInterval(interval);
    return "00:00:00";
  }

  const hours = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(
    2,
    "0"
  );
  remainingTime %= 1000 * 60 * 60;
  const minutes = String(Math.floor(remainingTime / (1000 * 60))).padStart(
    2,
    "0"
  );
  remainingTime %= 1000 * 60;
  const seconds = String(Math.floor(remainingTime / 1000)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const getDuration = (dateString) => {
  const currentDate = new Date();
  const comparedDate = new Date(dateString);
  const duration = comparedDate.getTime() - currentDate.getTime();
  return duration;
};

export const getBungaeStatus = (createdAt, meetingAt) => {
  const durationForCreatedAt = getDuration(createdAt);
  const durationForMeetingAt = getDuration(meetingAt);
  const anHourToMs = 3600000;

  if (durationForMeetingAt <= 0) {
    return bungaeStatus.closed; // 모집완료
  }
  if (Math.abs(durationForCreatedAt) < anHourToMs) {
    return bungaeStatus.new; // NEW
  } else if (durationForMeetingAt < anHourToMs) {
    return bungaeStatus.imminent; // 마감임박
  }
  return bungaeStatus.recruiting; // 모집중
};
