import React from 'react';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import { updateValidator } from '../../../utils/validator';
import Navbar from '../../../components/Navbar/Navbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      birthdate: '',
      password: '',
      old_password: '',
      verifiedAccount: false,
      errors: {},
      isLoading: true
    }
  }

  getUserDataRequest() {
    axios.get('https://cinephilio-api.herokuapp.com/user',
      { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') } }
    )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            username: res.data.username,
            email: res.data.email,
            old_password: res.data.password,
            birthdate: res.data.birthdate,
            verifiedAccount: res.data.authentication,
            isLoading: false
          });
        } else {
          console.log("Error updateUserRequest status: " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserRequest() {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password ? this.state.password : this.state.old_password,
      birthdate: this.state.birthdate
    };

    axios.put('https://cinephilio-api.herokuapp.com/user',
      JSON.stringify(data),
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
        }
      }
    )
      .then((res) => {
        if (res.status === 200) {
          document.querySelector('.alert-success').classList.remove('d-none');
          setTimeout(() => {
            document.querySelector('.alert-success').classList.add('d-none');
          }, 3000);
        } else {
          console.log("Error updateUserRequest status: " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser(e) {
    e.preventDefault();
    const { errors, isValid } = updateValidator(this.state);
    this.setState({ errors: errors, isLoading: true });

    setTimeout(() => {
      if (isValid) {
        this.updateUserRequest();
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

  componentDidMount() {
    setTimeout(() => {
      this.getUserDataRequest();
    }, 700);
  }

  sendAuthToken=()=>{
    axios.get('https://cinephilio-api.herokuapp.com/auth',
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
        }
      }
    )
    .then((res) => {
      console.log(res)
      alert("Mensaje de confirmación enviado")
    })
    .catch((err) => {
      console.log("Auth token error")
    })
  }

  authRequest=(e)=>{
    e.preventDefault()
    setTimeout(() => {
      this.sendAuthToken();
    }, 700);
  }

  render() {
    const errors = this.state.errors;

    return (
      <React.Fragment>
        <Navbar username={"User Name"} />
        <div className="container">
          { this.state.isLoading && <LoadingModal /> }
          <div className="col-lg-8 offset-lg-2">
            <SpeechBalloon>Aqui puedes cambiar tu informacion.</SpeechBalloon>

            <form onSubmit={this.updateUser.bind(this)} className="text-center p-2 align-self-center">
              <div className={(isEmpty(errors) ? "d-none" : "alert alert-danger")}>
                {errors.username && <div><span className="help-block">{errors.username}</span><br /></div>}
                {errors.email && <div><span className="help-block">{errors.email}</span><br /></div>}
                {errors.birthdate && <div><span className="help-block">{errors.birthdate}</span><br /></div>}
                {errors.password && <div><span className="help-block">{errors.password}</span></div>}
              </div>
              <div className={"alert alert-success d-none "}>
                Cambios guardados exitosamente.
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
                <label className="control-label">Nueva Contraseña (Opcional)</label>
                <div className="input-group">
                  <input onChange={this.updateInput.bind(this)} value={this.state.password} type="password" name="password" className="form-control" data-toggle="password" />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label">Verificación de cuenta</label>
                {(this.state.verifiedAccount) ? 
                <div style={{display: "block"}} className="alert alert-success">Cuenta verificada</div> : 
                <div style={{display: "block"}} className="alert alert-danger">
                  <span style={{display: "block"}}>No has verificado tu cuenta</span>
                  <button style={{background: "none", border:"none", padding:"0!important", textDecoration:"underline", cursor:"pointer"}} onClick={(e) => this.authRequest(e)}>
                    Haz clic aquí para enviar un correo a tu cuenta
                  </button>
                </div>}
              </div>
              <div className="form-group mt-5">
                <button className="btn cbt-blue btn-block">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Profile;