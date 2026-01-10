import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LockScreen from "./pages/LockScreen";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LockScreen />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
