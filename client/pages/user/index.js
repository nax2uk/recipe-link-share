import Layout from '../../components/Layout';
import { API } from '../../config';
import { getCookie } from '../../utils/auth';
import axios from 'axios';

const User = ({ user }) => {
    return (
        <Layout>
            <h1>{JSON.stringify(user)}</h1>
        </Layout>

    );
}

User.getInitialProps = async (context) => {
    const token = getCookie('token', context.req);
    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        })
        return { user: response.data }
    } catch (error) {
        if (error.response.status === 401) {
            return { user: 'no user' };
        }
    }
}
export default User;