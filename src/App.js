import logo from "./logo.svg";
import "./App.css";
import ContentComponent from "./Components/ContentComponent";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { Typography } from "antd";
import api from "./api";
import axios from "axios";

const { Title } = Typography;
const { Header, Footer, Sider } = Layout;

const App = () => {
  const [bc, setBc] = useState("Projects");
  const [level, setLevel] = useState(0); // 0 is Project Level

  // const getProjects = () => {
  //   api
  //     .get("/projects", {
  //       params: {
  //         user_username: "user@nike.com",
  //         user_password: "user@nike.com",
  //       },
  //     })
  //     .then(function (response) {
  //       setData(response.data.projects)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  const [tableData, setData] = useState([]);
  useEffect(() => {
    api
      .get("/projects", {
        params: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
        },
      })
      .then(function (response) {
        setData(response.data.projects);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  const setTable = (level, id) => {
    switch (level) {
      case 0:
        console.log("hi")
        api
          .get("/projects", {
            params: {
              user_username: "user@nike.com",
              user_password: "user@nike.com",
            },
          })
          .then(function (response) {
            setData(response.data.projects);
          })
          .catch(function (error) {
            console.log(error);
          });
        setBc("Projects");
        setLevel(0);
        break;
      case 1:
        //epics
        api
          .get("/epics", {
            params: {
              user_username: "user@nike.com",
              user_password: "user@nike.com",
              project: id,
            },
          })
          .then(function (response) {
            console.log(response.data.epics);
            setData(response.data.epics);
          })
          .catch(function (error) {
            console.log(error);
          });
        setBc("Projects/Epics");
        setLevel(1);
        break;
      case 2:
        //stories
        api
          .get("/stories", {
            params: {
              user_username: "user@nike.com",
              user_password: "user@nike.com",
              epic: id,
            },
          })
          .then(function (response) {
            setData(response.data.stories);
          })
          .catch(function (error) {
            console.log(error);
          });
        setBc("Projects/Epics/Stories");
        setLevel(2);
        break;
      default:
        //default to projects
        setData([
          {
            key: "1",
            firstName: "John",
            lastName: "Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            key: "2",
            firstName: "Jim",
            lastName: "Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },
          {
            key: "3",
            firstName: "Joe",
            lastName: "Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
          },
        ]);
        break;
    }
  };

  return (
    <Layout>
      <Sider
        breakpoint="xl"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            UserOutlined,
          ].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <Title
            style={{
              marginLeft: 25,
              marginBottom: 20,
            }}
            level={2}
          >
            {bc}
          </Title>
        </Header>
        <ContentComponent level={level} data={tableData} setTable={setTable} />
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Exto ©2022
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
