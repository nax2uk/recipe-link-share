import { isAuthenticated, logout } from '../utils/auth';
import Head from 'next/head';
import Link from 'next/link';
const Nav = () => {
    const user = isAuthenticated();
    return (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/user/link/add">
                    <a className="nav-link text-dark">Submit a link</a>
                </Link>
            </li>
            {!user &&
                <>
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
                </>
            }

            {user && user.role === 'admin'
                &&
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-dark">{user.name}</a>
                    </Link>
                </li>
            }

            {user && user.role === 'subscriber'
                &&
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-dark">{user.name}</a>
                    </Link>
                </li>
            }
            {user &&
                <li className="nav-item">
                    <a
                        className="nav-link text-dark"
                        onClick={logout}
                    >Logout</a>
                </li>
            }
        </ul>
    );
};
export default Nav;