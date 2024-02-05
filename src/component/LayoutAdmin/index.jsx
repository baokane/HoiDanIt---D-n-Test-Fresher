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
import { Layout, Menu, Button, theme, message } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { doLogoutAction } from '../../redux/account/accountSlide';
import { useDispatch } from 'react-redux';
import { postLogout } from '../../services/api';

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {

    const items = [
        {
            label: <span >Quản lý tài khoản</span>,
            key: '0',
        },
        {
            label: <span onClick={() => handleLogoutAdmin()}>Đăng xuất</span>,
            key: '1',
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useDispatch()
    const nagivate = useNavigate()

    const handleLogoutAdmin = async () => {
        const res = await postLogout()
        console.log('ress:', res)
        if (res.statusCode === 201) {
            message.success('Đăng xuất tài khoản thành công');
            dispatch(doLogoutAction())
            nagivate('/')
        }
    }

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
                                        onClick: () => { nagivate('/admin/user') }
                                    },
                                ]
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'Manage Books',
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
                                    <span>Click me</span>
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