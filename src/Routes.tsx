import { SearchWithFavorite } from "./pages";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/search" />} />
        <Route
          exact
          key="/search_/favorite"
          path={["/search", "/favorite"]}
          component={SearchWithFavorite}
        />
      </Switch>
    </div>
  );
};

export default Routes;
