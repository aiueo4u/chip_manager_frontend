import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  render() {
    const { isFetching, isLoggedIn, handleSubmit } = this.props

    if (isLoggedIn) {
      return (<Redirect to="/" />)
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Your nickname: 
            <input type="text" name="nickname" placeholder="your nickname" />
          </label>
          <input type="submit" value="login" />
        </div>
        {isFetching ? <div>now loading...</div> : <div></div>}
      </form>
    )
  }
}

export default LoginForm;
