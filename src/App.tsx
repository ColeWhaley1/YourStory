import Layout from "./frontend/components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./frontend/pages/Home";
import MyStoriesPage from "./frontend/pages/MyStories";
import Story from "./frontend/pages/Story";
import SignUpPage from "./frontend/pages/SignUp";
import LogInPage from "./frontend/pages/LogIn";
import SuccessPage from "./frontend/pages/Success";
import MyProfilePage from "./frontend/pages/MyProfile";
import ProfilePage from "./frontend/pages/ProfilePage";
import { LoadingProvider } from "./frontend/contexts/loadingContext";
import { MyProfileProvider } from "./frontend/contexts/myProfileContext";

function App() {
  return (
    <MyProfileProvider>
      <Router>
        <LoadingProvider>
            <Layout>
              {
                ({ hideNav, showNav }) => (
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign_up" element={<SignUpPage />} />
                    <Route path="/log_in" element={<LogInPage />} />
                    <Route path="/my_stories" element={<MyStoriesPage />} />
                    <Route path="/stories/:id" element={<Story hideNav = {hideNav} showNav = {showNav} />}></Route>
                    <Route path="/success_screen" element={<SuccessPage/>}></Route>
                    <Route path="/my_profile" element = {<MyProfilePage/>}></Route>
                    <Route path="/profile" element = {<ProfilePage/>}></Route>
                  </Routes>
                )
              }
            </Layout>
        </LoadingProvider>
      </Router>
    </MyProfileProvider>
  );
}

export default App;
