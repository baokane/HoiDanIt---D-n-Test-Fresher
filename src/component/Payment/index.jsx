import { Badge, Button, Checkbox, Form, Input, message, notification } from 'antd';
import './payment.scss'
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { callPlaceOrder } from '../../services/api';
import { useState } from 'react';
import { doResetCartsAction } from '../../redux/order/orderSlice';

const Payment = (props) => {
    const { totalPrice, setCurrentSteps } = props
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch()
    console.log('carts:', carts)
    const [form] = Form.useForm();
    const [totalPriceBooks, setTotalPriceBooks] = useState(0)

    const onFinish = async (values) => {
        console.log('Success:', values);
        setCurrentSteps(2)
        if (values.name && values.address && values.phone) {
            const detailsOrder = carts.map((item) => {
                return {
                    bookName: item.details.mainText,
                    quantity: item.quantity,
                    _id: item._id
                }
            })

            const res = await callPlaceOrder(values.name, values.address, values.phone, totalPrice, detailsOrder)
            console.log('res:', res)
            if (res && res.data) {
                message.success('Đặt hàng thành công')
                dispatch(doResetCartsAction())
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: 'Đặt hàng thất bại'
                })
            }
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
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
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                className='form__item'
                label="Số điện thoại"
                name="phone"
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
                <TextArea rows={4} className='form-item__address' />
            </Form.Item>
            <div className='form__text'>
                Hình thức thanh toán
            </div>
            <div>
                <Checkbox className='form__icon' checked={true}></Checkbox>
                Thanh toán khi nhận hàng
            </div>
            <div className='form-text__total'>Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
            </div>
            <Form.Item >
                <Button
                    type="primary"
                    htmlType="submit"
                    className='form__button'

                >
                    Đặt hàng({carts.length})
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Payment;