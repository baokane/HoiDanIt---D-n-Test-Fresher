import { Button, Divider, Form, Input, Space, message, notification } from 'antd';
import { postRegister } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
// import React from 'react';
// import './index.css';

const RegisterPage = () => {
    const nagivate = useNavigate()

    const [isSubmit, setIsSubmit] = useState(false)

    const onFinish = async (values) => {
        setIsSubmit(false)
        const res = await postRegister(values.fullname, values.email, values.password, values.phone)
        console.log('res:', res)
        setIsSubmit(true)
        if (res && res.statusCode === 201) {
            message.success('Đăng kí tài khoản thành công');
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
            nagivate('/login')
        }
        if (res && res.statusCode === 400) {
            notification.error({
                placement: 'topRight',
                message: 'Có lỗi xảy ra',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message
            });
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
        }
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ marginTop: '50px' }}>Đăng kí người dùng mới</h1>
            <Divider />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Fullname"
                    name="fullname"
                    rules={[{ required: true, message: 'Please input your usernameeeee!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your password!' }]}
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
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Loading
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default RegisterPage