import axios from '../axios';

const AddCartFunc = (data) => {
    return axios.post('/api/add-cart', data);
};

const deleteCartFunc = (cartId) => {
    return axios.delete('/api/delete-cart', {
        data: {
            id: cartId
        }
    });
};

const editCartFunc = (inputData) => {
    return axios.put('/api/edit-cart', inputData);
};

const SaveToOrderFunc = (inputData) => {
    return axios.post('/api/save-to-order', inputData);
};

export { AddCartFunc, deleteCartFunc, editCartFunc, SaveToOrderFunc }