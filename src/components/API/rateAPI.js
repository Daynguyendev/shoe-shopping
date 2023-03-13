import axiosClient from "./axiosCilent";

const rateAPI = {
    get() {
        const url = `/rate`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/rate`;
        return axiosClient.post(url, data);
    },
    getById(id) {
        const url = `/rate/${id}`;
        return axiosClient.get(url, id);
    },
};

export default rateAPI;
