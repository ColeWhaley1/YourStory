import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyStories } from "./pages/MyStories";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/mystories" element={<MyStories/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
