import { Row, Col, Rate, Divider, Button } from 'antd';
import './book.scss';
import ImageGallery from 'react-image-gallery';
import { useRef, useState } from 'react';
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import { useDispatch } from 'react-redux';
import orderSlice, { doAddBookAction } from '../../redux/order/orderSlice';

const ViewDetail = (props) => {

    const { dataDetailBook } = props
    const dispatch = useDispatch()

    const images = dataDetailBook.items ?? []

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef(null);

    const [currentQuantity, setCurrentQuantity] = useState(1)

    // const images =
    //     [
    //         {
    //             original: 'https://picsum.photos/id/1018/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1015/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1019/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1018/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1015/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1019/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1018/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1015/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1019/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //             originalClass: "original-image",
    //             thumbnailClass: "thumbnail-image"
    //         },
    //     ];

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }

    const onChange = (value) => {
        console.log('changed', value);
    };

    const handleAddToCart = (quantity, book) => {
        return dispatch(doAddBookAction({
            quantity, _id: book._id, details: book
        }))
    }

    const handleChangeButton = (type) => {
        if (type === 'MINUS') {
            if (currentQuantity <= 1) return
            setCurrentQuantity(currentQuantity - 1)
        }
        if (type === 'PLUS') {
            if (currentQuantity >= +dataDetailBook.quantity) return
            setCurrentQuantity(currentQuantity + 1)
        }
    }

    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value <= +dataDetailBook.quantity) {
                setCurrentQuantity(+value)
            }
        }
    }

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataDetailBook?._id ?
                        <Row gutter={[20, 20]} >
                            <Col md={10} sm={0} xs={0}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    slideOnThumbnailOver={true}  //onHover => auto scroll images
                                    onClick={() => handleOnClickImage()}
                                />
                            </Col>
                            <Col md={14} sm={24}>
                                <Col md={0} sm={24} xs={24}>
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false} //hide play button
                                        showFullscreenButton={false} //hide fullscreen button
                                        renderLeftNav={() => <></>} //left arrow === <> </>
                                        renderRightNav={() => <></>}//right arrow === <> </>
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className='author'>Tác giả: <a href='#'>{dataDetailBook.author}</a> </div>
                                    <div className='title'>{dataDetailBook.mainText}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <span className='sold'>
                                            <Divider type="vertical" />
                                            Đã bán: {dataDetailBook.sold}</span>
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetailBook.price)}
                                        </span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left'>Vận chuyển</span>
                                            <span className='right'>Miễn phí vận chuyển</span>
                                        </div>
                                    </div>
                                    <div className='quantity'>
                                        <span className='left'>Số lượng</span>
                                        <span className='right'>
                                            <button onClick={() => handleChangeButton('MINUS')} ><MinusOutlined /></button>
                                            <input onChange={(e) => handleChangeInput(e.target.value)} value={currentQuantity} />
                                            <button onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart' onClick={() => handleAddToCart(currentQuantity, dataDetailBook)}>
                                            <BsCartPlus className='icon-cart' />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                        <button className='now'>Mua ngay</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        :
                        <BookLoader />

                    }
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={"hardcode"}
            />
        </div>
    )
}

export default ViewDetail;