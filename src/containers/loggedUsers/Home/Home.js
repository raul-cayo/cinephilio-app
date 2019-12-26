import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      funfact: "Bruce Lee era tan rápido, que tenían que disminuir la velocidad"
      + " en las películas para que se notaran sus movimientos, en todas las"
      + " demás películas de artes marciales aumentan la velocidad."
    }
  }

  getFunfact() {
    axios.get(
      'https://cinephilio-api.herokuapp.com/fun-fact'
    )
    .then((res) => {
      if (res.status === 200) {
        this.setState({funfact: res.data.text});
      } else {
        console.log("Error getFunfact status: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount () {
    this.getFunfact();
  }

  render() {
    return (
      <div>
        <Navbar username={"User Name"} />
        <div className="container">
          <div className="col-lg-10 offset-lg-1 pt-1 pt-md-3">
            <SpeechBalloon>{this.state.funfact}</SpeechBalloon>

            <div className="row">
              <div className="form-group mt-5 col-12 col-md-12 mx-auto">
                <button className="btn cbt-blue btn-block py-3">Recomiendame una Película</button>
              </div>
              <div className="form-group mt-2 col-12 col-md-12 mx-auto">
                <Link to="/movies-seen" className="btn cbt-blue btn-block">Películas Vistas</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;