import { Button, Divider, Form, Input, message, notification } from 'antd';
import { postLogin } from "../../services/api";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlide';

const LoginPage = () => {

    const nagivate = useNavigate()

    const [isSubmit, setIsSubmit] = useState(false)

    const dispatch = useDispatch()

    const onFinish = async (values) => {
        setIsSubmit(false)
        const res = await postLogin(values.email, values.password)
        setIsSubmit(true)
        if (res && res.statusCode === 201) {
            localStorage.setItem('access_token', res.data.access_token)
            console.log('res:', res.data.user)
            dispatch(doLoginAction(res.data.user))
            message.success('Đăng nhập tài khoản thành công');
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
            nagivate('/')
        }
        if (res && res.statusCode === 400) {
            notification.error({
                placement: 'topRight',
                message: 'Có lỗi xảy ra',
                description: 'Thông tin đăng nhập không chính xác'
            });
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ marginTop: '50px' }}>Đăng nhập</h1>
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Loading
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default LoginPage