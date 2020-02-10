import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import MovieListItem from './MovieListItem';
import SeenServer from './SeenServer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Seen.css';


class Seen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesSeen: [],
      isLoading: true
    }
  }

  getMoviesSeenRequest() {
    // Fake http call
    SeenServer().then(movies => {
      this.setState({
        moviesSeen: movies,
        isLoading: false
      });
    });
  };

  componentDidMount() {
    //Llamada para tener la lista del usuario
    axios.get('https://cinephilio-api.herokuapp.com/movies-seen',
    {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
    .then((res) => {
      console.log(res.data.movies_seen)
      let arrayUsuario = res.data.movies_seen.map(movie => {
        if(!movie.is_deleted) return movie.movie_id})
      console.log(arrayUsuario)
      //Llamada para tener la lista de todas las películas
      axios.post('https://cinephilio-engine.herokuapp.com/movies-seen',
      JSON.stringify({movies_id: arrayUsuario}),
      {headers:{ 'Content-Type': 'application/json'}})
      .then((res) => {
        this.setState({
          moviesSeen: res.data.movies_seen,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
    })
    .catch((err) => console.log("Error en la matrix"))
  }

  render() {
    let moviesSeen = this.state.moviesSeen;
    let movieList = (
      <ul id='movies-seen' className="list-group">
        {moviesSeen.map(movie => {
          return <MovieListItem
            key={movie.movie_id}
            title={movie.title}
            year={movie.release_date} />
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
              Esta es tu lista de películas vistas.
            </SpeechBalloon>

            <div className="row">
              {movieList}
            </div>

            <Link className="btn cbt-blue btn-block py-3 mt-4" to="/add-movie">
              Agregar Películas
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

export default Seen;