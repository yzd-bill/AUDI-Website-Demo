// 车型数据
const modelsData = {
  sports: {
    name: "跑车系列",
    nameEn: "Sports Series",
    categoryPath: "跑车",
    models: [
      {
        id: "rs7",
        name: "RS7",
        nameEn: "RS7",
        imageFolder: "RS7",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "630 HP", en: "630 HP" },
          torque: { zh: "850 Nm", en: "850 Nm" },
          acceleration: { zh: "3.6秒", en: "3.6s" },
          seating: { zh: "4座", en: "4 Seats" },
          dimensions: { zh: "5012×1912×1414mm", en: "5012×1912×1414mm" }
        }
      },
      {
        id: "r8",
        name: "R8",
        nameEn: "R8",
        imageFolder: "R8",
        specs: {
          launchDate: { zh: "2023年", en: "2023" },
          topSpeed: { zh: "331 km/h", en: "331 km/h" },
          horsepower: { zh: "620 HP", en: "620 HP" },
          torque: { zh: "540 Nm", en: "540 Nm" },
          acceleration: { zh: "3.1秒", en: "3.1s" },
          seating: { zh: "2座", en: "2 Seats" },
          dimensions: { zh: "4426×1940×1236mm", en: "4426×1940×1236mm" }
        }
      },
      {
        id: "tt",
        name: "TT",
        nameEn: "TT",
        specs: {
          launchDate: { zh: "2022年", en: "2022" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "320 HP", en: "320 HP" },
          torque: { zh: "400 Nm", en: "400 Nm" },
          acceleration: { zh: "4.5秒", en: "4.5s" },
          seating: { zh: "2座", en: "2 Seats" },
          dimensions: { zh: "4191×1832×1345mm", en: "4191×1832×1345mm" }
        }
      }
    ]
  },
  sedan: {
    name: "轿车系列",
    nameEn: "Sedan Series",
    categoryPath: "轿车",
    models: [
      {
        id: "a4",
        name: "A4",
        nameEn: "A4",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "252 HP", en: "252 HP" },
          torque: { zh: "370 Nm", en: "370 Nm" },
          acceleration: { zh: "6.0秒", en: "6.0s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4858×1847×1439mm", en: "4858×1847×1439mm" }
        }
      },
      {
        id: "a6",
        name: "A6",
        nameEn: "A6",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "340 HP", en: "340 HP" },
          torque: { zh: "500 Nm", en: "500 Nm" },
          acceleration: { zh: "5.0秒", en: "5.0s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4939×1886×1457mm", en: "4939×1886×1457mm" }
        }
      },
      {
        id: "a8",
        name: "A8",
        nameEn: "A8",
        specs: {
          launchDate: { zh: "2023年", en: "2023" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "460 HP", en: "460 HP" },
          torque: { zh: "660 Nm", en: "660 Nm" },
          acceleration: { zh: "4.2秒", en: "4.2s" },
          seating: { zh: "4座", en: "4 Seats" },
          dimensions: { zh: "5305×1945×1484mm", en: "5305×1945×1484mm" }
        }
      }
    ]
  },
  suv: {
    name: "SUV系列",
    nameEn: "SUV Series",
    categoryPath: "SUV",
    models: [
      {
        id: "q5",
        name: "Q5",
        nameEn: "Q5",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "237 km/h", en: "237 km/h" },
          horsepower: { zh: "261 HP", en: "261 HP" },
          torque: { zh: "370 Nm", en: "370 Nm" },
          acceleration: { zh: "6.3秒", en: "6.3s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4680×1893×1660mm", en: "4680×1893×1660mm" }
        }
      },
      {
        id: "q7",
        name: "Q7",
        nameEn: "Q7",
        specs: {
          launchDate: { zh: "2023年", en: "2023" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "340 HP", en: "340 HP" },
          torque: { zh: "500 Nm", en: "500 Nm" },
          acceleration: { zh: "5.6秒", en: "5.6s" },
          seating: { zh: "7座", en: "7 Seats" },
          dimensions: { zh: "5067×1970×1740mm", en: "5067×1970×1740mm" }
        }
      },
      {
        id: "q8",
        name: "Q8",
        nameEn: "Q8",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "250 km/h", en: "250 km/h" },
          horsepower: { zh: "340 HP", en: "340 HP" },
          torque: { zh: "500 Nm", en: "500 Nm" },
          acceleration: { zh: "5.6秒", en: "5.6s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4986×2005×1705mm", en: "4986×2005×1705mm" }
        }
      }
    ]
  },
  electric: {
    name: "纯电系列",
    nameEn: "Electric Series",
    categoryPath: "电车",
    models: [
      {
        id: "etron",
        name: "e-tron",
        nameEn: "e-tron",
        specs: {
          launchDate: { zh: "2024年", en: "2024" },
          topSpeed: { zh: "200 km/h", en: "200 km/h" },
          horsepower: { zh: "408 HP", en: "408 HP" },
          torque: { zh: "664 Nm", en: "664 Nm" },
          acceleration: { zh: "5.7秒", en: "5.7s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4901×1935×1629mm", en: "4901×1935×1629mm" }
        }
      },
      {
        id: "q4etron",
        name: "Q4 e-tron",
        nameEn: "Q4 e-tron",
        specs: {
          launchDate: { zh: "2023年", en: "2023" },
          topSpeed: { zh: "160 km/h", en: "160 km/h" },
          horsepower: { zh: "299 HP", en: "299 HP" },
          torque: { zh: "460 Nm", en: "460 Nm" },
          acceleration: { zh: "6.0秒", en: "6.0s" },
          seating: { zh: "5座", en: "5 Seats" },
          dimensions: { zh: "4588×1865×1632mm", en: "4588×1865×1632mm" }
        }
      }
    ]
  },
  f1: {
    name: "F1系列",
    nameEn: "F1 Series",
    categoryPath: "F1",
    models: [
      {
        id: "f1car",
        name: "F1赛车",
        nameEn: "F1 Racing",
        specs: {
          launchDate: { zh: "2026年", en: "2026" },
          topSpeed: { zh: "360 km/h", en: "360 km/h" },
          horsepower: { zh: "1000+ HP", en: "1000+ HP" },
          torque: { zh: "900 Nm", en: "900 Nm" },
          acceleration: { zh: "1.8秒", en: "1.8s" },
          seating: { zh: "1座", en: "1 Seat" },
          dimensions: { zh: "5000×2000×950mm", en: "5000×2000×950mm" }
        }
      }
    ]
  }
};
