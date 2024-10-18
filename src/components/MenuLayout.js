import React from "react";
import { Layout, Menu } from "antd";
import ClientTable from "./ClientTable";
import AddClientForm from "./AddClientForm";
import Profile from "./Profile";

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
          style={{ flex: 1 }}
        >
          <Menu.Item key="1">Ver Cliente</Menu.Item>
          <Menu.Item key="2">Agregar Cliente</Menu.Item>
        </Menu>
        <Profile />
      </Header>
      <Layout style={{ padding: "24px" }}>
        {" "}

        <Content
          style={{
            padding: "16px 24px",
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
              <ClientTable />
            </div>
          ) : (
            <div style={{ width: "75%" }}>
              {" "}
              <AddClientForm />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
