import axiosClient from "./axiosCilent";

const checkoutAPI = {
    get() {
        const url = `/bill/checkout`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/bill/checkout`;
        return axiosClient.post(url, data);
    },

};

export default checkoutAPI;
