import React from "react";
import "antd/dist/antd.min.css";
import { Form, Input, Button, Checkbox, Radio, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AES } from "crypto-js";
import { createBrowserHistory } from "history";
import { post } from "../apiService";

export default function Login() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    post("login", {
      role: values.role,
      email:values.email,
      password: AES.encrypt(values.password, "cms").toString(),
    })
      .then((response) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            role: response.data.role,
            token: response.data.token,
          })
        );
        let history = createBrowserHistory();
        history.push({
          pathname: `/dashboard/${values.role}`,
        });
        history.go();
      })
      .catch(() => {
        message.error("Please check your email or password and try again!");
      });
  };
  return (
    <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
      <Col md={8} sm={24}>
        <Form
          form={form}
          className="login-form"
          style={{ marginTop: 200 }}
          onFinish={onFinish}
        >
          <h2 style={{ textAlign: "center", fontWeight: 600, fontSize: 30 }}>
            COURSE MANAGEMENT ASSISTANT
          </h2>
          <Form.Item name="role" key="role" initialValue="student">
            <Radio.Group>
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="email"
            key="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please confirm the type of your email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Please input email" />
          </Form.Item>

          <Form.Item
            name="password"
            key="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                max: 16,
                min: 4,
                message:
                  "The size of the password must be between 4 and 16 digits!",
              },
              {
                pattern: new RegExp("^[0-9a-zA-Z_]{1,}$", "g"),
                message: "Only allow numbers, letters and underscores!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Please input password"
            />
          </Form.Item>

          <Form.Item key="rememberMe">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item key="submit">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
              onClick={() => {
                form.submit();
              }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}