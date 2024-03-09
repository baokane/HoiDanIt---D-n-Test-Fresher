import { Descriptions, Drawer } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const ViewDetailOrder = (props) => {
    const { open, setOpen, dataViewDetailOrder } = props

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    console.log('dataViewDetailOrder:', dataViewDetailOrder)

    return (
        <>
            <Drawer title="Chức năng xem chi tiết" onClose={onClose} open={open} width='50%' >
                <Descriptions title="User Info" bordered column={2}>
                    <Descriptions.Item label="ID">{dataViewDetailOrder._id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataViewDetailOrder.name}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{dataViewDetailOrder.phone}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetailOrder.address}</Descriptions.Item>
                    <Descriptions.Item label="Chi tiết">
                        <h4>Các cuốn sách:</h4>
                        {
                            dataViewDetailOrder && dataViewDetailOrder.detail && dataViewDetailOrder.detail.length > 0 &&
                            dataViewDetailOrder.detail.map(item => {
                                return (
                                    <div>
                                        <b>Tên sách</b>: {item.bookName} &nbsp;&nbsp;  <b>số lượng</b>: {item.quantity}
                                    </div>
                                )
                            })
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">{dataViewDetailOrder.totalPrice}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{moment(dataViewDetailOrder.createdAt).format('DD-MM-YYYY HH:mm:SS')}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{moment(dataViewDetailOrder.updatedAt).format('DD-MM-YYYY HH:mm:SS')}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {dataViewDetailOrder.address}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};

export default ViewDetailOrder;