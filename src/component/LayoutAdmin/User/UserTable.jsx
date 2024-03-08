import React, { useEffect, useState } from 'react';
import { Button, Table, message, Popconfirm, notification } from 'antd';
import { deleteUserAdmin, getFetchListUser } from '../../../services/api';
import InputSearch from './InputSearch';
import UserViewDetail from './UserViewDetail';
import './UserTable.scss'
import { ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { GrPowerReset } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import UserModalCreate from './UserModalCreate';
import UserImport from './UserImport';
import * as XLSX from 'xlsx'
import UserModalUpdate from './UserModalUpdate';

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

    const [listUser, setListUser] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const [isLoading, setIsLoading] = useState(false)
    const [sortQuery, setSortQuery] = useState('')
    const [filter, setFilter] = useState('')

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState({})

    const [isOpenModalCreateform, setIsOpenModalCreateForm] = useState(false)

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})

    const [isOpenModalImport, setIsOpenModalImport] = useState(false)

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
            const q = sorter.order === 'ascend' ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`
            setSortQuery(q)
        }
    };

    // const handleConfirmDelete = async (userId) => {
    //     const res = await deleteUserAdmin(userId)
    //     console.log('res:', res)
    // }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true,
            render: function (text, record, index) {
                return (
                    <a
                        onClick={() => {
                            setDataViewDetail(record)
                            setOpenViewDetail(true)
                        }}
                    >{record._id}</a>
                )
            }
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
        //     sorter: true,
        //     // key: 'Avatar',
        // },
        {
            title: 'Action',
            // key: 'fullName',
            // dataIndex: 'email',
            // sorter: true,
            render: function (text, record, index) {
                // console.log('rc:', record)
                const confirm = async (e) => {
                    console.log(e);
                    message.success('Click on Yes');
                };

                const cancel = (e) => {
                    console.log(e);
                    message.error('Click on No');
                };

                const handleConfirmDelete = async (userId) => {
                    const res = await deleteUserAdmin(userId)
                    if (res && res.data) {
                        message.success('Xóa người dùng thành công')
                        await fetchListUser()
                        setCurrent(1)
                    } else (
                        notification.error({
                            message: 'Có lỗi xảy ra',
                            description: 'Xóa người dùng thất bại'
                        })
                    )
                }
                return (
                    <>

                        <Popconfirm
                            placement="topLeft"
                            title="Xóa người dùng"
                            description="Chắc chắn xóa người dùng này"
                            onConfirm={() => handleConfirmDelete(record._id)}
                            onCancel={cancel}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <FaRegTrashCan style={{ marginRight: '20px' }} />
                        </Popconfirm>


                        <FaPen onClick={() => {
                            console.log('data update:', record)
                            setIsOpenModalUpdate(true)
                            setDataUpdate(record)
                        }} />
                    </>
                )
            }
        },
    ];

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
            query += `${sortQuery}`
        }
        const res = await getFetchListUser(query)
        console.log('user:', res)
        if (res && res.data) {
            setListUser(res.data.result)
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    const handleSearch = (query) => {
        setFilter(query)
    }

    const handleSubmitFormModalCreate = () => {
        setIsOpenModalCreateForm(true)
    }

    const handleOpenModalImport = () => {
        setIsOpenModalImport(true)
    }

    const handleExportTable = () => {
        if (listUser && listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            console.log('>>>wb:', workbook)
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workbook, "ExportUsers.csv");
        }
    }

    const renderHeader = () => {
        return (
            <div className='user-table_header'>
                <h3 className='user-table-header_left'>Table List Users</h3>
                <div className='user-table-header_right'>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<ExportOutlined />}
                        onClick={() => handleExportTable()}
                    >
                        Export
                    </Button>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<ImportOutlined />}
                        onClick={handleOpenModalImport}
                    >
                        Import
                    </Button>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleSubmitFormModalCreate()}
                    >
                        Thêm mới
                    </Button>
                    <Button className='user-table-header_button user-table-header_button-arrow'
                        type="text"
                        icon={<GrPowerReset />}
                        onClick={() => {
                            setCurrent(1)
                            setPageSize(2)
                            setFilter('')
                            setSortQuery('')
                        }}
                    >

                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className='admin_content'>
            <InputSearch
                handleSearch={handleSearch}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setFilter={setFilter}
                setSortQuery={setSortQuery}
            />
            <Table
                title={renderHeader}
                loading={isLoading}
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                rowKey='_id'
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return <div>{range[0]}-{range[1]} trên {total} rows</div>
                    }
                }}
            />

            <UserViewDetail
                open={openViewDetail}
                setOpen={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
            />

            <UserModalCreate
                setIsModalOpen={setIsOpenModalCreateForm}
                isModalOpen={isOpenModalCreateform}
                fetchListUser={fetchListUser}
                setCurrent={setCurrent}
            />

            <UserImport
                isModalOpen={isOpenModalImport}
                setIsModalOpen={setIsOpenModalImport}
                fetchListUser={fetchListUser}
            />

            <UserModalUpdate
                setIsModalOpen={setIsOpenModalUpdate}
                isModalOpen={isOpenModalUpdate}
                fetchListUser={fetchListUser}
                dataUpdate={dataUpdate}
            />
        </div>
    )
}

export default UserTable;