import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Descriptions, Badge } from 'antd';
import moment from 'moment';

const UserViewDetail = (props) => {
    const { open, setOpen, dataViewDetail } = props

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}
            <Drawer width={'50vw'} title="Chức năng xem chi tiết" onClose={onClose} open={open}>
                <div style={{
                    display: 'block', width: 700, padding: 30, paddingRight: 150
                }}>
                    <Descriptions title="Thông tin user" bordered column={2}>
                        <Descriptions.Item label="ID">{dataViewDetail._id}</Descriptions.Item>
                        <Descriptions.Item label="User Name">{dataViewDetail.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Email">{dataViewDetail.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{dataViewDetail.phone}</Descriptions.Item>
                        <Descriptions.Item label="Role" span={2}>
                            <Badge status="processing" />&nbsp;&nbsp;
                            {dataViewDetail.role}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">{moment(dataViewDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{moment(dataViewDetail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>

                    </Descriptions>
                </div>
            </Drawer>
        </>
    );
};

export default UserViewDetail;