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
    changePass(data) {
        const url = `/password`;
        return axiosClient.post(url, data);
    },
    Forgot(data) {
        const url = `/forgot`;
        return axiosClient.post(url, data);
    },
    changePassEMail(data) {
        const url = `/forgotemailtoken`;
        return axiosClient.post(url, data);
    },
    getID(data) {
        const url = `/account/id`;
        return axiosClient.post(url, data);
    },
    getAdmin(data) {
        const url = `/admin/id`;
        return axiosClient.post(url, data);
    },
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },
    getStatistical() {
        const url = `/statistical`;
        return axiosClient.get(url);
    },
    getSale() {
        const url = `/bestsale`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/user`;
        return axiosClient.patch(url, data);
    },
    delete(id_khach_hang) {
        const url = `/user/${id_khach_hang}`;
        return axiosClient.delete(url);
    }

};

export default userAPI;
