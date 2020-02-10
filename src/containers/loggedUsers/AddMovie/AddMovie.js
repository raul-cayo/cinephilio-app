import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import MovieListItem from './MovieListItem';
//import SeenServer from './SeenServer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Seen.css';


class Seen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesSeen: [],
      moviesSearch: [],
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.addMovie = this.addMovie.bind(this)
  }

  componentDidMount() {
    //Llamada para tener la lista del usuario
    axios.get('https://cinephilio-api.herokuapp.com/movies-seen',
    {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
    .then((res) => {
      let arrayUsuario = res.data.movies_seen.map(movie => {
        if(!movie.is_deleted) return movie.movie_id
      })
      //Llamada para tener la lista de todas las películas
      axios.post('https://cinephilio-engine.herokuapp.com/all-movies',
      JSON.stringify({movies_id: arrayUsuario}),
      {headers:{ 'Content-Type': 'application/json'}})
      .then((res) => {
        this.setState({
          moviesSeen: res.data.all_movies,
          moviesSearch: res.data.all_movies,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
    })
    .catch((err) => console.log("Error en la matrix"))
  }

  // Sirve para hacer el filtro de las películas
  handleChange = (e) => {
    let listaActual = []
    let nuevaLista = []
    if(e.target.value !== ""){
      listaActual = this.state.moviesSeen
      nuevaLista = listaActual.filter(movie => {
        const lc = movie.title.toLowerCase()
        const filtro = e.target.value.toLowerCase()
        return lc.includes(filtro)
      })
    }
    else{
      nuevaLista = this.state.moviesSeen
    }
    this.setState({
      moviesSearch: nuevaLista
    })
  }

  addMovie= (liked, movieId) =>{
    console.log("Añadiendo peli", liked, movieId)
    console.log(JSON.stringify({liked_by_user: liked, is_deleted: false}))
    axios.put(`https://cinephilio-api.herokuapp.com/movie-seen/${movieId}`,
    JSON.stringify({liked_by_user: liked, is_deleted: false}),
    {headers: {"Content-type": "application/json",
               'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
    .then(res => {
      // console.log(res)
      let listaCompleta = this.state.moviesSeen.filter(movie => movie.movie_id !== movieId)
      this.setState({
        moviesSeen: listaCompleta
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    let moviesSeen = this.state.moviesSearch;
    let movieList = (
      <ul id='movies-seen' className="list-group">
        {moviesSeen.slice(0,8).map(movie => {
          return <MovieListItem
            key={movie.movie_id}
            title={movie.title}
            year={movie.release_date}
            movieId={movie.movie_id} 
            addNewMovie={this.addMovie}/>
        })}
      </ul>
    );

    return (
      <div>
        { this.state.isLoading && <LoadingModal /> }
        <Navbar username={"User Name"} />
        <div className="container">
          <div className="col-lg-10 offset-lg-1 mt-4">
            <SpeechBalloon>
              Peliculas que puedes agregar a tu lista personal.
            </SpeechBalloon>

            <div style={{marginBottom: '1.5rem'}} className="row">
              <input 
                placeholder = "Busca una película"
                onChange = {this.handleChange}
                style={{marginBottom: '0.5rem'}} 
                className="text-box col-12 col-md-6 py-2"/>
                
              <Link style={{marginLeft:'1rem', width:'250px'}} to="/seen">
                <button className="btn cbt-blue py-2 mt-1">
                Regresar a mis películas
                </button>
              </Link>
              {movieList}
            </div>

            {/* <Link  className="btn cbt-blue btn-block py-3 mt-4" to="/add-movie">
              Agregar Películas
            </Link> */}
          </div>
        </div>

      </div>
    );
  }
}

export default Seen;