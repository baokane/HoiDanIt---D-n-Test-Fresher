import React, { useState } from 'react';
import './inputsearch.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import UserTable from './UserTable';

const InputSearch = (props) => {
    const { setCurrent, setPageSize, setFilter, setSortQuery } = props
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let query = "";
        console.log('Success:', values);
        if (values && values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }

        if (values && values.email) {
            query += `&email=/${values.email}/i`
        }

        if (values && values.phone) {
            query += `$phone=/${values.phone}/i`
        }

        if (query) {
            props.handleSearch(query)
        }
    };

    const handleReset = () => {
        form.resetFields()
        setCurrent(1)
        setPageSize(2)
        setSortQuery('')
        setFilter('')
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div className='main'>
                <Form
                    // 
                    form={form}
                    // 
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
                                label="Full Name"
                                name="fullName"
                                rules={[{ required: false, message: 'Please input your username!' }]}
                            >
                                <Input className='input-search_input' />
                            </Form.Item>
                        </div>

                        <div className='input-search_detail'>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: false, message: 'Please input your email!' }]}
                            >
                                <Input className='input-search_input' />
                            </Form.Item>
                        </div>

                        <div className='input-search_detail'>
                            <Form.Item
                                wrapperCol={{ span: 8 }}
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: false, message: 'Please input your phone!' }]}
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
                            <Button>
                                <span onClick={() => handleReset()}>clear</span>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </ >
    )
};

export default InputSearch;
