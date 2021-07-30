import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useStories from "./hooks/useStories";
function App() {
  const [stories] = useStories();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Tabs />
        <Switch>
          <Route exact path="/">
            <StoryFeed stories={stories} />
          </Route>
          <Route path="/stories">
            <UserFeed />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
