import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { Button, DatePicker, Form, Input } from "antd";
import { Modal } from "antd";
import api from "../api";
import { Select } from "antd";
const { Column } = Table;

function ProjectContent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectManagers, setProjectManagers] = useState([]);
  const [scrumMaster, setScrumMasters] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [organisations, setOrganisations] = useState([]);

  const parseDate = (strDate) => {
    return new Date(strDate).toDateString();
  };

  useEffect(() => {
    api
      .get("/project_managers", {
        params: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
        },
      })
      .then(function (response) {
        const pmOption = response.data.project_managers.map((item) => {
          const object = {};
          object.value = item.id;
          object.label = item.first_name + item.last_name;
          return object;
        });
        setProjectManagers(pmOption);
      })
      .catch(function (error) {
        console.log(error);
      });

    api
      .get("/scrum_masters", {
        params: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
        },
      })
      .then(function (response) {
        const scrumOption = response.data.scrum_masters.map((item) => {
          const object = {};
          object.value = item.id;
          object.label = item.first_name + item.last_name;
          return object;
        });
        setScrumMasters(scrumOption);
      })
      .catch(function (error) {
        console.log(error);
      });

    api
      .get("/customers", {
        params: {
          user_username: "user@nike.com",
          user_password: "user@nike.com",
        },
      })
      .then(function (response) {
        const customerOption = response.data.customers.map((item) => {
          const object = {};
          object.value = item.id;
          object.label = item.name;
          return object;
        });
        setCustomers(customerOption);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getPM = (id) => {};

  const onFinish = (values) => {
    const project = {};
    project.user_username = "user@nike.com";
    project.user_password = "user@nike.com";
    project.title = values.title;
    project.customer = values.customer;
    project.start_date = `${values.startDate.year()}-${
      values.startDate.month() + 1
    }-${values.startDate.date().toString().padStart(2, "0")}`;
    project.end_date = `${values.endDate.year()}-${
      values.endDate.month() + 1
    }-${values.endDate.date().toString().padStart(2, "0")}`;
    project.project_manager = values.projectManager;
    project.scrum_master = values.scrumMaster;
    console.log("Success:", values);
    api
      .post("/projects", project)
      .then(function (res) {
        props.setTable(0, null);
      })
      .catch(function (err) {
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
          Create Project
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
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
              remember: true,
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

            {/* <Form.Item
              label="Organisation"
              name="organisation"
              rules={[
                {
                  required: true,
                  message: "Please enter organisation",
                },
              ]}
            >
              <Input defaultValue={1} />
            </Form.Item> */}

            <Form.Item
              label="Customer"
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please enter customer",
                },
              ]}
            >
              <Select options={customers} />
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please enter start date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please enter end date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            {/* 
            <Form.Item
              label="Project Manager"
              name="projectManager"
              rules={[
                {
                  required: true,
                  message: "Please enter project manager",
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item
              label="Project Manager"
              name="projectManager"
              rules={[
                {
                  required: true,
                  message: "Please enter project manager",
                },
              ]}
            >
              <Select options={projectManagers} />
            </Form.Item>

            <Form.Item
              label="Scrum Master"
              name="scrumMaster"
              rules={[
                {
                  required: true,
                  message: "Please enter scrum master",
                },
              ]}
            >
              <Select options={scrumMaster} />
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
            <a onClick={() => props.setTable(1, record.id)}>{record.title}</a>
          )}
          key="title"
        />
        <Column
          title="Project Manager"
          //   render={(_, record) => parseDate(record.start_date)}
          dataIndex="project_manager"
          key="project_manager"
        />
        <Column
          title="Scrum Master"
          //   render={(_, record) => parseDate(record.start_date)}
          dataIndex="scrum_master"
          key="scrum_master"
        />
        <Column
          title="Start Date"
          render={(_, record) => parseDate(record.start_date)}
          key="start_date"
        />
        <Column
          title="End Date"
          render={(_, record) => parseDate(record.start_date)}
          key="end_date"
        />
        {/* <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        /> */}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Update </a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default ProjectContent;
