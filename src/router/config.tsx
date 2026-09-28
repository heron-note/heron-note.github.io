import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import WorkDetail from "../pages/work/page";
import WorkPage from "../pages/work-page/page";
import ContactPage from "../pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/work",
    element: <WorkPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/work/:slug",
    element: <WorkDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;