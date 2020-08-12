import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Query } from "react-apollo";
import Login from './Login';
import AuthRoute from '../util/route_util';

const App = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route path="/" component={Login}>
          <p>yee haw</p>
        </Route>
      </Switch>
      
    </div>
    // <Query query={FETCH_USERS}>
    //   {({ loading, error, data }) => {
    //     if (loading) return "Loading...";
    //     if (error) return `Error! ${error.message}`;

    //     return (
    //       <ul>
    //         {data.users.map(user => (
    //           <li key={user.username}>{user.username} {user.name}</li>
    //         ))}
    //       </ul>
    //     );
    //   }}
    // </Query>
  );
};

export default App;