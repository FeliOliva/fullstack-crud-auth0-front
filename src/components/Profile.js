import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Dropdown } from "antd";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  const items = [
    {
      key: "1",
      label: (
        <div style={styles.profileContainer}>
          <Avatar src={user?.picture} size={64} />
          <h2 style={styles.name}>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: (
        <Button
          type="primary"
          onClick={() => logout({ returnTo: window.location.origin })}
          style={styles.logoutButton}
        >
          Log Out
        </Button>
      ),
    },
  ];

  return (
    isAuthenticated && (
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Avatar
          src={user?.picture || "https://via.placeholder.com/40"}
          size={40}
          style={styles.avatar}
        />
      </Dropdown>
    )
  );
};

const styles = {
  avatar: {
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: 20,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  name: {
    margin: "8px 0",
    fontSize: "1em",
  },
  logoutButton: {
    marginTop: "12px",
    width: "100%",
  },
};

export default Profile;
