import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import { loginValidator } from '../../../utils/validator';
import Logo from '../../../images/LogoDark.png';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
  }

  loginRequest() {
    let data = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('https://cinephilio-api.herokuapp.com/login',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem('access_token', res.data.access_token);
          window.localStorage.setItem('refresh_token', res.data.refresh_token);
          window.localStorage.setItem('username', res.data.username);
          this.props.history.push("/home");
        } else {
          console.log("Error loginRequest status: " + res.status);
        }
      })
      .catch((err) => {
        this.setState({ errors: { credentials: "Correo o contraseña incorrectos" } });
        console.log(err);
      });
  }

  loginUser(e) {
    e.preventDefault();
    const { errors, isValid } = loginValidator(this.state);
    this.setState({ errors: errors, isLoading: true });

    setTimeout(() => {
      if (isValid) {
        this.loginRequest();
        this.setState({ isLoading: false });
      } else {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({ isLoading: false });
      }
    }, 700);
    
  }

  updateInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="container">
        { this.state.isLoading && <LoadingModal /> }
        <div className="col-lg-8 offset-lg-2">
          <h1 className="titulo-form text-center align-self-center mt-4">Acceso</h1>
          <div className="row align-self-center mt-1 mb-2 px-4">
            <div className="col-12 col-md-3">
              <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
            </div>
            <p className="my-auto text-box col-12 col-md-9 py-3">Ingresa con tu cuenta para darte las mejores recomendaciones.</p>
          </div>

          <form className="text-center p-2 align-self-center" onSubmit={this.loginUser.bind(this)}>
            <div className={(isEmpty(errors) ? "d-none" : "alert alert-danger")}>
              {errors.email && <div><span className="help-block">{errors.email}</span><br /></div>}
              {errors.password && <div><span className="help-block">{errors.password}</span></div>}
              {errors.credentials && <div><span className="help-block">{errors.credentials}</span></div>}
            </div>
            <div className="form-group">
              <label className="control-label">Correo Electrónico</label>
              <input onChange={this.updateInput.bind(this)} value={this.state.email} type="text" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label className="control-label">Contraseña</label>
              <input onChange={this.updateInput.bind(this)} value={this.state.password} type="password" name="password" className="form-control" data-toggle="password" />
            </div>
            <div className="form-group mt-5">
              <button className="btn cbt-blue btn-block" disabled={this.state.isLoading}>Iniciar Sesión</button>
            </div>
          </form>

          <p className="text-center p-2 align-self-center">¿No tienes una cuenta? <Link to='/signup'>Crea una aquí</Link></p>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);