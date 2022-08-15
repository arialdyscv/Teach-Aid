import axios from "axios";
import AuthHeader from "./auth-header";

const API_URL = "http://localhost:8080/data/";


const getPublicContent = () => {
    return axios.get(API_URL + 'all');
}
const getUserBoard = async() => {
    return await axios.get(API_URL + 'students', { headers: AuthHeader() });
}


const UserService = {
    getPublicContent,
    getUserBoard,
};
  
export default UserService;