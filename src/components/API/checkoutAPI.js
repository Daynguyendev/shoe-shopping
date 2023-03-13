import axiosClient from "./axiosCilent";

const checkoutAPI = {
    get() {
        const url = `/checkout`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/checkout`;
        return axiosClient.post(url, data);
    },

};

export default checkoutAPI;
