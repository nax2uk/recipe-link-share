import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
    const head = () => (
        <Head>
            <link rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossorigin="anonymous" />
        </Head>
    )
    const nav = () => (
        <ul className="nav nav-tabs bg-warning">

            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark" href="/">
                        Home
                </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/login">
                    <a className="nav-link text-dark" href="/login">
                        Login
                </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/register">
                    <a className="nav-link text-dark" href="/register">
                        Register
                </a>
                </Link>
            </li>
        </ul>

    )
    return <>{head()}{nav()}<div className="container py-5">{children}</div></>
}

export default Layout;