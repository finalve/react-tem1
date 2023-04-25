import axios from 'axios';
import authHeader from './authHeader'
const protocal = 'http';
//const base = '192.168.1.9:6080';
const base = '171.7.67.25'

const API_URL = `${protocal}://${base}/api/`;

const imagePath = (img) =>{
    return API_URL + 'photo/'+img
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const login = (data) =>{
    return axios.post(API_URL + 'login', data);
}
const register = (data) =>{
    return axios.post(API_URL + 'register', data);
}

const purchaseItem = (data) => {
    return axios.post(API_URL + 'purchase', data,  { headers: authHeader() });
}

const createProduct = (data) => {
    return axios.post(API_URL + 'create/product', data,  { headers: authHeader() });
}

const createStore = (data) => {
    return axios.post(API_URL + 'create/store', data,  { headers: authHeader() });
}

const createType = (data) => {
    return axios.post(API_URL + 'create/type', data,  { headers: authHeader() });
}

const createPromotion = (data) => {
    return axios.post(API_URL + 'create/promotion', data,  { headers: authHeader() });
}

const update = (data) => {
    return axios.post(API_URL + 'update', data, {headers:authHeader()});
}
const getProducts = () =>{
    return axios.get(API_URL+ 'products', {headers:authHeader()});
}

const getTypes = () =>{
    return axios.get(API_URL+ 'types', {headers:authHeader()});
}
const getUserdata = () =>{
    return axios.get(API_URL+ 'userdata', {headers:authHeader()});
}
const getShop = () =>{
    return axios.get(API_URL+ 'shop');
}
const userService = {createProduct,getProducts,createStore,update,login,register,getCurrentUser,createType,getTypes,getShop,imagePath,purchaseItem,createPromotion,getUserdata};

export default userService;