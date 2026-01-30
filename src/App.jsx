import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
