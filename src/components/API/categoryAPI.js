import axiosClient from "./axiosCilent";

const categoryAPI = {
    get() {
        const url = `/product/category`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/category`;
        return axiosClient.post(url, data);
    },
};

export default categoryAPI;
