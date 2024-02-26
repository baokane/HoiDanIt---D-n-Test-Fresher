import { Button, Col, Modal, Row, InputNumber, Form, Input, Select, Upload, message, notification } from 'antd';
import UploadThumbnailUpdateBook from './ImageThumbnailUpdateBook';
import UploadSliderUpdateBook from './ImageSliderUpdateBook';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { callUploadBookImg, putUpdateBook } from '../../../../services/api';
// import UploadSlider from './UploadSlider';
// import { callUploadBookImg, getCategoryBook, postCreateBook } from '../../../services/api';
// import UploadThumbnail from './UploadThumbnail';

const ModalUpdateBook = (props) => {
    // Modal
    const { isModalOpen, setIsModalOpen, dataUpdateBook, setDataUpdateBook, fetchListBook, setCurrentBook } = props
    const [form] = Form.useForm();

    const [imageSlider, setImageSlider] = useState([])
    const [dataThumbnail, setDataThumbnail] = useState([])
    const [initForm, setInitForm] = useState(null)
    console.log('dipbook:', dataUpdateBook)
    // Modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setIsModalOpen(false);
        form.submit()
    };

    const handleCancelModal = () => {
        // form.resetFields();
        setIsModalOpen(false);
    };

    // Form
    const onFinish = async (values) => {
        console.log('Success:', values);
        const nameThumbnai = dataThumbnail[0].name
        const nameSlider = imageSlider.map(item => item.name)
        const res = await putUpdateBook(
            values._id,
            values.mainText,
            values.author,
            values.price,
            values.category,
            values.quantity,
            values.sold,
            nameThumbnai,
            nameSlider
        )
        if (res && res.data) {
            message.success('Cập nhật cuốn sách thành công');
            setIsModalOpen(false)
            form.resetFields()
            fetchListBook()
            setCurrentBook(1)
        } else {
            notification.error({
                placement: 'topRight',
                message: 'Có lỗi xảy ra',
                description: 'Cập nhật cuốn sách thất bại'
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (dataUpdateBook?._id) {
            const arrThumbnail = [
                {
                    uid: uuidv4(),
                    name: dataUpdateBook.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdateBook.thumbnail}`,
                }
            ]

            const arrSlider = dataUpdateBook?.slider?.map(item => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                }
            })

            const init = {
                _id: dataUpdateBook._id,
                mainText: dataUpdateBook.mainText,
                author: dataUpdateBook.author,
                price: dataUpdateBook.price,
                category: dataUpdateBook.category,
                quantity: dataUpdateBook.quantity,
                sold: dataUpdateBook.sold,
                thumbnail: { fileList: arrThumbnail },
                slider: { fileList: arrSlider }
            }
            setInitForm(init);
            form.setFieldsValue(init);
            setDataThumbnail(init?.thumbnail?.fileList)
            setImageSlider(init?.slider?.fileList)
        }
        return () => {
            form.resetFields();
        }
    }, [dataUpdateBook])
    // Select
    const handleChangeSelect = (value) => {
        console.log(`selected ${value}`);
    };


    //component Thumbnail image
    const handleUploadImageThumbnail = async (options) => {
        const { onSuccess, onError, file } = options;
        const res = await callUploadBookImg(file)
        if (res && res.data) {
            setDataThumbnail([{
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
    }

    const handleRemoveImageThumbnail = (file) => {
        setDataThumbnail([])
    }

    //component Slider image
    const handleUploadImageSlider = async (options) => {
        const { onSuccess, onError, file } = options;
        const res = await callUploadBookImg(file)
        if (res.data) {
            setImageSlider((imageSlider) => [...imageSlider, {
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError()
        }
    }
    const handleRemoveImageSlider = (file) => {
        const dSlider = imageSlider.filter(item => item.uid !== file.uid)
        setImageSlider(dSlider)
    }


    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancelModal} width='50vw'>

                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={20}>
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="ID"
                            name="_id"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên sách"
                                name="mainText"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tác giả"
                                name="author"
                                rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Giá tiền"
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                            >
                                <InputNumber
                                    addonAfter="vnd"
                                    formatter={(value, info) => {
                                        console.log('value:', value, 'info:', info)
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Thể loại"
                                name="category"
                                rules={[{ required: false, message: 'Vui lòng nhập thể loại' }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    defaultValue={null}
                                    onChange={handleChangeSelect}
                                // options={listCategory}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng sách' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} />

                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Đã bán"
                                name="sold"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán' }]}
                            >
                                <InputNumber
                                    style={{ width: ' 100%' }}
                                    initialValues={0}
                                    min={1}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Thumnail"
                                name='thumbnail'
                            // rules={[{ required: true, message: 'Vui lòng nhập ảnh thumbnail' }]}
                            >

                                <UploadThumbnailUpdateBook
                                    initForm={initForm}
                                    handleUploadImageThumbnail={handleUploadImageThumbnail}
                                    dataThumbnail={dataThumbnail}
                                    handleRemoveImageThumbnail={handleRemoveImageThumbnail}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Slider"
                                name="slider"
                            // rules={[{ required: true, message: 'Please input your password!' }]}
                            >

                                <UploadSliderUpdateBook
                                    initForm={initForm}
                                    handleUploadImageSlider={handleUploadImageSlider}
                                    imageSlider={imageSlider}
                                    handleRemoveImageSlider={handleRemoveImageSlider}
                                />

                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal >
        </>
    )
}

export default ModalUpdateBook