import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import MovieListItem from './MovieListItem';
import SeenServer from './SeenServer';
import { Link } from 'react-router-dom';
// import axios from 'axios';
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
    setTimeout(() => {
      this.getMoviesSeenRequest();
    }, 700);
  }

  render() {
    let moviesSeen = this.state.moviesSeen;
    let movieList = (
      <ul id='movies-seen' class="list-group">
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

            <Link className="btn cbt-blue btn-block py-3 mt-4" to="/add">
              Agregar Películas
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

export default Seen;