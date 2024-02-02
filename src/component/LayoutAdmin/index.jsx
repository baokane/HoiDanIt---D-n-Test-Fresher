import { Outlet } from "react-router-dom"

const LayoutAdmin = () => {
    return (
        <>
            <div>LayoutAdmin content</div>
            <Outlet />
            <div className="footer-admin">footer content</div>
        </>
    )
}

export default LayoutAdmin