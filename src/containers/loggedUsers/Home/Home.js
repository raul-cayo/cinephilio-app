import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Logo from '../../../images/LogoDark.png';
import { Link } from 'react-router-dom';


class Home extends React.Component {
  _getFunfact() {
    let funfact = "Bruce Lee era tan rápido, que tenían que disminuir la velocidad en las películas para \
      que se notaran sus movimientos, en todas las demás películas de artes marciales aumentan la velocidad."

    axios.get('https://cinephilio-api.herokuapp.com/fun-fact',
      JSON.stringify(data),
      { headers: {'Content-Type': 'application/json' }}
    )
    .then((res) => {
      if (res.status == 200) {
        funfact = res.data.text;
      } else {
        console.log("Error _getFunfact status: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    return funfact;
  }

  render() {
    const funfact = this._getFunfact();

    return (
      <div>
        <Navbar username={"User Name"} />
        <div className="container">
          <div className="row mt-3 px-4">
            <div className="col-12 col-md-3">
              <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
            </div>
            <p className="my-auto text-box-white col-12 col-md-9 py-3">{funfact}</p>
          </div>

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
    );
  }
}

export default Home;