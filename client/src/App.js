import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Tabs />
        <Switch>
          <Route exact path="/">
            <StoryFeed />
          </Route>
          <Route path="/stories">
            <UserFeed />
          </Route>
          {/* <Route></Route>
          <Route></Route>
          <Route></Route> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
