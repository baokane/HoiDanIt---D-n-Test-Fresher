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
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
        },
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        // sorter: true,
        //     // key: 'Avatar',
        // },
        {
            title: 'Action',
            // key: 'fullName',
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

    const [isLoading, setIsLoading] = useState(false)
    const [sortQuery, setSortQuery] = useState('')
    const [filter, setFilter] = useState('')

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }

        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSortQuery(q)
        }
    };

    useEffect(() => {
        fetchListUser()
    }, [current, pageSize, sortQuery, filter])

    const fetchListUser = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`
        if (filter) {
            query += `${filter}`
        }

        if (sortQuery) {
            query += `&${sortQuery}`
        }
        const res = await getFetchListUser(query)
        if (res && res.data) {
            setListUser(res.data.result)
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    const handleSearch = (query) => {
        setFilter(query)
    }

    return (
        <>
            <InputSearch handleSearch={handleSearch} />
            <Table
                loading={isLoading}
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