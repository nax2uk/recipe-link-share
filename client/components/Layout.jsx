import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { isAuthenticated, logout } from '../utils/auth';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/static/css/styles.css" />
        </React.Fragment>
    );

    const nav = () => (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/login">
                    <a className="nav-link text-dark">Login</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/register">
                    <a className="nav-link text-dark">Register</a>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().role === 'admin'
                &&
                <li className="nav-item" ml-auto>
                    <Link href="/admin">
                        <a className="nav-link text-dark">Admin</a>
                    </Link>
                </li>
            }
            <li className="nav-item">
                <a
                    className="nav-link text-dark"
                    onClick={logout}
                >Logout</a>
            </li>
        </ul>
    );

    return (
        <React.Fragment>
            {head()} {nav()} <div className="container py-5">{children}</div>
        </React.Fragment>
    );
};

export default Layout;