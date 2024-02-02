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
// xoa het test redux

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin')
  const user = useSelector(state => state.account.user)
  const userRole = user.role
  return (
    <div className='layout-app'>
      {isAdminRoute && userRole === 'ADMIN' && <Header />}
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
      {isAdminRoute && userRole === 'ADMIN' && <Footer />}
    </div>
  )
}

export default function App() {
  const dipatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

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
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
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
    {isAuthenticated === true
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
