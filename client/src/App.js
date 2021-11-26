import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth } from "./components";
import { RecipesPage, HomePage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/recipes" exact>
          <RecipesPage />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/add-recipe" exact>
          <RecipesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
