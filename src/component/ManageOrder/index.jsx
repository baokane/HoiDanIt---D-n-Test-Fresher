import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { callManageOrder } from '../../services/api';
import moment from 'moment';
import ViewDetailOrder from './ViewDetailOrder';



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


const ManageOrder = () => {
    const [listOrder, setListOrder] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const [isOpenViewDetailOrder, setIsOpenViewDetailOrder] = useState(false)
    const [dataViewDetailOrder, setDataViewDetailOrder] = useState({})

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (text, record) => {
                console.log('record:', record)
                return (
                    <a
                        onClick={() => {
                            setDataViewDetailOrder(record)
                            setIsOpenViewDetailOrder(true)
                        }}
                    >
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            render: (updatedAt) => { return (<p>{moment(updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>) },
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            // setCurrent(1)
        }
    };

    useEffect(() => {
        fetchListOrder()
    }, [current, pageSize])

    const fetchListOrder = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        const res = await callManageOrder(query)
        console.log('>res :', res)
        setListOrder(res.data.result)
        setTotal(res.data.meta.total)
    }

    const renderHeaderOrder = () => {
        return (
            <h4>Table List Order</h4>
        )
    }

    return (
        <>
            <Table
                title={renderHeaderOrder}
                rowKey='_id'
                columns={columns}
                dataSource={listOrder}
                onChange={onChange}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return <div>{range[0]}-{range[1]} trên {total} rows</div>
                    }
                }}
            />
            <ViewDetailOrder
                setOpen={setIsOpenViewDetailOrder}
                open={isOpenViewDetailOrder}
                dataViewDetailOrder={dataViewDetailOrder}
            />
        </>
    )
}

export default ManageOrder;