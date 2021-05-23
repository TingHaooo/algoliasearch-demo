import { SearchWithFavorite } from "./pages";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/algoliasearch-demo"
          render={() => <Redirect to="/algoliasearch-demo/search" />}
        />
        <Route
          exact
          path={["/algoliasearch-demo/search", "/algoliasearch-demo/favorite"]}
          component={SearchWithFavorite}
        />
      </Switch>
    </div>
  );
};

export default Routes;
