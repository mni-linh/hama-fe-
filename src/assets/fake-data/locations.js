const locations = [
  {
    city: "Bắc Giang",
    lat: 21.333,
    long: 106.333,
  },
  {
    city: "Bắc Kạn",
    lat: 22.167,
    long: 105.833,
  },
  {
    city: "Cao Bằng",
    lat: 22.697,
    long: 106.3,
  },
  {
    city: "Hà Giang",
    lat: 22.8,
    long: 105,
  },
  {
    city: "Lạng Sơn",
    lat: 21.85,
    long: 106.7,
  },
  {
    city: "Phú Thọ",
    lat: 21.333,
    long: 105.167,
  },
  {
    city: "Quảng Ninh",
    lat: 21.25,
    long: 107.333,
  },
  {
    city: "Thái Nguyên",
    lat: 21.717,
    long: 105.833,
  },
  {
    city: "Tuyên Quang",
    lat: 22.117,
    long: 105.25,
  },
  {
    city: "Lào Cai",
    lat: 22.333,
    long: 104.15,
  },
  {
    city: "Yên Bái",
    lat: 21.75,
    long: 104.567,
  },
  {
    city: "Điện Biên",
    lat: 21.7,
    long: 103.257,
  },
  {
    city: "Hòa Bình",
    lat: 20.733,
    long: 105.25,
  },
  {
    city: "Lai Châu",
    lat: 22.3,
    long: 103.2,
  },
  {
    city: "Sơn La",
    lat: 21.167,
    long: 104,
  },
  {
    city: "Bắc Ninh",
    lat: 21.083,
    long: 106.167,
  },
  {
    city: "Hà Nam",
    lat: 20.583,
    long: 106,
  },
  {
    city: "Hải Dương",
    lat: 20.917,
    long: 106.333,
  },
  {
    city: "Hưng Yên",
    lat: 20.833,
    long: 106.083,
  },
  {
    city: "Nam Định",
    lat: 20.25,
    long: 106.25,
  },
  {
    city: "Ninh Bình",
    lat: 20.25,
    long: 105.833,
  },
  {
    city: "Thái Bình",
    lat: 20.5,
    long: 106.333,
  },
  {
    city: "Vĩnh Phúc",
    lat: 21.3,
    long: 105.6,
  },
  {
    city: "Hà Nội",
    lat: 21.02833,
    long: 105.85417,
  },
  {
    city: "Hải Phòng",
    lat: 20.865139,
    long: 106.683833,
  },
  {
    city: "Hà Tĩnh",
    lat: 18.333,
    long: 105.9,
  },
  {
    city: "Nghệ An",
    lat: 19.333,
    long: 104.833,
  },
  {
    city: "Quảng Bình",
    lat: 17.5,
    long: 106.333,
  },
  {
    city: "Quảng Trị",
    lat: 16.75,
    long: 107,
  },
  {
    city: "Thanh Hóa",
    lat: 20,
    long: 105.5,
  },
  {
    city: "Thừa Thiên-Huế",
    lat: 16.333,
    long: 107.583,
  },
  {
    city: "Đắk Lắk",
    lat: 12.767,
    long: 108.35,
  },
  {
    city: "Đắk Nông",
    lat: 12.183,
    long: 107.7,
  },
  {
    city: "Gia Lai",
    lat: 13.75,
    long: 108.25,
  },
  {
    city: "Kon Tum",
    lat: 14.75,
    long: 107.917,
  },
  {
    city: "Lâm Đồng",
    lat: 11.95,
    long: 108.433,
  },
  {
    city: "Bình Định",
    lat: 14.167,
    long: 109,
  },
  {
    city: "Bình Thuận",
    lat: 10.933,
    long: 108.1,
  },
  {
    city: "Khánh Hòa",
    lat: 12.25,
    long: 109.2,
  },
  {
    city: "Ninh Thuận",
    lat: 11.75,
    long: 108.833,
  },
  {
    city: "Phú Yên",
    lat: 13.167,
    long: 109.167,
  },
  {
    city: "Quảng Nam",
    lat: 15.58333,
    long: 107.91667,
  },
  {
    city: "Quảng Ngãi",
    lat: 15,
    long: 108.667,
  },
  {
    city: "Đà Nẵng",
    lat: 16.06944,
    long: 108.20972,
  },
  {
    city: "Bà Rịa-Vũng Tàu",
    lat: 10.583,
    long: 107.25,
  },
  {
    city: "Bình Dương",
    lat: 11.167,
    long: 106.667,
  },
  {
    city: "Bình Phước",
    lat: 11.75,
    long: 106.917,
  },
  {
    city: "Đồng Nai",
    lat: 11.117,
    long: 107.183,
  },
  {
    city: "Tây Ninh",
    lat: 11.333,
    long: 106.167,
  },
  {
    city: "Hồ Chí Minh",
    lat: 10.8,
    long: 106.65,
  },
  {
    city: "An Giang",
    lat: 10.5,
    long: 105.167,
  },
  {
    city: "Bạc Liêu",
    lat: 9.25,
    long: 105.75,
  },
  {
    city: "Bến Tre",
    lat: 10.167,
    long: 106.5,
  },
  {
    city: "Cà Mau",
    lat: 9.083,
    long: 105.083,
  },
  {
    city: "Đồng Tháp",
    lat: 10.667,
    long: 105.667,
  },
  {
    city: "Hậu Giang",
    lat: 9.783,
    long: 105.467,
  },
  {
    city: "Kiên Giang",
    lat: 10,
    long: 105.167,
  },
  {
    city: "Long An",
    lat: 10.667,
    long: 106.167,
  },
  {
    city: "Sóc Trăng",
    lat: 9.667,
    long: 105.833,
  },
  {
    city: "Tiền Giang",
    lat: 10.417,
    long: 106.167,
  },
  {
    city: "Trà Vinh",
    lat: 9.833,
    long: 106.25,
  },
  {
    city: "Vĩnh Long",
    lat: 10.167,
    long: 106,
  },
  {
    city: "Cần Thơ",
    lat: 10.033,
    long: 105.783,
  },
];

export default locations;
