import axiosClient from "./axiosCilent";

const providerAPI = {
    get() {
        const url = `/product/provider`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/provider`;
        return axiosClient.post(url, data);
    },
};

export default providerAPI;
