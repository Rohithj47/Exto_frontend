import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { Button, DatePicker, Form, Input } from "antd";
import { Modal } from "antd";
const { Column } = Table;

function xComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseDate = (strDate) => {
    return new Date(strDate).toDateString();
  };

  const getPM = (id) => {};

  const onFinish = (values) => {
    console.log("Success:", values);
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

            <Form.Item
              label="Organisation"
              name="organisation"
              rules={[
                {
                  required: true,
                  message: "Please enter organisation",
                },
              ]}
            >
              <Input />
            </Form.Item>

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
              <Input />
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
              <Input />
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
            <a onClick={() => props.setTable(3, record.id)}>{record.title}</a>
          )}
          key="title"
        />
        <Column
          title="Description"
          //   render={(_, record) => parseDate(record.start_date)}
          dataIndex="description"
          key="description"
        />
        {/* <Column
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
        /> */}
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

export default xComponent;
