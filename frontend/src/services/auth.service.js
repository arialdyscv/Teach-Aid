import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = async(username, password) => {
    return  await axios.post(API_URL + "login", {
        username,
        password
        }).then((res) => {
        if(res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
        });
}
const logout = () => {
    localStorage.removeItem("user");

}
const register = async(username, email, password) => {
    return await axios.post(API_URL + "register", {
        username,
        email,
        password
    });
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;
