import React from 'react';
import './inputsearch.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import UserTable from './UserTable';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const InputSearch = () => (
    <>
        <div className='main'>
            <Form
                className='input-search'
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 8 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='input-search_wrapper'>
                    <div className='input-search_detail'>
                        <Form.Item
                            wrapperCol={{ span: 8 }}
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className='input-search_input' />
                        </Form.Item>
                    </div>

                    <div className='input-search_detail'>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input className='input-search_input' />
                        </Form.Item>
                    </div>

                    <div className='input-search_detail'>
                        <Form.Item
                            wrapperCol={{ span: 8 }}
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input className='input-search_input' />
                        </Form.Item>
                    </div>
                </div>

                <div className='input-search_wrapper-input'>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit">
                            clear
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>


        <UserTable />
    </ >
);

export default InputSearch;
