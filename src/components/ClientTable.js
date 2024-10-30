import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input, Tooltip } from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useAuthToken } from "./AuthContext";
const API_URL = process.env.REACT_APP_API_URL;

const ClientTable = () => {
  const { token } = useAuthToken();
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [pageSize] = useState(3);
  console.log(API_URL);

  useEffect(() => {
    fetchClients(currentPage, pageSize);
  }, [currentPage, token]);

  const fetchClients = async (page, limit) => {
    try {
      const response = await axios.get(
        `${API_URL}/clientes?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClients(response.data.clients);
      setTotalClients(response.data.total);
    } catch (error) {
      message.error("Error al cargar los clientes");
    }
  };
  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/clientes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.setFieldsValue(response.data);
      setIsModalOpen(true);
    } catch (error) {
      message.error("Error al cargar los datos del cliente");
    }
  };

  const handleUpdateClient = async () => {
    try {
      const updatedClient = form.getFieldsValue();
      await axios.put(`${API_URL}/clientes`, updatedClient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        console.log(`Bearer ${token}`);
        await axios.delete(`${API_URL}/clientes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Estado del cliente actualizado exitosamente");
      } else {
        await axios.post(
          `${API_URL}/clientes/${id}`,
          { estado: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Estado del cliente actualizado exitosamente");
      }
      fetchClients(currentPage, pageSize);
    } catch (error) {
      console.log(error);
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
      render: (text) => (
        <Tooltip title="Nombre del cliente">
          <b>{text}</b>
        </Tooltip>
      ),
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      render: (text) => <Tooltip title="Apellido del cliente">{text}</Tooltip>,
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      render: (text) => <Tooltip title="Dirección del cliente">{text}</Tooltip>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Tooltip title="Correo electrónico del cliente">{text}</Tooltip>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      render: (text) => <Tooltip title="Teléfono del cliente">{text}</Tooltip>,
    },
    {
      title: "CUIL",
      dataIndex: "cuil",
      key: "cuil",
      render: (text) => <Tooltip title="CUIL del cliente">{text}</Tooltip>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (
        <Tooltip title={text === 1 ? "Cliente activo" : "Cliente inactivo"}>
          {text === 1 ? "Activo" : "Inactivo"}
        </Tooltip>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <>
          <Tooltip title="Editar cliente">
            <Button
              type="primary"
              onClick={() => fetchClientById(record.id)}
              style={{ marginRight: 8 }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip
            title={
              record.estado === 1 ? "Desactivar cliente" : "Activar cliente"
            }
          >
            <Button
              type="default"
              onClick={() => handleToggleStatus(record.id, record.estado)}
            >
              {record.estado === 1 ? (
                <DeleteOutlined />
              ) : (
                <CheckCircleOutlined />
              )}
            </Button>
          </Tooltip>
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
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
