import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import StoryDetail from "./components/StoryDetail";
import UserFeed from "./components/UserFeed";
import Footer from "./components/Footer";
import "./app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
              <Route exact path="/" component={StoryFeed} />
              <Route exact path="/signup" component={SignupForm} />
              <Route exact path="/login">
                {!user ? <LoginForm /> : <Redirect to="/" />}
              </Route>
              <Route path="/stories/:id" component={StoryDetail} />
              <Route path="/user/stories" component={UserFeed} />
            </Switch>
          </div>

          <Footer />
        </Router>
      </>
    </div>
  );
}

export default App;
