import { Button, Col, Modal, Row, InputNumber, Form, Input, Select, Upload, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import UploadSlider from './UploadSlider';
import { callUploadBookImg, getCategoryBook, postCreateBook } from '../../../services/api';
import UploadThumbnail from './UploadThumbnail';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ModalCreateBook = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [imageSlider, setImageSlider] = useState([])
    const [dataThumbnail, setDataThumbnail] = useState([])
    console.log('is:', imageSlider, 'i th:', dataThumbnail)
    // Modal
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setIsModalOpen(false);
        form.submit()
    };

    const handleCancelModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    // Form
    const onFinish = async (values) => {
        console.log('Success:', values);
        console.log('slider:', imageSlider)
        console.log('thumbnail:', dataThumbnail)
        if (dataThumbnail.length === 0) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: 'Vui lòng thêm sách thumbnail'
            })
            return
        }
        if (imageSlider.length === 0) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: 'Vui lòng thêm sách slider'
            })
            return
        }
        const thumbnail = dataThumbnail[0].name
        const slider = imageSlider.map(item => item.name)
        const dataCreateBook = {
            thumbnail: thumbnail,
            slider: slider,
            mainText: values.mainText,
            author: values.author,
            price: values.price,
            sold: values.sold,
            quantity: values.quantity,
            category: values.category
        }
        const res = await postCreateBook(dataCreateBook);
        console.log('res chinh dang lam::', res)
        if (res && res.data) {
            message.success("Tạo mới quyển sách thành công")
            setIsModalOpen(false)
            form.resetFields()
            setDataThumbnail([])
            setImageSlider([])
            await props.fetchListBook()
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: 'Tạo mới quyển sách thất bại'
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Select
    const [listCategory, setListCategory] = useState([])
    const handleChangeSelect = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        (async () => {
            const res = await getCategoryBook()
            console.log('>res:', res)
            if (res && res.data) {
                const d = res.data.map((item) => {
                    return {
                        value: item,
                        label: item
                    }
                })
                setListCategory(d)
            }
        })();

    }, [])
    // Upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])


    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleRemoveImageSlider = (file) => {
        console.log('ílider:', imageSlider)
        imageSlider.map(item => item.uid !== file.uid)
    }


    // Thumbnail
    const handleUploadImageThumbnail = async (options) => {
        const { onSuccess, onError, file } = options;
        // console.log('file dang lam:', file)
        const res = await callUploadBookImg(file)
        // console.log('>   res:', res)
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

    // Slider image
    const handleUploadImageSlider = async (options) => {
        const { onSuccess, onError, file } = options;
        // console.log('file:', file)
        const res = await callUploadBookImg(file)
        // console.log('>>>> res:', res)
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

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancelModal} width='50vw'>

                <Form
                    form={form}
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    // style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={20}>
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
                                    options={listCategory}
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
                                name='thumnail'
                            // rules={[{ required: true, message: 'Vui lòng nhập ảnh thumbnail' }]}
                            >

                                <UploadThumbnail
                                    handleUploadImageThumbnail={handleUploadImageThumbnail}
                                    dataThumbnail={dataThumbnail}
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

                                <UploadSlider
                                    handleUploadImageSlider={handleUploadImageSlider}
                                    imageSlider={imageSlider}
                                />

                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal >
        </>
    );
};

export default ModalCreateBook;