import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import AnonNavbar from '../../../components/Navbar/AnonNavbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import { signupValidator } from '../../../utils/validator';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      birthdate: '',
      password: '',
      errors: {},
      isLoading: false
    }
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
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  registerUserRequest() {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      birthdate: this.state.birthdate
    }

    axios.post('https://cinephilio-api.herokuapp.com/user',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((res) => {
        if (res.status === 201) {
          this.loginRequest();
        } else {
          console.log("Error registerUserRequest status: " + res.status);
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({errors: {email: "Ese correo ya esta registrado."}, isLoading: false});
        console.log(err);
      });
  }

  registerUser(e) {
    e.preventDefault();
    const { errors, isValid } = signupValidator(this.state);
    this.setState({ errors: errors, isLoading: true });

    setTimeout(() => {
      if (isValid) {
        this.registerUserRequest();
  
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
      <React.Fragment>
        <AnonNavbar/>
        <div className="container">
          { this.state.isLoading && <LoadingModal /> }
          <div className="col-lg-8 offset-lg-2">
            <SpeechBalloon>Bienvenido, aquí puedes completar tu registro.</SpeechBalloon>

            <form onSubmit={this.registerUser.bind(this)} className="text-center pt-2 align-self-center">
              <div className={(isEmpty(errors) ? "d-none" : "alert alert-danger")}>
                {errors.username && <div><span className="help-block">{errors.username}</span><br /></div>}
                {errors.email && <div><span className="help-block">{errors.email}</span><br /></div>}
                {errors.birthdate && <div><span className="help-block">{errors.birthdate}</span><br /></div>}
                {errors.password && <div><span className="help-block">{errors.password}</span></div>}
              </div>

              <div className="form-group">
                <label className="control-label">Nombre de Usuario</label>
                <input onChange={this.updateInput.bind(this)} value={this.state.username} type="text" name="username" className="form-control" />
              </div>

              <div className="form-group">
                <label className="control-label">Correo Electrónico</label>
                <input onChange={this.updateInput.bind(this)} value={this.state.email} type="text" name="email" className="form-control" />
              </div>

              <div className="form-group">
                <label className="control-label">Fecha de Nacimiento</label>
                <input onChange={this.updateInput.bind(this)} className="date form-control" value={this.state.birthdate} type="date" name="birthdate"></input>
              </div>

              <div className="form-group">
                <label className="control-label">Contraseña</label>
                <div className="input-group">
                  <input onChange={this.updateInput.bind(this)} value={this.state.password} type="password" name="password" className="form-control" data-toggle="password" />
                </div>
              </div>
              <div className="form-group mt-5">
                <button className="btn cbt-blue btn-block">Registrarse</button>
              </div>
            </form>

            <p className="text-center p-1 align-self-center">¿Ya tienes una cuenta? <Link className="link" to='/login'>Ingresa aqui</Link></p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Signup);