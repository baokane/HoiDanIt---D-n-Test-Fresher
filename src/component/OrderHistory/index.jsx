import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getOrderHistory } from '../../services/api';
import { CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ReactJson from 'react-json-view';



// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//     },
// ];



const OrderHistory = () => {

    const [listOrderHistory, setListOrderHistory] = useState([])

    const columns = [
        {
            title: 'STT',
            dataIndex: "_id",
            // render: (id, record, index) => { ++index; return index; },
            render: (item, record, index) => { ++index; return index; }
        },
        {
            title: 'Thời gian',
            dataIndex: 'updatedAt',
            render: (updatedAt) => { return (<p>{moment(updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>) },
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: () => {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Thành công
                    </Tag>
                )
            }
        },
        {
            title: 'Chi tiết',
            dataIndex: 'phone',
            render: (text, record,) => {
                console.log('text:', text, 'record:', record)
                const details = record.detail.map(item => {
                    return ({
                        bookName: item.bookName,
                        quantity: item.quantity,
                        _id: item._id
                    })
                })
                return (
                    <ReactJson src={details} name={'Chi tiết đơn mua'} displayDataTypes={false} />
                )
            }
        },
    ];
    useEffect(() => {
        fetchOrderHistory()
    }, [])

    const fetchOrderHistory = async () => {
        const res = await getOrderHistory()
        console.log(res)
        setListOrderHistory(res.data)
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table rowKey='_id' columns={columns} dataSource={listOrderHistory} onChange={onChange} pagination={false} />
    )
};

export default OrderHistory;