import { useEffect, useState } from "react"
import { callDashBoard } from "../../services/api"
import { Card, Col, Row, Statistic } from "antd"
import CountUp from "react-countup"

const DashBoard = () => {
    const [dashBoard, setDashBoard] = useState(0)
    useEffect(() => {
        (async () => {
            const res = await callDashBoard()
            console.log('>>res:', res)
            setDashBoard(res.data)
        })();
    }, [])

    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <Row gutter={20}>
            <Col span={10}>
                <Card style={{ width: 500 }}>
                    <Statistic title="Active Users" value={dashBoard.countUser} formatter={formatter} />
                </Card>
            </Col>
            <Col span={10}>
                <Card style={{ width: 500 }}>
                    <Statistic title="Active Users" value={dashBoard.countOrder} formatter={formatter} />
                </Card>
            </Col>
        </Row>

    )
}

export default DashBoard