import { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';

const ManageAccount = (props) => {
    const { isModalOpen, setIsModalOpen, defaultActiveKey } = props

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Tags
    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Cập nhật thông tin',
            children: <UserInfo setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />,
        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: <ChangePassword setIsModalOpen={setIsModalOpen} />,
        },
    ];

    return (
        <>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} width={900}
                destroyOnClose
                maskClosable={false}
            >
                <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </Modal>
        </>
    );
};

export default ManageAccount;