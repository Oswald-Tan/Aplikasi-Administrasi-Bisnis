import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404";
import LandingPage from "./layout/LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App;