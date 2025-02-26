import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  // TODO => update uri to production uri
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  ssrMode: true, //false in production
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <GridBackground>
          <App />
        </GridBackground>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
