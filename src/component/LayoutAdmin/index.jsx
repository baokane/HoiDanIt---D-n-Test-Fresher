import React, { useState } from 'react';
import './layoutadmin.scss';
import '../../responsive/index.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, message, Avatar } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { doLogoutAction } from '../../redux/account/accountSlide';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/api';

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useDispatch()
    const nagivate = useNavigate()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)

    const handleLogoutAdmin = async () => {
        const res = await postLogout()
        console.log('ress:', res)
        if (res.statusCode === 201) {
            message.success('Đăng xuất tài khoản thành công');
            dispatch(doLogoutAction())
            nagivate('/')
        }
    }

    const items = [
        {
            label: <span >Quản lý tài khoản</span>,
            key: '0',
        },
        {
            label: <span onClick={() => nagivate('/history')}>Lịch sử mua hàng</span>,
            key: '1',
        },
        {
            label: <span onClick={() => handleLogoutAdmin()}>Đăng xuất</span>,
            key: '2',
        },
    ];

    if (user.role === 'ADMIN') {
        items.unshift({
            label: <span onClick={() => nagivate('/')}>Trang chủ</span>,
            key: '3',
        },)
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`

    return (
        <>
            <Layout className='admin__menu'>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Dashboard',

                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Manage Users',

                                children: [
                                    {
                                        key: '5',
                                        icon: <UploadOutlined />,
                                        label: 'CRUD',
                                        onClick: () => { nagivate('user') }
                                    },
                                ]
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'Manage Books',
                                onClick: () => { nagivate('book') }
                            },
                            {
                                key: '4',
                                icon: <UploadOutlined />,
                                label: 'Manage Orders',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer, backgroundColor: '#fafafa', }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Dropdown menu={{ items }} trigger={['click']} className='dropdown_admin'>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {isAuthenticated === true ?
                                        <>
                                            <Avatar icon={<UserOutlined />} src={urlAvatar} />
                                            <span className='dropdown-admin_fullname'>{user.fullName}</span>
                                        </>
                                        :
                                        <span>Tài khoản</span>
                                    }
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            backgroundColor: '#fafafa ',
                            margin: '0'
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutAdmin;