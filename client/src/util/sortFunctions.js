export const sortByLatest = (list) => {
  return list.sort((a, b) => {
    const aCreatedAt = new Date(a.createdAt);
    const bCreatedAt = new Date(b.createdAt);

    const aIsClosed = a.numberOfParticipants >= a.numberOfRecruits;
    const bIsClosed = b.numberOfParticipants >= b.numberOfRecruits;

    const aMeetingTime = new Date(a.meetingAt);
    const bMeetingTime = new Date(b.meetingAt);

    if (aIsClosed && !bIsClosed) {
      return 1;
    } else if (!aIsClosed && bIsClosed) {
      return -1;
    }

    if (aMeetingTime <= new Date() && !aIsClosed) {
      return 1;
    }

    if (bMeetingTime <= new Date() && !bIsClosed) {
      return -1;
    }

    return bCreatedAt - aCreatedAt;
  });
};

export const sortByDeadline = (list) => {
  const currentDate = new Date();
  return list.sort((a, b) => {
    const aDeadline = new Date(a.meetingAt);
    const bDeadline = new Date(b.meetingAt);

    const aIsClosed =
      aDeadline < currentDate || a.numberOfParticipants >= a.numberOfRecruits;
    const bIsClosed =
      bDeadline < currentDate || b.numberOfParticipants >= b.numberOfRecruits;

    if (aIsClosed && !bIsClosed) {
      return 1;
    } else if (!aIsClosed && bIsClosed) {
      return -1;
    }

    return aDeadline - bDeadline;
  });
};
