import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { Badge, Descriptions } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './booktable.scss'

const ViewDetailBook = (props) => {
    const { dataViewBook, open, setOpen } = props
    // const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    console.log('daView:', dataViewBook)

    // 
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    useEffect(() => {
        if (dataViewBook) {
            let imgThumbnail = {}, imgSlider = []
            if (dataViewBook.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataViewBook.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewBook.thumbnail}`
                }
            }

            if (dataViewBook.slider) {
                dataViewBook.slider.map(item => {
                    imgSlider.push({
                        uid: uuidv4(),
                        name: item,
                        status: 'done',
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewBook.slider}`
                    })
                })

            }
            setFileList([imgThumbnail, ...imgSlider])
        }
    }, [dataViewBook])

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        console.log('file:', file)
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

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}
            <Drawer title="Chức năng xem chi tiết" onClose={onClose} open={open} width='50%'>

                <Descriptions title="Thông tin cuốn sách" bordered column={2}>
                    <Descriptions.Item label="ID">{dataViewBook._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewBook.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewBook.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{dataViewBook.price}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" /> &nbsp;&nbsp;
                        {dataViewBook.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Create At">{moment(dataViewBook.createdAt).format('DD-MM-YYYY HH:mm:SS')}</Descriptions.Item>
                    <Descriptions.Item label="Update At">{moment(dataViewBook.updatedAt).format('DD-MM-YYYY HH:mm:SS')}</Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Ảnh sách</Divider>

                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={{ showRemoveIcon: false }}
                >

                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

            </Drawer >
        </>
    );
};

export default ViewDetailBook;