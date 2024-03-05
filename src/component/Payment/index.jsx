import { Badge, Button, Checkbox, Form, Input } from 'antd';
import './payment.scss'

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const Payment = () => (
    <Form
        className='form'
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
            className='form__item'
            label="Tên người nhận"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            className='form__item'
            label="Số điện thoại"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            className='form__item'
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
            <Input className='form-item__address' />
        </Form.Item>
        <div><Badge /> Hình thức thanh toán</div>
        <div>Thanh toán khi nhận hàng</div>
    </Form>
);

export default Payment;