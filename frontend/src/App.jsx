import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "@features/homepage/pages/Homepage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}