const regularDestinations = [
  "뉴욕",
  "오사카",
  "댈러스",
  "뉴델리",
  "도쿄",
  "로마",
  "LA",
  "이스탄불",
  "마드리드",
  "광저우",
  "뭄바이",
  "디트로이트",
  "바르셀로나",
  "홍콩",
  "런던",
  "모스크바",
  "암스테르담",
  "오슬로",
  "파리",
  "베이징",
  "애틀랜타",
  "상하이",
  "보스턴",
  "샌프란시스코",
  "방콕",
  "서울",
  "카이로",
  "시카고",
  "쿠웨이트",
  "쿠알라룸푸르",
  "샬럿",
];

const siteData = {
  brand: {
    name: "BVG Aviation",
    tagline: "Berlin hub airline",
    slogan: "BVG는 행복을 싣고",
    notice:
      "BVG Aviation은 베를린을 허브로 삼아 전 세계 주요 도시를 연결하는 ATO3 가상 항공사입니다.",
  },
  company: {
    title: "BVG Aviation",
    intro:
      "BVG aviation은 베를린 시민들의 발이 되어주고 있는 베를린 교통공사의 항공 부서로, 1965년 1월부터 베를린 시민들의 날개 역할을 맡게 되었습니다. 1966년 1월부터 BVG에서 독립하여 BVG Aviation이 되었습니다.",
  },
  routes: regularDestinations.map((city) => ({
    from: "베를린",
    to: city,
    status: "운항 중",
  })),
  specialRoutes: [
    {
      name: "휴양지 순환 노선",
      path: ["베를린", "아바나", "파페에테"],
      description: "장거리 휴양 수요를 겨냥한 순환 관광 노선입니다.",
    },
    {
      name: "남극 항로 노선",
      path: ["베를린", "케이프타운", "크라이스트처치"],
      description: "남극 항로 운항을 위한 장거리 순환 노선입니다.",
    },
  ],
  servedCities: ["베를린", ...regularDestinations],
  fleet: [
    {
      type: "B707-320B",
      fullName: "Boeing 707-320B",
      maker: "Boeing",
      count: 7,
      image: "bvg-707-320b.jpg",
      description:
        "보잉 707-320B는 보잉 707 계열의 장거리형 개량 기종으로, 터보팬 엔진을 장착해 기존 707보다 항속거리와 연비가 좋아진 여객기입니다. 1950~60년대 국제선 제트 여객기 시대를 대표했으며, 대서양·태평양 장거리 노선에서 많이 사용되었습니다.",
      details: [
        "배경: 더 먼 거리와 높은 운항 효율을 원하는 항공사들의 요구에 따라 707-320을 개량해 개발됨",
        "사양: Pratt & Whitney JT3D 터보팬 엔진 4기, 항속거리 약 9,600km, 순항속도 약 900km/h, 좌석 수 약 140~180석.",
        "첫 운행: 707 계열은 1958년 10월 26일 팬암이 처음 운항했으며, 707-320B는 1960년대 초반부터 운항됨",
        "특징: 4발 장거리 제트기, 개선된 연비와 항속거리, 대륙 간 국제선 운항에 적합함",
      ],
    },
    {
      type: "B727-100",
      fullName: "Boeing 727-100",
      maker: "Boeing",
      count: 5,
      image: "bvg-727-100.jpg",
      description:
        "보잉 727-100은 보잉 727 계열의 초기형으로, 707보다 작은 공항과 중·단거리 노선에 맞게 개발된 3발 제트 여객기입니다. 엔진이 모두 기체 뒤쪽에 달려 있고 T자형 꼬리날개를 가진 독특한 외형이 특징입니다.",
      details: [
        "배경: 짧은 활주로를 가진 지방 공항에서도 운항할 수 있는 제트 여객기가 필요해 개발됨",
        "사양: Pratt & Whitney JT8D 터보팬 엔진 3기, 항속거리 약 4,100km, 순항속도 약 900km/h, 좌석 수 약 100~130석.",
        "첫 운행: 1964년 2월 1일 이스턴 항공이 처음 정기 운항을 시작함",
        "특징: 후방 3발 엔진, T자형 꼬리날개, 강력한 플랩과 슬랫으로 짧은 활주로 운용에 유리함",
      ],
    },
    {
      type: "DC-8-62",
      fullName: "Douglas DC-8-62",
      maker: "Douglas",
      count: 7,
      image: "bvg-dc8-62.jpg",
      description:
        "더글러스 DC-8-62는 DC-8 계열의 장거리형 여객기로, 길어진 항속거리와 개선된 효율을 바탕으로 대륙 간 노선에 투입된 4발 제트 여객기입니다.",
      details: [
        "배경: 장거리 국제선 수요에 대응하기 위해 DC-8 계열을 개량해 개발됨",
        "사양: 터보팬 엔진 4기, 장거리 국제선 운항에 적합한 항속거리와 순항 성능을 갖춤",
        "첫 운행: DC-8 계열은 1959년부터 상업 운항을 시작했으며, DC-8-62는 1960년대 후반 장거리형으로 운항됨",
        "특징: 긴 동체와 4발 엔진, 대륙 간 노선 운항에 적합한 장거리 성능",
      ],
    },
    {
      type: "DC-8-62 for BVG",
      fullName: "Douglas DC-8-62 for BVG",
      maker: "Douglas",
      count: 1,
      image: "bvg-dc8-62.jpg",
      description:
        "DC-8-62 for BVG는 BVG Aviation의 남극 항로 노선을 위해 1대 특별 제작된 장거리 사양 기종입니다. 항속거리 11,556km를 목표로 하며 베를린-케이프타운-크라이스트처치 순환 운항에 투입됩니다.",
      details: [
        "배경: 남극 항로 관광 순환 노선 운항을 위해 특별 사양으로 도입됨",
        "사양: 항속거리 11,556km, 장거리 순환 노선 운항을 고려한 BVG 전용 사양",
        "운용 목적: 베를린-케이프타운-크라이스트처치 남극 항로 노선 투입",
        "특징: BVG Aviation 전용 특별 제작기, 초장거리 관광 노선 운용에 특화됨",
      ],
    },
  ],
  disclosure: {
    headline: "BVG는 정직한 운영을 추구합니다.",
    note: "한화 환산액은 표시 효율을 위해 1달러=1,380원 기준으로 계산합니다.",
    reports: [
      {
        year: 1965,
        revenueUsdK: 391501,
        costUsdK: 377380,
        aircraftPurchaseUsdK: 801488,
        profitUsdK: 14121,
      },
      {
        year: 1966,
        revenueUsdK: 592791,
        costUsdK: 477295,
        aircraftPurchaseUsdK: 164720,
        profitUsdK: 115496,
      },
      {
        year: 1967,
        revenueUsdK: 695761,
        costUsdK: 550043,
        aircraftPurchaseUsdK: 256116,
        profitUsdK: 145718,
      },
    ],
  },
  contact: {
    formEndpoint: "",
    fallbackEmail: "",
  },
};
