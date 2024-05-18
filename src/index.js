import "react-toastify/dist/ReactToastify.css";
import "./utils/i18n";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const authClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "",
    credentials: "include",
  }),
});

root.render(
  <Suspense
    fallback={
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer theme="colored" />
        <BrowserRouter>
          <ApolloProvider client={authClient}>
            <App />
          </ApolloProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);
