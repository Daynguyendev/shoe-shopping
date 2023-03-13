import axiosClient from "./axiosCilent";

const providerAPI = {
    get() {
        const url = `/provider`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/provider`;
        return axiosClient.post(url, data);
    },
};

export default providerAPI;
