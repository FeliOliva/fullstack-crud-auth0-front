import React from "react";
import { Button, Typography } from "antd"; // Importa componentes de Ant Design
import { useAuth0 } from "@auth0/auth0-react";

const { Title } = Typography; // Desestructura el componente Title de Typography

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={styles.container}>
      <Title level={2}>Bienvenido a la Aplicación</Title>{" "}
      {/* Mensaje de bienvenida */}
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

// Estilos en línea (puedes pasarlos a un archivo CSS si prefieres)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Ocupa toda la altura de la pantalla
    backgroundColor: "#f0f2f5", // Color de fondo
  },
  button: {
    marginTop: "20px", // Espaciado superior para el botón
  },
};

export default LoginButton;
