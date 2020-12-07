import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import AlertMsg from "../components/AlertMsg";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { FavoList } from "./pages/FavoList";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/movies/:id" component={DetailPage} />
        <Route exact path="/fav-movie" component={FavoList} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
