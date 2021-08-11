import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Tabs from "./components/Tabs";
import StoryFeed from "./components/StoryFeed";
import StoryDetail from "./components/StoryDetail";
import UserFeed from "./components/UserFeed";
import { CreateStoryBtn } from "./components/CreateStoryBtn";
import CreateStoryForm from "./components/CreateStoryForm";
import Footer from "./components/Footer";
import "./app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import useToggle from "./hooks/useToggle";
function App() {
  const { user } = useAuth();
  const { visible, toggle } = useToggle();
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
              <Route
                path="/stories/:id"
                component={() => <StoryDetail currentUser={user} />}
              />

              <Route path="/user/stories" component={UserFeed} />
            </Switch>
          </div>

          <Footer />
        </Router>
        {visible && <CreateStoryForm onClick={toggle} userId={user.id} />}
        {user && <CreateStoryBtn onClick={toggle} />}
      </>
    </div>
  );
}

export default App;
