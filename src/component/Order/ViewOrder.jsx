import { Col, Divider, Empty, InputNumber, Row, Steps } from 'antd';
import './order.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteBookAction, doUpdateBookAction } from '../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import Payment from '../Payment';

const ViewOrder = (props) => {
    const carts = useSelector(state => state.order.carts)

    const [totalPrice, setTotalPrice] = useState(0)
    const [currentSteps, setCurrentSteps] = useState(0)

    const dispatch = useDispatch()
    console.log('carts:', carts)
    const handleChangeInput = (value, book) => {
        console.log('book:', book)
        if (!value || value < 1 || value > book.details.quantity) return
        if (!isNaN(value)) {
            dispatch(doUpdateBookAction({
                quantity: value,
                _id: book._id,
                detail: book?.details
            }))
        }
    }

    const handleDeleteBook = (book) => {
        dispatch(doDeleteBookAction({
            _id: book._id
        }))
    }

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0
            carts.map((item) => {
                return sum += item?.quantity * item?.details?.price
            })
            setTotalPrice(sum)
        } else {
            setTotalPrice(0)
        }

    }, [carts])

    return (
        <div className='order'>
            <Steps
                className='steps'
                size="small"
                current={currentSteps}
                items={[
                    {
                        title: 'Đơn hàng',
                    },
                    {
                        title: 'Đặt hàng',
                    },
                    {
                        title: 'Thanh toán',
                    },
                ]}
            />
            {currentSteps === 0 &&
                <div style={{ background: '#efefef', padding: "20px 0" }}>
                    <div className="order-container" >
                        <Row gutter={[20, 20]}>
                            <Col md={18} xs={24}>
                                {carts && carts.length > 0 && carts.map((book, index) => {
                                    const currentBookPrice = book?.details?.price
                                    return (
                                        <div className='order-book' key={`view${index}`}>
                                            <div className='book-content'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.details?.thumbnail}`} alt='anh' />
                                                <div className='title'>
                                                    {book?.details?.mainText}
                                                </div>
                                                <div className='price'>
                                                    {currentBookPrice} đ
                                                </div>
                                            </div>
                                            <div className='action'>
                                                <div className='quantity'>
                                                    <InputNumber onChange={(value) => handleChangeInput(value, book)} value={book.quantity} />
                                                </div>
                                                <div className='sum' >
                                                    Tổng: {book.quantity * book?.details?.price}
                                                </div>
                                                <DeleteOutlined onClick={() => handleDeleteBook(book)} />
                                            </div>
                                        </div>
                                    )
                                })}
                                {carts.length === 0 &&
                                    <Empty
                                        style={{ backgroundColor: '#fff', paddingBottom: '180px', borderRadius: '5px' }}
                                        description={
                                            <>Không có sản phẩm trong giỏ hàng !</>
                                        }
                                    />
                                }
                            </Col>
                            <Col md={6} xs={24} >
                                <div className='order-sum'>
                                    <div className='calculate'>
                                        <span>Tạm tính</span>
                                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                                    </div>
                                    <Divider style={{ margin: "10px 0" }} />
                                    <div className='calculate'>
                                        <span> Tổng tiền</span>
                                        <span className='sum-final'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                                    </div>
                                    <Divider style={{ margin: "10px 0" }} />
                                    <button onClick={() => setCurrentSteps(1)}>Mua Hàng ({carts.length})</button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
            {currentSteps === 1 &&
                <>
                    <div style={{ background: '#efefef', padding: "20px 0" }}>
                        <div className="order-container" >
                            <Row gutter={[20, 20]}>
                                <Col md={18} xs={24}>
                                    {carts && carts.length > 0 && carts.map((book, index) => {
                                        const currentBookPrice = book?.details?.price
                                        return (
                                            <div className='order-book' key={`view${index}`}>
                                                <div className='book-content'>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.details?.thumbnail}`} alt='anh' />
                                                    <div className='title'>
                                                        {book?.details?.mainText}
                                                    </div>
                                                    <div className='price'>
                                                        {currentBookPrice} đ
                                                    </div>
                                                </div>
                                                <div className='action'>
                                                    <div className='quantity'>
                                                        <InputNumber onChange={(value) => handleChangeInput(value, book)} value={book.quantity} />
                                                    </div>
                                                    <div className='sum' >
                                                        Tổng: {book.quantity * book?.details?.price}
                                                    </div>
                                                    <DeleteOutlined onClick={() => handleDeleteBook(book)} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {carts.length === 0 &&
                                        <Empty
                                            style={{ backgroundColor: '#fff', paddingBottom: '180px', borderRadius: '5px' }}
                                            description={
                                                <>Không có sản phẩm trong giỏ hàng !</>
                                            }
                                        />
                                    }
                                </Col>
                                <Col md={6} xs={24}>
                                    <Payment />
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {carts.length === 0 &&
                        <Empty
                            style={{ backgroundColor: '#fff', padding: '0 0 180px', margin: '15px 0 0', borderRadius: '5px' }}
                            description={
                                <>Không có sản phẩm trong giỏ hàng !</>
                            }
                        />
                    }

                </>
            }
        </div>
    )
}

export default ViewOrder;