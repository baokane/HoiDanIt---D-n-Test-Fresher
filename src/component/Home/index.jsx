import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination } from 'antd';
import './home.scss';
import { useEffect, useState } from 'react';
import { getCategoryBook, getListBookWithPaginate } from '../../services/api';
const Home = () => {
    const [listCategory, setListCategory] = useState([])

    const [currentBook, setCurrentBook] = useState(1)
    const [pageSizeBook, setPageSizeBook] = useState(5)
    const [totalBook, setTotalBook] = useState(0)
    const [listBook, setListBook] = useState([])

    const [form] = Form.useForm();

    useEffect(() => {
        fetchListBook()
    }, [currentBook, pageSizeBook,
        // sortBook, filterBook
    ])

    const fetchListBook = async () => {
        let queryBook = `current=${currentBook}&pageSize=${pageSizeBook}`
        // if (sortBook) {
        //     queryBook += `${sortBook}`
        // }
        // if (filterBook) {
        //     queryBook += `${filterBook}`
        // }
        const res = await getListBookWithPaginate(queryBook)
        console.log('>>> res: ', res)
        if (res && res.data && res.data.result) {
            setListBook(res.data.result)
            setTotalBook(res.data.meta.total)
        }
    }

    const handleChangeBookHome = (p, s) => {
        if (p !== currentBook) {
            setCurrentBook(p)
        }
        if (s !== pageSizeBook) {
            setPageSizeBook(s)
            setCurrentBook(1)
        }
    }

    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check handleChangeFilter", changedValues, values)
    }

    const onFinish = (values) => {

    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: '2',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: '3',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: '4',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await getCategoryBook()
            if (res && res.data) {
                setListCategory(res.data)
            }
        })();

    }, [])

    console.log('list book:', listBook)
    return (
        <div className="homepage-container" style={{ maxWidth: 1440, margin: '20px auto 0 auto' }}>
            <Row gutter={[20, 20]}>
                <Col md={4} sm={0} xs={0} style={{ backgroundColor: '#fff', border: '1px solid #dddde3' }}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                        <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
                    </div>
                    <Form
                        onFinish={onFinish}
                        form={form}
                        onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                    >
                        <Form.Item
                            name="category"
                            label="Danh mục sản phẩm"
                            labelCol={{ span: 24 }}
                        >
                            <Checkbox.Group>
                                <Row>
                                    {
                                        listCategory && listCategory.length > 0 &&
                                        listCategory.map((item, index) => {
                                            return (
                                                <Col key={index} span={24} style={{ padding: '7px 0' }}>
                                                    <Checkbox value={item} >
                                                        {item}
                                                    </Checkbox>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Khoảng giá"
                            labelCol={{ span: 24 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <Form.Item name={["range", 'from']}>
                                    <InputNumber
                                        name='from'
                                        min={0}
                                        placeholder="đ TỪ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                                <span >-</span>
                                <Form.Item name={["range", 'to']}>
                                    <InputNumber
                                        name='to'
                                        min={0}
                                        placeholder="đ ĐẾN"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Button onClick={() => form.submit()}
                                    style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                            </div>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Đánh giá"
                            labelCol={{ span: 24 }}
                        >
                            <div>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text"></span>
                            </div>
                            <div>
                                <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col md={20} xs={24} style={{ backgroundColor: '#fff', border: '1px solid #dddde3' }}>
                    <Row>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </Row>
                    <Row className='customize-row'>
                        {listBook && listBook.length > 0 &&
                            listBook.map((item, index) => {
                                return (
                                    <div className="column" key={index}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>{item.mainText}</div>
                                            <div className='price'>
                                                {item.price}
                                                {/* {new Int.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)} */}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>{item.sold}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </Row>
                    <Divider />
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                            current={currentBook}
                            total={totalBook}
                            pageSize={pageSizeBook}
                            responsive
                            onChange={(p, s) => handleChangeBookHome(p, s)}
                            showSizeChanger={false}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home;