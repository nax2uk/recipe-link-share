import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';

const Admin = ({ user }) => {
    return (
        <Layout>
            <h1>{JSON.stringify(user)}</h1>
        </Layout>
    );
}
export default withAdmin(Admin);