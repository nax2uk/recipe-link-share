import { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../utils/alert';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Add = ({ user, token }) => {
    const [state, setState] = useState({
        name: '',
        error: '',
        success: '',
        image: '',
        buttonText: 'Add',
    });
    const [imageUploadButtonName, setImageUploadButtonName] = useState('Upload image');
    const { name, success, error, image, buttonText } = state;
    const [content, setContent] = useState('');

    const handleChange = name => e => {

        setState({ ...state, [name]: e.target.value, error: '', success: '' });
    };
    const handleContent = (e) => {
        setContent(e);
        setState({ ...state, success: '', error: '' });
    }
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

        try {
            const response = await axios.post(`${API}/category`, { name, content, image }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('CATEGORY ADD RESPONSE', response);
            setImageUploadButtonName('Upload Image');
            setContent('');
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
                <ReactQuill
                    className="pb-5 mb-3"
                    style={{ border: '1px solid #666' }}
                    theme="bubble"
                    value={content}
                    onChange={handleContent}
                />
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