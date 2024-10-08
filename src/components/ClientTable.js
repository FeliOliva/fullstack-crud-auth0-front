import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import axios from "axios";

const ClientTable = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3001/clientes"); // Cambia esta URL si es necesario
      setClients(response.data);
    } catch (error) {
      message.error("Error al cargar los clientes");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const endpoint = currentStatus === 1 ? "dropClient" : "upClient";
    console.log(endpoint);
    try {
      await axios.put(`http://localhost:3001/${endpoint}/${id}`);
      message.success("Estado del cliente actualizado exitosamente");
      fetchClients(); // Actualiza la lista de clientes
    } catch (error) {
      message.error("Error al actualizar el estado del cliente");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "CUIL",
      dataIndex: "cuil",
      key: "cuil",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (text === 1 ? "Activo" : "Inactivo"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleToggleStatus(record.id, record.estado)}
        >
          {record.estado === 1 ? "Desactivar" : "Activar"}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={clients}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      style={{ padding: "24px", width: "100%" }}
    />
  );
};

export default ClientTable;
