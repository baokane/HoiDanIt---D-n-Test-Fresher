import React, { useState } from 'react';
import './booktable.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import TableBook from './TableBook';
import ModalViewBook from './ViewDetailBook';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const InputSearchBook = (props) => {
    const { setFilterBook } = props
    const onFinish = (values) => {
        console.log('Success:', values);
        let query = ''
        if (values.mainText) {
            query = `&mainText=/${values.mainText}/i`
        }
        if (values.author) {
            query = `&author=/${values.author}/i`
        }
        if (values.category) {
            query = `&category=/${values.category}/i`
        }
        if (query) {
            setFilterBook(query)
        }
    };
    return (
        <>
            <Form
                className='book'
                name="basic"
                labelCol={{ span: 24 }}
                // wrapperCol={{ span: 6 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='book_wrapper'>
                    <div className='book_item'>
                        <Form.Item
                            className='book_label'
                            label="Tên sách"
                            name="mainText"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className='book_input' />
                        </Form.Item>
                    </div>

                    <div className='book_item'>
                        <Form.Item
                            className='book_label'
                            label="Tác giả"
                            name="author"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input className='book_input' />
                        </Form.Item>
                    </div>

                    <div className='book_item'>
                        <Form.Item
                            className='book_label'
                            label="Thể loại"
                            name="category"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input className='book_input' />
                        </Form.Item>
                    </div>

                </div>

                <div className='book_submit'>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='book-submit_wrapper'>
                        <Button type="primary" htmlType="submit" className='book-btn_search'>
                            Submit
                        </Button>
                        <Button className='book-btn_clear'>
                            Clear
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}

export default InputSearchBook;