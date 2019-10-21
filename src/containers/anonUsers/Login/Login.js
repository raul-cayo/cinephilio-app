import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../../../images/LogoDark.png';
import './Login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passShow: false,
      isLoading: false
    };
  }

  prevent(e){
    e.preventDefault();
  }

  updateInput(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
      return(
          <div className="col-lg-8 offset-lg-2">
              <h1 className="titulo-form text-center align-self-center mt-4">Acceso</h1>
              <div className="row align-self-center mt-1 mb-2 px-4">
                  <div className="col-12 col-md-3">
                      <img className="logo-2nd rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio"/>
                  </div>
                  <p className="my-auto text-box col-12 col-md-9 py-3">Ingresa con tu cuenta para darte las mejores recomendaciones.</p>
              </div>

              <form className="text-center p-2 align-self-center register" onSubmit={this.prevent}>
                  <div className="form-group">
                      <label className="control-label">Correo Electrónico</label>
                      <input onChange={this.updateInput} value={this.state.email} type="email" name="email" className="form-control"/>
                  </div>
                  <div className="form-group">
                      <label className="control-label">Contraseña</label>
                      <input onChange={this.updateInput} value={this.state.password} type="password" name="password" className="form-control"/>
                  </div>
                  <div className="form-group mt-5">
                      <button className="btn cbt-blue btn-block" disabled={this.state.isLoading}>Iniciar Sesión</button>
                  </div>
              </form>

              <p className = "text-center p-2 align-self-center">¿No tienes una cuenta? <Link to='/signup'>Crea una aquí</Link></p>
          </div>
      )
  }
}

export default Login;