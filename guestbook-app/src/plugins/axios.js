import axios from 'axios'

// Initialize axios and set options and correct headers
const AXIOS = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

export default {
    // Get guestbook from backend
    getGuestBook () {
        return AXIOS.get(`/guestbook/`);
    },
    // Post form data to backend
    postForm (form) {
        return AXIOS.post(`/newmessage/`, form);
    },
    // Post ajax call to backend
    postAjax (form) {
        return AXIOS.post(`/ajax/`, form);
    },
    // Send row-id to backend for row-deletion
    deleteRow (id) {
        return AXIOS.get(`/delete/` + id);
    }
};
