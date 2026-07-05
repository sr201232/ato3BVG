const siteData = {
  brand: {
    name: "BVG",
    tagline: "Berlin hub airline",
    notice: "BVG는 ATO3 게임 내 가상 항공사입니다.",
  },
  routes: [
    { from: "Berlin", to: "Paris", status: "운항 중" },
    { from: "Berlin", to: "London", status: "운항 중" },
    { from: "Berlin", to: "Moscow", status: "운항 중" },
    { from: "Berlin", to: "Madrid", status: "운항 중" },
    { from: "Berlin", to: "Rome", status: "운항 중" },
    { from: "Berlin", to: "New York", status: "운항 중" },
    { from: "Berlin", to: "Seoul", status: "운항 중" },
    { from: "Berlin", to: "Hong Kong", status: "운항 중" },
  ],
  fleet: [
    {
      type: "B727-100",
      fullName: "Boeing 727-100",
      role: "중거리 제트기",
      description: "삼발 제트 여객기로, BVG의 유럽권 네트워크를 담당하는 기종입니다.",
    },
    {
      type: "B707-320B",
      fullName: "Boeing 707-320B",
      role: "장거리 제트기",
      description: "대륙 간 운항을 위한 장거리 여객기로, BVG의 국제선 확장에 쓰이는 기종입니다.",
    },
  ],
  contact: {
    formEndpoint: "",
    fallbackEmail: "",
  },
};
