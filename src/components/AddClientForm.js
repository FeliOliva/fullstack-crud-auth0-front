import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const AddClientForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:3001/addClient", values); // Cambia esta URL si es necesario
      message.success("Cliente agregado exitosamente");
      form.resetFields();
    } catch (error) {
      message.error("Error al agregar el cliente");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      {" "}
      {/* Contenedor reducido */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ required: true, message: "Por favor ingresa el apellido" }]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          name="direccion"
          label="Dirección"
          rules={[
            { required: true, message: "Por favor ingresa la dirección" },
          ]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Por favor ingresa un email válido",
            },
          ]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          name="telefono"
          label="Teléfono"
          rules={[{ required: true, message: "Por favor ingresa el teléfono" }]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          name="cuil"
          label="CUIL"
          rules={[{ required: true, message: "Por favor ingresa el CUIL" }]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="small"
            style={{ width: "100%" }}
          >
            Agregar Cliente
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClientForm;
