import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getFetchListUser } from '../../../services/api';
import { current } from '@reduxjs/toolkit';

const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        // sorter: true,
        // key: 'ID'
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        // sorter: true,
        // key: 'Full name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        // sorter: true,
        // key: 'Email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        // sorter: true,
        // key: 'Phone',
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        // sorter: true,
        // key: 'Avatar',
    },
    {
        title: 'Action',
        key: 'fullName',
        // dataIndex: 'email',
        // sorter: true,
        render: function (text, record, index) {
            return (
                <>
                    <button>DELETE</button>
                    <button>UPDATE</button>
                </>
            )
        }
    },
];

let data = [
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




const UserTable = () => {

    const [listUser, setListUser] = useState('')
    const [totalUsers, setTotalUsers] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (current !== pagination && pagination.current) {
            setCurrent(pagination.current)
            console.log(current)
        }
        // if (pageSize !== pagination && pagination.pageSize) {
        //     setPageSize(pagination.pageSize)
        //     setCurrent(1)
        // }
    };

    useEffect(() => {
        fetchListUser()
    }, [current, pageSize])

    const fetchListUser = async () => {
        const res = await getFetchListUser(current, pageSize)
        console.log('>>>>res:', res)
        if (res && res.data) {
            setListUser(res.data.result)
            setTotalUsers(res.data.meta.total)
        }
    }

    return (
        <Table
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey='_id'
            pagination={{
                current: current, pageSize: pageSize, showSizeChanger: true, total: totalUsers
            }}
        />)
}

export default UserTable;