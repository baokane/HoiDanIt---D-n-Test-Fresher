import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination, Spin } from 'antd';
import './home.scss';
import { useEffect, useState } from 'react';
import { getCategoryBook, getListBookWithPaginate } from '../../services/api';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [listCategory, setListCategory] = useState([])

    const [filterBook, setFilterBook] = useState('')
    const [sortBook, setSortBook] = useState('&sort=-sold')

    const [currentBook, setCurrentBook] = useState(1)
    const [pageSizeBook, setPageSizeBook] = useState(5)
    const [totalBook, setTotalBook] = useState(0)
    const [listBook, setListBook] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const nagivate = useNavigate()

    const [form] = Form.useForm();

    useEffect(() => {
        fetchListBook()
    }, [currentBook, pageSizeBook,
        sortBook, filterBook
    ])

    const fetchListBook = async () => {
        let queryBook = `current=${currentBook}&pageSize=${pageSizeBook}`
        if (sortBook) {
            queryBook += `${sortBook}`
        }
        if (filterBook) {
            queryBook += `${filterBook}`
        }
        setIsloading(true)
        const res = await getListBookWithPaginate(queryBook)
        if (res && res.data && res.data.result) {
            setListBook(res.data.result)
            setTotalBook(res.data.meta.total)
        }
        setIsloading(false)
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
        if (changedValues && changedValues.category && changedValues.category.length > 0) {
            const f = changedValues.category.join(',')
            setFilterBook(`&category=${f}`)
        }
        else {
            setFilterBook('')
        }
    }

    const onFinish = (values) => {
        console.log('values:', values)

        if (values?.range?.from >= 0 && values?.range?.to >= 0 || typeof values.category === 'undefined') {
            let fPrice = `&price>=${values?.range?.from}&price<=${values?.range?.to}`
            if (values?.category?.length) {
                let fBook = values.category.join(',')
                fPrice += `&category=${fBook}`
            }
            setFilterBook(fPrice)
        }
    }

    const onChange = (key) => {
        console.log(key);
        if (sortBook !== key) {
            setSortBook(key)
        }
    };

    const items = [
        {
            key: `&sort=-sold`,
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: `&sort=-createdAt`,
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: `&sort=price`,
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: `&sort=-price`,
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

    const toNonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    let slug = function (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        str = toNonAccentVietnamese(str)

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    const handleRedirectBook = (book) => {
        console.log('book:', book)
        const dataSlug = slug((book.mainText))
        nagivate(`/book/${dataSlug}?id=${book._id}`)
    }

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
                <Col md={20} xs={24} style={{ backgroundColor: '#fff', border: '1px solid #dddde3', borderLeft: 'none' }}>
                    <Spin tip="Loading..." spinning={isLoading}>
                        <Row>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </Row>
                        <Row className='customize-row'>
                            {listBook && listBook.length > 0 &&
                                listBook.map((item, index) => {
                                    return (
                                        <div className="column" key={index} onClick={() => handleRedirectBook(item)}>
                                            <div className='wrapper'>
                                                <div className='thumbnail'>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
                                                </div>
                                                <div className='text'>{item.mainText}</div>
                                                <div className='price'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </div>
                                                <div className='rating'>
                                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                    <span>đã bán {item.sold}</span>
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
                    </Spin>
                </Col>
            </Row>
        </div >
    )
}

export default Home;