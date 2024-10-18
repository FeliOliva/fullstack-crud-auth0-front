import React from "react";
import { Button, Typography } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

const { Title } = Typography;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={styles.container}>
      <Title level={2}>Bienvenido a la Aplicación</Title>{" "}
      <Button
        type="primary"
        size="large"
        onClick={() => loginWithRedirect()}
        style={styles.button}
      >
        Iniciar Sesión
      </Button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  button: {
    marginTop: "20px",
  },
};

export default LoginButton;
