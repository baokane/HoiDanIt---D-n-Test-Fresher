import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, Modal, message, notification } from 'antd';
import { postCreateUserAdmin } from '../../../services/api';

const UserModalCreate = (props) => {
    const { setIsModalOpen, isModalOpen, fetchListUser } = props
    const [form] = Form.useForm();

    const [isModalLoading, setIsModalLoaing] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setIsModalOpen(false);
        form.submit()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        setIsModalLoaing(true)
        const res = await postCreateUserAdmin(values.username, values.password, values.email, values.phone)
        if (res && res.statusCode === 201) {
            message.success("Tạo mới user thành công!")
            form.resetFields()
            setIsModalOpen(false)
            await fetchListUser()
        }
        if (res && res.statusCode === 400) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: 'Tạo mới user thất bại!'
            })
        }
        setIsModalLoaing(false)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isModalLoading}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;