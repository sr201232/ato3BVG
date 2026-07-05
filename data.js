const siteData = {
  brand: {
    name: "BVG",
    tagline: "Berlin hub airline",
    notice: "BVG는 ATO3 게임 내 가상 항공사입니다.",
  },
  hub: {
    city: "Berlin",
  },
  status: {
    label: "운항 중",
  },
  routes: [
    { number: "BVG 101", from: "Berlin", to: "Paris", aircraft: "B727-100", status: "운항 중" },
    { number: "BVG 102", from: "Berlin", to: "London", aircraft: "B727-100", status: "운항 중" },
    { number: "BVG 103", from: "Berlin", to: "Moscow", aircraft: "B727-100", status: "운항 중" },
    { number: "BVG 104", from: "Berlin", to: "Madrid", aircraft: "B727-100", status: "운항 중" },
    { number: "BVG 105", from: "Berlin", to: "Rome", aircraft: "B727-100", status: "운항 중" },
    { number: "BVG 201", from: "Berlin", to: "New York", aircraft: "B707-320B", status: "운항 중" },
    { number: "BVG 202", from: "Berlin", to: "Seoul", aircraft: "B707-320B", status: "운항 중" },
    { number: "BVG 203", from: "Berlin", to: "Hong Kong", aircraft: "B707-320B", status: "운항 중" },
  ],
  fleet: [
    {
      type: "B727-100",
      fullName: "Boeing 727-100",
      role: "유럽 중거리 노선",
      description: "Paris, London, Moscow, Madrid, Rome 노선에 투입되는 BVG의 중거리 기재입니다.",
    },
    {
      type: "B707-320B",
      fullName: "Boeing 707-320B",
      role: "장거리 국제 노선",
      description: "New York, Seoul, Hong Kong 노선을 담당하는 BVG의 장거리 기재입니다.",
    },
  ],
  contact: {
    formEndpoint: "",
    fallbackEmail: "",
  },
};
