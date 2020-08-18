import { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../utils/alert';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';

const Add = ({ user, token }) => {
    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        success: '',
        image: '',
        buttonText: 'Add',
    });
    const [imageUploadButtonName, setImageUploadButtonName] = useState('Upload image');

    const { name, content, success, error, image, buttonText, imageUploadText } = state;

    const handleChange = name => e => {

        setState({ ...state, [name]: e.target.value, error: '', success: '' });
    };
    const handleImage = e => {

        let fileInput = false
        if (e.target.files[0]) {
            fileInput = true
        }
        setImageUploadButtonName(e.target.files[0].name);
        if (fileInput) {
            Resizer.imageFileResizer(
                e.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    setState({ ...state, image: uri, success: '', error: '' });
                },
                'base64'
            );
        }

    }
    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Adding' });
        // console.log(...formData);
        try {
            const response = await axios.post(`${API}/category`, { name, content, image }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('CATEGORY ADD RESPONSE', response);
            setImageUploadButtonName('Upload Image')
            setState({
                ...state,
                name: '',
                content: '',
                formData: '',
                buttonText: 'Added',
                success: `${response.data.name} has been added`
            });
        } catch (error) {
            console.log('CATEGORY ADD ERROR', error);
            setState({ ...state, buttonText: 'Add', error: error.response.data.error });
        }
    };

    const addCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <textarea onChange={handleChange('content')} value={content} className="form-control" required />
            </div>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    {imageUploadButtonName}
                    <input
                        onChange={handleImage}
                        type="file"
                        accept="image/*"
                        className="form-control"
                        hidden
                    />
                </label>
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Add category</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {addCategoryForm()}
                </div>
            </div>
        </Layout>
    );
};

export default withAdmin(Add);