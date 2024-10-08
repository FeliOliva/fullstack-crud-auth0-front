import React from "react";
import { Layout, Menu } from "antd";
import ClientTable from "./ClientTable";
import AddClientForm from "./AddClientForm";
import Profile from "./Profile"; // Importa el componente Profile

const { Header, Content } = Layout;

const MenuLayout = () => {
  const [selectedKey, setSelectedKey] = React.useState("1");

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ flex: 1 }} // Esto permite que el menú ocupe el espacio disponible
        >
          <Menu.Item key="1">Ver Cliente</Menu.Item>
          <Menu.Item key="2">Agregar Cliente</Menu.Item>
        </Menu>
        <Profile /> {/* Renderiza el componente Profile dentro del Header */}
      </Header>
      <Layout style={{ padding: "24px" }}>
        {" "}
        {/* Agrega padding al Layout principal */}
        <Content
          style={{
            padding: "16px 24px", // Reduce el padding superior
            margin: 0,
            minHeight: "75vh",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {selectedKey === "1" ? (
            <div style={{ width: "75%" }}>
              {" "}
              {/* Establece el ancho de la tabla en 75% */}
              <ClientTable />
            </div>
          ) : (
            <div style={{ width: "75%" }}>
              {" "}
              {/* Establece el ancho del formulario en 75% */}
              <AddClientForm />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
