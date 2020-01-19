let datos = [
  {
    movie_id: 339,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Night On Earth",
    release_date: "1991"
  },
  {
    movie_id: 123,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Pulp Fiction",
    release_date: "1998"
  },
  {
    movie_id: 234,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Shrek",
    release_date: "2003"
  },
  {
    movie_id: 345,
    poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
    title: "Camino",
    release_date: "2019"
  }
];

export default (n = 7) =>
  Promise.resolve(datos);