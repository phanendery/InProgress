import React, { Component } from "react";
import { Mutation } from "react-apollo";

import { LOGIN_USER } from '../gql/mutations';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  update(field) {
    return e => {
        console.log(e.target.value);
        this.setState({ [field]: e.target.value });
    }
  }

  updateCache(client, {data}) {
    console.log(data);
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    username: this.state.username,
                    password: this.state.password
                  }
                });
              }}
            >
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
}
}

export default Login;