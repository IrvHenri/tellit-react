import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import StoryDetail from "./components/StoryDetail";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Navbar />
          <Tabs />
          <Switch>
            <Route exact path="/stories">
              <StoryFeed />
            </Route>
            <Route path="/stories/:id">
              <StoryDetail />
            </Route>
            {/* add conditional logic to see if user is logged in */}
            <Route path="/user/:id/stories">
              <UserFeed />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    </div>
  );
}

export default App;
