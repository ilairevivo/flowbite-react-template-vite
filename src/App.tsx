import CardDaitails from "./components/CardDetails/CardDatails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register.page";
import CreateCard from "./Pages/CreateCard.page";
import ErrorPage from "./Pages/Error.page";
import { Foot } from "./components/Footer";
import Heder from "./components/Navbar";
import Login from "./Pages/Login.page";
import { Provider } from "react-redux";
import Profile from "./Pages/Profile.page";
import RouteGuard from "./RouteGuard/RouteGuard";
import Home from "./Pages/Home.page";
import store from "./store/store";
import About from "./Pages/About.page";
import Favourites from "./Pages/Favourites.page";
import MyCards from "./Pages/MyCards.page";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Heder />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route
              path="/favourites"
              element={
                <RouteGuard>
                  <Favourites />
                </RouteGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/card/:id" element={<CardDaitails />} />

            
            <Route
              path="/createCard"
              element={
                <RouteGuard isBiz={true}>
                  <CreateCard />
                </RouteGuard>
              }
            />
            <Route
              path="/myCards"
              element={
                <RouteGuard isBiz={true}>
                  <MyCards />
                </RouteGuard>
              }
            />
          </Routes>
          <Foot />
        </BrowserRouter>
      </Provider>
      
    </>
  );
}
