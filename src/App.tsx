import Layout from "./frontend/components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./frontend/pages/Home";
import MyStoriesPage from "./frontend/pages/MyStories";
import Story from "./frontend/pages/Story";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/mystories" element={<MyStoriesPage/>}/>
            <Route path="/stories/:id" element={<Story/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
