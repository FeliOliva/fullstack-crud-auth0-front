import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalClients, setTotalClients] = useState(0); 
  const [pageSize] = useState(3); 

  useEffect(() => {
    fetchClients(currentPage, pageSize);
  }, [currentPage]);

  const fetchClients = async (page, limit) => {
    try {
      const response = await axios.get(`${API_URL}/clientes?page=${page}&limit=${limit}`);

      setClients(response.data.clients); 
      setTotalClients(response.data.total); 
    } catch (error) {
      message.error("Error al cargar los clientes");
    }
  };
  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/clientes/${id}`);
      setEditingClient(response.data); 
      form.setFieldsValue(response.data); 
      setIsModalOpen(true); 
    } catch (error) {
      message.error("Error al cargar los datos del cliente");
    }
  };

  const handleUpdateClient = async () => {
    try {
      const updatedClient = form.getFieldsValue();
      await axios.put(`${API_URL}/clientes`, updatedClient);
      message.success("Cliente actualizado exitosamente");
      setIsModalOpen(false);
      fetchClients(currentPage, pageSize);
    } catch (error) {
      message.error("Error al actualizar el cliente");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      if (currentStatus === 1) {
        await axios.delete(`${API_URL}/clientes/${id}`, { estado: 0 });
        message.success("Estado del cliente actualizado exitosamente");
      } else {
        await axios.post(`${API_URL}/clientes/${id}`, { estado: 1 });
        message.success("Estado del cliente actualizado exitosamente");
      }
      fetchClients(currentPage, pageSize);
    } catch (error) {
      message.error("Error al actualizar el estado del cliente");
    }
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalClients / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
          <Button type="primary" onClick={() => fetchClientById(record.id)} style={{ marginRight: 8 }}>
            Editar
          </Button>
          <Button type="default" onClick={() => handleToggleStatus(record.id, record.estado)}>
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
        pagination={false} 
        style={{ padding: "24px", width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span style={{ margin: "0 15px" }}>Página {currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(totalClients / pageSize)}
        >
          Siguiente
        </Button>
      </div>

      <Modal
        title="Editar Cliente"
        open={isModalOpen}
        onOk={handleUpdateClient}
        onCancel={() => setIsModalOpen(false)}
        okText="Actualizar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: "Por favor ingresa el nombre" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Apellido" name="apellido" rules={[{ required: true, message: "Por favor ingresa el apellido" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion" rules={[{ required: true, message: "Por favor ingresa la dirección" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Por favor ingresa el email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: "Por favor ingresa el teléfono" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="CUIL" name="cuil" rules={[{ required: true, message: "Por favor ingresa el CUIL" }]}>
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
