import axiosClient from "./axiosCilent";

const rateAPI = {
    get() {
        const url = `/product/rate`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/rate`;
        return axiosClient.post(url, data);
    },
    getById(id) {
        const url = `/product/rate/${id}`;
        return axiosClient.get(url, id);
    },
};

export default rateAPI;
