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

  isTokenValidRequest() {
    axios.get('https://cinephilio-api.herokuapp.com/refresh',
      { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') } }
    )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isTokenValid: true, isLoading: false });
        } else {
          console.log("Error _registerRequest status: " + res.status);
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.isTokenValidRequest();
  }

  render() {
    if (this.state.isLoading) {
      return <div><h1>Loading mate</h1></div>;
    }
    if (this.state.isTokenValid) {
      return <div>{this.props.children}</div>;
    }

    return (
      <ErrorDisplay
        error="Error 401: No autorizado"
        desc="Ya te la sabes. Tienes que iniciar sesión."
      />
    )
  }
}

export default RequiresToken;