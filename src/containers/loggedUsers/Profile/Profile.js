import React from 'react';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import { updateValidator } from '../../../utils/validator';
import Logo from '../../../images/LogoDark.png';
import Navbar from '../../../components/Navbar/Navbar';
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

  render() {
    const errors = this.state.errors;

    return (
      <div>
        { this.state.isLoading && <LoadingModal /> }
        <Navbar username={"User Name"} />
        <div className="container">
          <div className="row mt-3 px-4">
            <div className="col-12 col-md-3">
              <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
            </div>
            <p className="my-auto text-box col-12 col-md-9 py-3">Aqui puedes cambiar tu informacion.</p>
          </div>

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
            <div className="form-group mt-5">
              <button className="btn cbt-blue btn-block">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Profile;