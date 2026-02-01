import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Cart from "./pages/Cart";
import EventListings from "./pages/EventListings";
import EventDetail from "./pages/EventDetail";
import Home from "./pages/Home";
import MyTickets from "./pages/MyTickets";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/events/" element={<EventListings />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
