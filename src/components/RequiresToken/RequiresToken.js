import React from 'react';
import axios from 'axios';

class RequiresToken extends React.Component {
  _isValidTokenRequest() {
    axios.post('https://cinephilio-api.herokuapp.com/user',
      { headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') }}
    )
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        console.log("Error _registerRequest status: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (this._isValidTokenRequest()) {
      return <div>{this.props.children}</div>;
    }
    return <div><h1>You need to Log In mate</h1></div>;
  }
}

export default RequiresToken;