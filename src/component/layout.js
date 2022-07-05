/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popover } from "antd";
import React, { useState } from "react";
import { createBrowserHistory } from "history";
import { Outlet } from "react-router-dom";
import { post } from "../apiService";
import { BreadcrumbForManager } from "../breadcrumb";
import styled from "styled-components";
import RoutesTree from "../Routes";
import SidebarGenerator from "./sidebar";

const { Header, Sider, Content } = Layout;

const LayoutSider = styled(Sider)`
  top: 0;
  left: 0;
  padding: 0;
  overflow-y: auto;
  position: sticky;
  height: 100vh;
`;

const LayoutHeader = styled(Header)`
  padding: 0;
  position: sticky;
  top: 0;
  background-color: #001529;
  z-index: 1;
`;
const LayoutContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  height: 100%;
`;

const Logo = styled.h3`
  margin-top: 5px;
  margin-bottom: 15px;
  color: white;
  height: 40px;
  text-align: center;
  font-size: 35px;
  font-family: monospace;
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
`;

const handleLogout = () => {
  post("logout", {})
    .then((response) => {
      console.log(response.data);
    })
    .then(() => {
      window.localStorage.clear();
      let history = createBrowserHistory();
      history.push({
        pathname: "/login",
      });
      history.go();
    });
};

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const MenuFolder = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  let pathname = window.location.pathname;
  const path =
    pathname.toString().includes("courses") &&
    pathname.toString().split("courses/")[1] !== ""
      ? pathname.toString().split("courses/")[1]
      : pathname.toString().split("manager/")[1]?.split("/")[0];
  const openKeys = pathname.toString().includes("courses")
    ? "Course"
    : path?.substring(0, path.length - 1)[0].toUpperCase() +
      path?.substring(0, path.length - 1).substring(1);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LayoutSider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Logo>cms</Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          selectedKeys={path ? [path] : ""}
          defaultOpenKeys={openKeys ? [openKeys] : null}
        >
          {RoutesTree()[1].children[0].children.map((item) =>
            SidebarGenerator(item)
          )}
        </Menu>
      </LayoutSider>
      <Layout className="site-layout">
        <LayoutHeader className="site-layout-background">
          <MenuFolder
            className="trigger"
            key="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            style={{
              color: "white",
            }}
          />
          <Popover content={<a onClick={handleLogout}>Logout</a>}>
            <UserOutlined
              style={{
                backgroundColor: "grey",
                color: "white",
                fontSize: "20px",
                padding: "5px",
                float: "right",
                marginRight: "100px",
                borderRadius: "50%",
                marginTop: "15px",
              }}
            />
          </Popover>
          <BellOutlined
            style={{
              color: "white",
              fontSize: "20px",
              float: "right",
              marginRight: "50px",
              marginTop: "20px",
            }}
          />
        </LayoutHeader>
        <BreadcrumbForManager />
        <LayoutContent className="site-layout-background">
          <Outlet />
        </LayoutContent>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
