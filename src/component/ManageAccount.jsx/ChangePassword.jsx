import { Button, Form, Input, message, notification } from "antd"
import { useEffect } from "react";
import { callUpdatePassword } from "../../services/api";
import { useSelector } from "react-redux";

const ChangePassword = (props) => {
    const { setIsModalOpen } = props

    const dataUser = useSelector(state => state.account.user)
    const emailUser = dataUser?.email ?? ''
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUser)
    }, [])
    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await callUpdatePassword(dataUser.email, values.oldpass, values.newpass)
        console.log('>res:', res)
        if (res && res.data === 'ok') {
            setIsModalOpen(false)
            form.setFieldValue('oldpass', '')
            form.setFieldValue('newpass', '')
            message.success('Thay đổi mật khẩu thành công!')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                hidden
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    disabled={true}
                />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    disabled={true}
                />
            </Form.Item>

            <Form.Item
                label="Mật khẩu hiện tại"
                name="oldpass"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="newpass"
            // rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangePassword