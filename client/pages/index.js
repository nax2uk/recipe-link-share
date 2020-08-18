import Layout from '../components/Layout';
import axios from 'axios';
import { API } from '../config';
import Link from 'next/link';

const Home = ({ categories }) => {

    const listCategories = () => categories.map((category, idx) => (
        <Link href="/" key={idx}>
            <a style={{ border: '1px solid black' }} className="bg-light p-3 col-md-4">
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={category.image && category.image.url}
                                alt={category.name}
                                style={{ width: '100px', height: 'auto' }}
                                className="pr-3"
                            />
                        </div>
                        <div className="col-md-8">
                            <h3>{category.name}</h3>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    ))

    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="font-weight-bold">Browse Recipes By Category</h1>
                    <br />
                </div>
            </div>

            <div className="row">{listCategories()}</div>
        </Layout>);
}

Home.getInitialProps = async () => {
    const response = await axios.get(`${API}/category`);
    return {
        categories: response.data
    }
}

export default Home;