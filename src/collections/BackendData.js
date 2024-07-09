import React, { useState } from 'react';
import axios from 'axios';

function BackendData() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'price') {
            setPrice(value);
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('File uploaded successfully', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    };

    return (
        <form onSubmit={handleFileUpload}>
            <div>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div>
                <input type='text' name='title' placeholder='Title' value={title} onChange={handleInputChange} />
            </div>
            <div>
                <input type='text' name='description' placeholder='Description' value={description} onChange={handleInputChange} />
            </div>
            <div>
                <input type='text' name='price' placeholder='Price' value={price} onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default BackendData;
