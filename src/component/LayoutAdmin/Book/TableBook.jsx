import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { getListBookWithPaginate } from '../../../services/api';
import moment from 'moment';
import InputSearchBook from './InputSearchBook';
import ViewDetailBook from './ViewDetailBook';
import { ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { GrPowerReset } from "react-icons/gr";
import './TableBook.scss'
import BookModalCreate from '../../../../BookModalCreate';
import ModalCreateBook from './ModalCreateBook';

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

const TableBook = (props) => {
    // const { dataViewBook } = props
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true,
            render: (text, record, index) => {
                // console.log('record:', record)
                return (
                    <a
                        onClick={() => {
                            setDataViewBook(record)
                            setOpenViewModal(true)
                        }}
                    >
                        {record._id}</a>
                )
            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true,
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: true,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,

            render: (updatedAt) => { return (<p>{moment(updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>) },
        },
        {
            title: 'Action',
            dataIndex: '"price"',
            render: () => {
                return (
                    <button>DELETE</button>
                )
            }
        },
    ];

    // const { filterBook } = props
    const [listBook, setListBook] = useState([])

    const [currentBook, setCurrentBook] = useState(1)
    const [pageSizeBook, setPageSizeBook] = useState(2)
    const [totalBook, setTotalBook] = useState(0)

    const [filterBook, setFilterBook] = useState('')
    const [sortBook, setSortBook] = useState('&sort=-updatedAt')

    const [dataViewBook, setDataViewBook] = useState({})
    const [openViewModal, setOpenViewModal] = useState(false)

    const [openModalCreate, setOpenModalCreate] = useState(false)

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
        if (currentBook !== pagination.current) {
            setCurrentBook(pagination.current)
        }
        if (pageSizeBook !== pagination.pageSize) {
            setPageSizeBook(pagination.pageSize)
        }
        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`
            setSortBook(q)
        }
    };

    useEffect(() => {
        fetchListBook()
    }, [currentBook, pageSizeBook, sortBook, filterBook])

    const fetchListBook = async () => {
        let queryBook = `current=${currentBook}&pageSize=${pageSizeBook}`
        if (sortBook) {
            queryBook += `${sortBook}`
        }
        if (filterBook) {
            queryBook += `${filterBook}`
        }
        const res = await getListBookWithPaginate(queryBook)
        console.log('>>> res: ', res)
        if (res && res.data && res.data.result) {
            setListBook(res.data.result)
            setTotalBook(res.data.meta.total)
        }
    }

    const renderHeaderTableBook = () => {
        return (
            <div className='user-table_header'>
                <h3 className='user-table-header_left'>Table List Book</h3>
                <div className='user-table-header_right'>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<ExportOutlined />}
                    // onClick={() => handleExportTable()}
                    >
                        Export
                    </Button>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<ImportOutlined />}
                    // onClick={handleOpenModalImport}
                    >
                        Import
                    </Button>
                    <Button
                        className='user-table-header_button'
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setOpenModalCreate(true)
                        }}
                    >
                        Thêm mới
                    </Button>
                    <Button className='user-table-header_button user-table-header_button-arrow'
                        type="text"
                        icon={<GrPowerReset />}
                    // onClick={() => {
                    //     setCurrent(1)
                    //     setPageSize(2)
                    //     setFilter('')
                    //     setSortQuery('')
                    // }}
                    >

                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <InputSearchBook
                setFilterBook={setFilterBook}
                filterBook={filterBook}
            />
            <Table
                title={renderHeaderTableBook}
                rowKey='_id'
                columns={columns}
                dataSource={listBook}
                onChange={onChange}
                pagination={{ current: currentBook, pageSize: pageSizeBook, total: totalBook, showSizeChanger: true }}
            />
            <ViewDetailBook
                dataViewBook={dataViewBook}
                open={openViewModal}
                setOpen={setOpenViewModal}
            />

            <BookModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchListBook={fetchListBook}
            />

            <ModalCreateBook
                fetchListBook={fetchListBook}
            />
        </>
    )
}

export default TableBook;