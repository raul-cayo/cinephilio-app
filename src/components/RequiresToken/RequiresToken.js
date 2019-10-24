import React from 'react';
import axios from 'axios';

class RequiresToken extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTokenValid: false,
      isLoading: true
    }
  }

  _isTokenValidRequest() {
    axios.post('https://cinephilio-api.herokuapp.com/user',
      { headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') }}
    )
    .then((res) => {
      if (res.status == 200) {
        this.setState({isTokenValid: true, isLoading: false});
      } else {
        console.log("Error _registerRequest status: " + res.status);
        this.setState({isLoading: false});
      }
    })
    .catch((err) => {
      console.log(err);
      this.setState({isLoading: false});
    });
  }

  componentDidMount () {
    this._isTokenValidRequest();
  }

  render() {
    if (this.state.isLoading) {
      return <div><h1>Loading mate</h1></div>;
    }
    if (this.state.isTokenValid) {
      return <div>{this.props.children}</div>;
    }
    return <div><h1>You need to Log In mate</h1></div>;
  }
}

export default RequiresToken;