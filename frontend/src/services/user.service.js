import axios from "axios";
import AuthHeader from "./auth-header";

const API_URL = "http://localhost:8080/test/";

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
}
const getUserBoard = () => {
    return axios.get(API_URL + 'user', { headers: AuthHeader() });
}
const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: AuthHeader() });
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
};
  
export default UserService;