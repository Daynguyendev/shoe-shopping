import axiosClient from "./axiosCilent";

const colorAPI = {
    get() {
        const url = `/product/color`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/color`;
        return axiosClient.post(url, data);
    },
    getName(data) {
        const url = `/product/color/kkk`;
        return axiosClient.get(url, data);
    },
    getById(id) {
        const url = `/product/all/${id}`;
        return axiosClient.get(url, id);
    },
};

export default colorAPI;
