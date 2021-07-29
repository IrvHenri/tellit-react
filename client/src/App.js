import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1").then((result) => {
      console.log(result.data.message);
      setMessage(result.data.message);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Tabs />
        <Switch>
          <Route exact path="/">
            <StoryFeed stories={message} />
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
