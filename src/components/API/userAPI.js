import axiosClient from "./axiosCilent";

const userAPI = {
    login(data) {
        const url = `/login`;
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = `/register`;
        return axiosClient.post(url, data);
    },
    getID(data) {
        const url = `/account/id`;
        return axiosClient.post(url, data);
    },

};

export default userAPI;
