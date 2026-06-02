import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store.js";
import App from "./App.jsx";
import KeepAlive from "./pages/KeepAlive.jsx";
import {
  AddPost,
  AllPosts,
  AuthLayout,
  EditPost,
  Home,
  Login,
  MyPosts,
  Post,
  Signup,
} from "./components";
import "./index.css";

// App route definitions
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: <AllPosts />,
      },

      {
        path: "/my-posts",
        element: <MyPosts />,
      },

      {
        path: "/add-post",
        element: <AddPost />,
      },

      {
        path: "/post/:slug",
        element: <Post />,
      },

      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },

      {
        path: "/keep-alive",
        element: <KeepAlive />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
