import { SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './header.scss'
import '../../responsive/index.scss'
import { FaReact } from "react-icons/fa";
import { Avatar, Badge, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

// 
import { useState } from 'react';
import { Button, Drawer } from 'antd';

const Header = () => {

    const items = [
        {
            label: 'Quản lý tài khoản',
            key: '0',
        },
        {
            label: 'Đăng xuất',
            key: '1',
        },
    ];

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <header className="header">

            <div className='header_drawer'>
                <Button onClick={showDrawer} className='drawer_icon'>
                    <UnorderedListOutlined />
                </Button>
                <Drawer title="Menu chức năng" onClose={onClose} open={open} placement='left' className='drawer_block'
                    style={{ width: '250px' }}>
                    <p>Quản lý tài khoản</p>
                    <p>Đăng xuất</p>
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
                <Badge count={5} className='header-right_icon'>
                    <ShoppingCartOutlined className='header-right_icon' />
                </Badge>

                <Dropdown menu={{ items }} trigger={['click']} className='header-right_dropdown'>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='header-right_text'>
                            Click me
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header