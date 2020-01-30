let datos = [
  {
    movie_id: 339,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Parasites",
    release_date: "1991"
  },
  {
    movie_id: 123,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "World War Z",
    release_date: "1998"
  },
  {
    movie_id: 234,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Cars",
    release_date: "2003"
  }
];

export default (n = 7) =>
  Promise.resolve(datos);