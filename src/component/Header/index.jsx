import { SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import './header.scss'
import '../../responsive/index.scss'
import '../../styles/global.scss'
import { FaReact } from "react-icons/fa";
import { Avatar, Badge, Popover, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/api';
import { message } from 'antd';
import { doLogoutAction } from '../../redux/account/accountSlide';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const carts = useSelector(state => state.order.carts)
    const user = useSelector(state => state.account.user)

    const items = [
        {
            label: <span>Quản lý tài khoản</span>,
            key: '0',
        },
        {
            label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
            key: '1',
        },
    ];

    if (user.role === 'ADMIN') {
        items.unshift({
            label: <span onClick={() => nagivate('/admin')}>Trang quản trị</span>,
            key: '2',
        },)
    }

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const nagivate = useNavigate()
    const handleLogout = async () => {
        const res = await postLogout()
        console.log('ress:', res)
        if (res.statusCode === 201) {
            message.success('Đăng xuất tài khoản thành công');
            dispatch(doLogoutAction())
            nagivate('/')
        }
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`

    const text = <span>Sản phẩm mới thêm</span>;
    console.log('catrs:', carts)

    const content = () => {
        return (
            <div className='pop__main'>
                {carts && carts.length > 0 && carts.map((item, index) => {
                    return (
                        <div className='pop__warapper'>
                            <img className='pop__img' src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.details?.thumbnail}`} alt='anh' />
                            <div className='pop__name'>{item?.details?.name}</div>
                            <div className='pop__price'>{item?.details?.price} vnd</div>
                        </div>
                    )
                })}
                <div className='pop__btn'>Xem giỏ hàng</div>
            </div>
        )
    }

    return (
        <header className="header">

            <div className='header_drawer'>
                <Button onClick={showDrawer} className='drawer_icon'>
                    <UnorderedListOutlined />
                </Button>
                <Drawer title="Menu chức năng" onClose={onClose} open={open} placement='left' className='drawer_block'
                    style={{ width: '250px' }}>
                    {/* <p>Quản lý tài khoản</p>
                    <p onClick={() => handleLogoutttt()}>Đăng xuất</p> */}
                </Drawer>
            </div>

            <div className="header-left">
                <FaReact className='icon-react' />
                <div className='header-left_text'>THỰC HÀNH</div>
            </div>
            <div className="header-center">
                <SearchOutlined className='header-center_icon' />
                <input className='header-center_input' placeholder='Bạn tìm gì hôm nay' />
            </div>
            <div className="header-right">

                <Popover placement="bottom" title={text} content={content} className='pop'>
                    <Badge
                        count={carts?.length ?? 0}
                        className='header-right_icon'
                        showZero
                    >
                        <ShoppingCartOutlined className='header-right_icon' />
                    </Badge>
                </Popover>

                <Dropdown menu={{ items }} trigger={['click']} className='header-right_dropdown'>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='header-right_text'>
                            {
                                isAuthenticated === true ? <>
                                    <Avatar icon={<UserOutlined />} src={urlAvatar} />
                                    <span>{user.fullName}</span>
                                </>
                                    :
                                    <span>Tài khoản</span>

                            }
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header