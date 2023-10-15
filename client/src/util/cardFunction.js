import { bungaeStatus } from "../static/bungaeStatus";
import { numberOptionList, timeOptionList } from "../static/dummy/dropdown";

const padZero = (number) => {
  return String(number).padStart(2, "0");
};

export const getMeetingTime = (meetingAt) => {
  const meetingDate = new Date(meetingAt);
  const hours = padZero(meetingDate.getHours());
  const minutes = padZero(meetingDate.getMinutes());
  return `${hours}:${minutes}`;
};

export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

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

  const hours = padZero(Math.floor(remainingTime / (1000 * 60 * 60)));
  remainingTime %= 1000 * 60 * 60;
  const minutes = padZero(Math.floor(remainingTime / (1000 * 60)));
  remainingTime %= 1000 * 60;
  const seconds = padZero(Math.floor(remainingTime / 1000));

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

export const getMeetingLocation = (location) => {
  return `${location.city} ${location.state} ${location.street} ${location.zipCode} ${location.detail}`;
};

export const getInitialBungaeState = (bungaeDetail) => {
  let initialNumberOfRecruits = { name: "1명 ~ 10명", value: null };
  let initialMeetingTime = { name: "00:30 ~ 23:30", value: null };
  let initialMeetingLocation = null;
  let initialOpenChat = "";
  let initialIntroduction = { title: "", description: "" };

  if (bungaeDetail) {
    const {
      numberOfRecruits,
      meetingAt,
      location,
      openChat,
      title,
      description
    } = bungaeDetail;

    initialNumberOfRecruits = numberOptionList.find(
      ({ value }) => value === numberOfRecruits
    );
    initialMeetingTime = timeOptionList.find(
      ({ name }) => name === getMeetingTime(meetingAt)
    );
    initialMeetingLocation = getMeetingLocation(location);
    initialOpenChat = openChat;
    initialIntroduction = {
      title: title,
      description: description
    };
  }

  return {
    initialNumberOfRecruits,
    initialMeetingTime,
    initialMeetingLocation,
    initialOpenChat,
    initialIntroduction
  };
};

export const getCurrentDate = (isoDateString) => {
  const date = isoDateString ? new Date(isoDateString) : new Date();
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `${year}-${month}-${day}`;
};

export const getCombinedDateTimeString = (time) => {
  const currentDate = getCurrentDate();
  return `${currentDate}T${time}`;
};

export const getFormattedCreationDate = (createdAt) => {
  return getCurrentDate(createdAt);
};
