export const searchPageTabMenu = [
  {
    name: "최신순",
    sortBy: [null, "newest"],
    linkTo: "newest",
    imageSrc: "/img/line.png",
    imageAlt: "line img"
  },
  {
    name: "마감임박순",
    sortBy: ["last-minute"],
    linkTo: "last-minute"
  }
];

export const ProfilePageTabMenu = [
  {
    name: "내가 만든 번개",
    sortBy: ["/myPage", "/myPage/created"],
    linkTo: "/myPage/created",
    imageSrc: "/img/line.png",
    imageAlt: "line img"
  },
  {
    name: "내가 참여한 번개",
    sortBy: ["/myPage/participated"],
    linkTo: "/myPage/participated"
  }
];
