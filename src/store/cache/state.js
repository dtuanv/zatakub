export default function () {
  return {
    products: [],
    vorspeiseProducts: [],
    hauptgangProducts: [],
    sushiMixProducts: [],
    sushiProducts: [],
    nigiriProducts: [],
    makiProducts: [],
    insideOutProducts: [],
    tempuraProducts: [],
    spezialProducts: [],
    cart: [],
    bills: [],
    role:'',
    token:'',
    reservations: [
      { key: 1, imgUrl: "family.png", icon: "east", status: false },
      { key: 2, imgUrl: "calendar.png", icon: "east", status: false },
      { key: 3, imgUrl: "time.png", icon: "east", status: false },
      { key: 4, imgUrl: "done.png" },
    ],
    guests: [
      {
        label: "1",
        value: 1,
      },
      {
        label: "2",
        value: 2,
      },
      {
        label: "3",
        value: 3,
      },
      {
        label: "4",
        value: 4,
      },
      {
        label: "5",
        value: 5,
      },
      {
        label: "6",
        value: 6,
      },
    ],
    guestInfo: {
      guestNum: 0,
      orGuestNum: "",
    },

    times: [
      {
        label: "11:00",
        value: "11:00",
      },
      {
        label: "11:30",
        value: "11:30",
      },
      {
        label: "12:00",
        value: "12:00",
      },
      {
        label: "12:30",
        value: "12:30",
      },
      {
        label: "13:00",
        value: "13:00",
      },
      {
        label: "13:30",
        value: "13:30",
      },
      {
        label: "14:00",
        value: "14:00",
      },
      {
        label: "14:30",
        value: "14:30",
      },
      {
        label: "15:00",
        value: "15:00",
      },
      {
        label: "15:30",
        value: "15:30",
      },
      {
        label: "16:00",
        value: "16:00",
      },
      {
        label: "16:30",
        value: "16:30",
      },
      {
        label: "17:00",
        value: "17:00",
      },
      {
        label: "17:30",
        value: "17:30",
      },
      {
        label: "18:00",
        value: "18:00",
      },
      {
        label: "18:30",
        value: "18:30",
      },
      {
        label: "19:00",
        value: "19:00",
      },
      {
        label: "19:30",
        value: "19:30",
      },
      {
        label: "20:00",
        value: "20:00",
      },
      {
        label: "20:30",
        value: "20:30",
      },
      {
        label: "21:00",
        value: "21:00",
      },
    ],
  };
}
