import { Button, Result } from 'antd';

const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default NotFound