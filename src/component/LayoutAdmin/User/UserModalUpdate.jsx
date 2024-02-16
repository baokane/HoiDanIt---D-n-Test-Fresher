import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, Modal, message, notification } from 'antd';
import { putUpdateUser } from '../../../services/api';

const UserModalUpdate = (props) => {
    const { setIsModalOpen, isModalOpen, fetchListUser, dataUpdate } = props
    const [form] = Form.useForm();

    const [isModalLoading, setIsModalLoaing] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        // setIsModalOpen(false);
        form.submit()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // form.resetFields()
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        setIsModalLoaing(true)
        const res = await putUpdateUser(values._id, values.fullName, values.phone)
        console.log('>>>>>res:', res)
        if (res && res.statusCode === 200) {
            message.success("Cập nhật user thành công")
            form.resetFields()
            setIsModalOpen(false)
            await fetchListUser()
        }
        if (res && res.statusCode !== 200) {
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

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>
            <Modal forceRender title="Modal Update" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isModalLoading}>
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
                        hidden
                        label="ID"
                        name="_id"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input disabled />
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

export default UserModalUpdate;