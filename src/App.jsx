import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlide';
import NotFound from './component/NotFound';
import Loading from './component/Loading'
import AdminPage from './pages/admin';
import ProtectedRoute from './component/ProtectedRoute';
import LayoutAdmin from './component/LayoutAdmin';
import DashBoard from './component/Dashboard'
import UserTable from './component/LayoutAdmin/User/UserTable'
import TableBook from './component/LayoutAdmin/Book/TableBook';
import ViewOrder from './component/Order/ViewOrder';
import './styles/reset.scss'
import OrderHistory from './component/OrderHistory';
import ManageOrder from './component/ManageOrder';
// xoa het test redux

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='layout-app'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}

// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith('/admin')
//   const user = useSelector(state => state.account.user)
//   const userRole = user.role
//   return (
//     <div className='layout-app'>
//       {isAdminRoute && userRole === 'ADMIN' && <Header />}
//       {/* <Header /> */}
//       <Outlet />
//       {/* <Footer /> */}
//       {isAdminRoute && userRole === 'ADMIN' && <Footer />}
//     </div>
//   )
// }

export default function App() {
  const dipatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const isLoading = useSelector(state => state.account.isLoading)
  // isLoading

  const getAccount = async () => {
    if (window.location.pathname === '/login'
      || window.location.pathname === '/register'
      // || window.location.pathname === '/'
    ) return
    const res = await callFetchAccount()
    if (res && res.data) {
      dipatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "/order",
          element:
            <ProtectedRoute>
              <ViewOrder />
            </ProtectedRoute>
        },
        {
          path: "/history",
          element:
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
        },
      ],
    },

    {
      path: "/admin",
      element:
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ,
      errorElement: <NotFound />,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
        },
        {
          path: "dashboard",
          element: <DashBoard />,
        },
        {
          path: "/admin/user",
          element: <UserTable />,
        },
        {
          path: "/admin/book",
          element: <TableBook />,
        },
        {
          path: "/admin/order",
          element: <ManageOrder />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

  ]);

  return (<>
    {isLoading === false
      || window.location.pathname === '/login'
      || window.location.pathname === '/register'
      || window.location.pathname === '/'
      ?
      <RouterProvider router={router} />
      :
      <Loading />
    }
  </>)
}
