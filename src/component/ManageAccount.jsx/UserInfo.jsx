import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons"
import { Avatar, Button, Row, Upload, message, notification, Form, Input, Col } from "antd"
import { callUpdateAvatar, callUpdateUserInfo } from "../../services/api"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { doUpdateUserInfoAction } from "../../redux/account/accountSlide"

const UserInfo = (props) => {
    const { setIsModalOpen } = props

    const [urlAvatar, setUrlAvatar] = useState('')
    const dataUser = useSelector(state => state.account.user)
    const dispatch = useDispatch()
    console.log('dataUser:', dataUser)
    // Upload
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file)
        console.log('res:', res)
        if (res && res.data && res.data.fileUploaded) {
            setUrlAvatar(res.data.fileUploaded)
            message.success('Cập nhật avatar thành công!')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: ' Cập nhật avatar thất bại'
            })
        }
    }
    const propsUpload = {
        // name: 'file',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        customRequest: handleUploadAvatar,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    // Form
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUser)
    }, [dataUser])
    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await callUpdateUserInfo(values.id, values.fullName, values.phone, urlAvatar)
        if (res && res.data) {
            dispatch(doUpdateUserInfoAction({ fullName: values.fullName, phone: values.phone, avatar: urlAvatar }))
            console.log('res:', res)
            setIsModalOpen(false)
            form.setFieldsValue(dataUser)
            localStorage.removeItem('access_token')
            message.success('Cập nhật thông tin thành công!')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: ' Cập nhật thông tin thất bại!'
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row gutter={20}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
                <Avatar size={150} icon={<AntDesignOutlined />} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${urlAvatar || dataUser.avatar}`} />
                <Upload {...propsUpload} showUploadList={false}>
                    <Button
                        style={{ marginTop: '50px', width: '150px' }}
                        icon={<UploadOutlined />}
                    >
                        Upload Avatar
                    </Button>
                </Upload >
            </Col>

            <Col span={12}>
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
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                    // rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    )
}

export default UserInfo