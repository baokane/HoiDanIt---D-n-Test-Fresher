import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getFetchListUser } from '../../../services/api';
import InputSearch from './InputSearch';

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
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true,
            // key: 'ID'
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            sorter: true,
            // key: 'Full name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            // key: 'Email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
            // key: 'Phone',
        },
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        // sorter: true,
        //     // key: 'Avatar',
        // },
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

    const [listUser, setListUser] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }
    };

    useEffect(() => {
        fetchListUser()
    }, [current, pageSize])

    const fetchListUser = async (searchData) => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (searchData) {
            query += `${searchData}`
        }
        const res = await getFetchListUser(query)
        console.log('>>>>res:', res)
        if (res && res.data) {
            setListUser(res.data.result)
            setTotal(res.data.meta.total)
        }
    }

    const handleSearch = (query) => {
        fetchListUser(query)
    }

    return (
        <>
            <InputSearch handleSearch={handleSearch} />
            <Table
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                rowKey='_id'
                pagination={{
                    current: current, pageSize: pageSize, showSizeChanger: true, total: total
                }}
            />
        </>
    )
}

export default UserTable;