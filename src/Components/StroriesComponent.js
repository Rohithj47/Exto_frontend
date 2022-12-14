import React, { useEffect, useState } from "react";
import { Select, Space, Table, Tag } from "antd";
import { Button, DatePicker, Form, Input } from "antd";
import { Modal } from "antd";
import api from "../api";
const { Column } = Table;

function StoriesComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects", {
        params: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
        },
      })
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteStory = (id) => {
    api
      .delete("/stories", {
        data: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
          story: id,
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    const createBody = {};
    createBody.user_username = "user@nike.com";
    createBody.user_password = "user@nike.com";
    createBody.title = values.title;
    createBody.project = values.project;
    api
      .post("/stories", createBody)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <>
        <Button type="primary" onClick={showModal}>
          Create Story
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter title",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Project"
              name="project"
              rules={[
                {
                  required: true,
                  message: "Please enter project",
                },
              ]}
            >
              <Select
                options={projects.map((project) => {
                  const obj = {};
                  obj.value = project.id;
                  obj.label = project.title;
                  return obj;
                })}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
      <Table dataSource={props.data} style={{ padding: 15 }}>
        <Column
          title="Title"
          render={(_, record) => (
            <a onClick={() => props.setTable(2, record.id)}>{record.title}</a>
          )}
          key="title"
        />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Project" dataIndex="project" key="project" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Update </a>
              <a
                onClick={() => {
                  deleteStory(record.id);
                }}
              >
                Delete
              </a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default StoriesComponent;
