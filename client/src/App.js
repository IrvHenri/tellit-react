import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import StoryDetail from "./components/StoryDetail";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <>
        <Router>
          <Navbar user={user} />

          <Tabs />
          <div className="story-journal">
            <Switch>
              <Route exact path="/signup">
                <SignupForm />
              </Route>
              <Route exact path="/login">
                <LoginForm />
              </Route>
              <Route exact path="/stories">
                <StoryFeed />
              </Route>
              <Route path="/stories/:id">
                <StoryDetail />
              </Route>
              <Route path="/user/stories">
                <UserFeed />
              </Route>
            </Switch>
          </div>

          <Footer />
        </Router>
      </>
    </div>
  );
}

export default App;
