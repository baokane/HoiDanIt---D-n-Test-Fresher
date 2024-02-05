import React from 'react';
// import './index.css';
import { Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        sorter: true,
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

data = data.concat(data).concat(data).concat(data)

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const UserTable = () => <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    pagination={{
        current: 6, pageSize: 5, showSizeChanger: true
    }}
/>;

export default UserTable;