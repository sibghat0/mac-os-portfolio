import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Logic: Check if the current path is '/lock-screen'
  const isLockScreen = location.pathname === "/";

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <Header />
      <main>
        <Outlet />
      </main>
      {!isLockScreen && <Footer />}
    </div>
  );
};

export default Layout;
