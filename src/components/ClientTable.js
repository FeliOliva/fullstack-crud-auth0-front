import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        "https://fullstack-crud-auth0-back.vercel.app/clientes"
      ); // Cambia esta URL si es necesario
      setClients(response.data);
    } catch (error) {
      message.error("Error al cargar los clientes");
    }
  };

  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(
        `https://fullstack-crud-auth0-back.vercel.app/getClientsByID/${id}`
      );
      setEditingClient(response.data);
      form.setFieldsValue(response.data); // Prellena el formulario con los datos del cliente
      setIsModalOpen(true); // Abre el modal
    } catch (error) {
      message.error("Error al cargar los datos del cliente");
    }
  };

  const handleUpdateClient = async () => {
    try {
      const updatedClient = form.getFieldsValue();
      await axios.put(
        "https://fullstack-crud-auth0-back.vercel.app/updateClients",
        updatedClient
      );
      message.success("Cliente actualizado exitosamente");
      setIsModalOpen(false);
      fetchClients(); // Actualiza la lista de clientes
    } catch (error) {
      message.error("Error al actualizar el cliente");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const endpoint = currentStatus === 1 ? "dropClient" : "upClient";
    try {
      await axios.put(
        `https://fullstack-crud-auth0-back.vercel.app/${endpoint}/${id}`
      );
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
        <>
          <Button
            type="primary"
            onClick={() => fetchClientById(record.id)} // Abre el modal y carga los datos del cliente
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            type="default"
            onClick={() => handleToggleStatus(record.id, record.estado)}
          >
            {record.estado === 1 ? "Desactivar" : "Activar"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={clients}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        style={{ padding: "24px", width: "100%" }}
      />

      <Modal
        title="Editar Cliente"
        visible={isModalOpen}
        onOk={handleUpdateClient}
        onCancel={() => setIsModalOpen(false)}
        okText="Actualizar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[
              { required: true, message: "Por favor ingresa el apellido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="direccion"
            rules={[
              { required: true, message: "Por favor ingresa la dirección" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Por favor ingresa el email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="telefono"
            rules={[
              { required: true, message: "Por favor ingresa el teléfono" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CUIL"
            name="cuil"
            rules={[{ required: true, message: "Por favor ingresa el CUIL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Estado" name="estado" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClientTable;
