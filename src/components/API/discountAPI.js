import axiosClient from "./axiosCilent";

const discountAPI = {
    get() {
        const url = `/product/discount`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/discount`;
        return axiosClient.post(url, data);
    },
};

export default discountAPI;
