import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Stylesheet from './Stylesheet';
import Nav from './Nav';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {

    return (
        <React.Fragment>
            <Stylesheet />
            <Nav />
            <div className="container py-5">{children}</div>
        </React.Fragment>
    );
};

export default Layout;