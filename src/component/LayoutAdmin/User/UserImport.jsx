import React, { useState } from 'react';
import { Button, Modal, notification, Table } from 'antd';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx'
import { callBulkCreateUser } from '../../../services/api';
import SampleFile from './data/bảngtính1.xlsx?url'

const UserImport = (props) => {
    const { isModalOpen, setIsModalOpen, fetchListUser } = props
    const [dataExcel, setDataExcel] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const data = dataExcel.map((item) => {
            item.password = '123456'
            return item
        })
        const res = await callBulkCreateUser(data)
        console.log('res:', res)
        if (res.data) {
            notification.success({
                message: 'Upload thành công',
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
            })
            setDataExcel([])
            setIsModalOpen(false)
            fetchListUser()
        } else (
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            })
        )
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDataExcel([])
    };

    // 
    const { Dragger } = Upload;

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info && info.fileList.length > 0) {

                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();

                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: 'array' });
                        console.log('wb:', workbook)
                        // find the name of your sheet in the workbook first
                        let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                        // convert to json format
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                            header: ['fullName', 'email', 'phone'],
                            range: 1,
                        });
                        console.log('json:', jsonData)
                        setDataExcel(jsonData)

                    };
                    reader.readAsArrayBuffer(file);
                }

                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // 
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const TableImport = () => {
        return (
            <>
                <h4>Dữ liệu upload:</h4>
                <Table columns={columns} dataSource={dataExcel} onChange={onChange} pagination={false} />
            </>
        )
    }

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Basic Modal"
                open={isModalOpen}
                onOk={() => handleOk()}
                onCancel={handleCancel}
                maskClosable={false}
                okButtonProps={{ disabled: dataExcel.length < 1 }}
            >

                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files. <a onClick={(e) => e.stopPropagation()} href={SampleFile} download>Click to download sample file</a>
                    </p>
                </Dragger>

                {TableImport()}
            </Modal>
        </>
    );
};

export default UserImport;