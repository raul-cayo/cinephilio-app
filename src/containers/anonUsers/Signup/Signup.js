import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../images/LogoDark.png'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      birthdate: '',
      password: '',
      passShow: false
    }
  }

  updateInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  prevent(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="titulo-form text-center align-self-center mt-4">Registro</h1>

          <div className="row align-self-center mt-1 mb-2 px-4">
            <div className="col-12 col-md-3">
              <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
            </div>
            <p className="my-auto text-box col-12 col-md-9 py-3">
              Completa tu registro y te haré las mejores recomendaciones de películas.
            </p>
          </div>

          <form onSubmit={this.prevent.bind(this)} className="text-center p-2 align-self-center">
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
              <input onChange={this.updateInput.bind(this)} className="form-control" value={this.state.birthdate} type="date" name="birthdate"></input>
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

          <p className="text-center p-2 align-self-center">¿Ya tienes una cuenta? <Link to='/login'>Ingresa aqui</Link></p>
        </div>
      </div>
    )
  }
}

export default Signup;