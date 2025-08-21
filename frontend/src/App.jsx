import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "@features/homepage/pages/Homepage";
import SignIn from "./features/auth/pages/SignIn";
import SignUp from "./features/auth/pages/SignUp";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route index path="/signin" element={<SignIn />} />
          <Route index path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}