import "./App.css";
import LoginButton from "./components/LoginButton";
import MenuLayout from "./components/MenuLayout";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <MenuLayout />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
