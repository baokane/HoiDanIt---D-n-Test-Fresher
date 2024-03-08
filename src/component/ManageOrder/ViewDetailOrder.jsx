import { Descriptions, Drawer } from 'antd';

const ViewDetailOrder = (props) => {
    const { open, setOpen, dataViewDetailOrder } = props

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}
            <Drawer title="Chức năng xem chi tiết" onClose={onClose} open={open} width='50%'>
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">aaaa</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>;
            </Drawer>
        </>
    );
};

export default ViewDetailOrder;