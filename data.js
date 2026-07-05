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
      maker: "Boeing",
      description:
        "Boeing 727-100은 보잉 727 계열의 초기형 여객기입니다. 동체 뒤쪽에 3개의 엔진을 배치한 삼발기 구조와 T자형 꼬리날개가 특징이며, 당시 주요 공항뿐 아니라 활주로 여건이 비교적 제한적인 노선에서도 운용할 수 있도록 설계되었습니다.",
    },
    {
      type: "B707-320B",
      fullName: "Boeing 707-320B",
      maker: "Boeing",
      description:
        "Boeing 707-320B는 707-320 계열을 바탕으로 성능을 개선한 4발 제트 여객기입니다. 터보팬 엔진을 적용해 항속 성능과 연료 효율을 높였고, 707 계열이 국제선 제트 여객 운항의 대표 기종으로 자리 잡는 데 큰 역할을 했습니다.",
    },
  ],
  contact: {
    formEndpoint: "",
    fallbackEmail: "",
  },
};
