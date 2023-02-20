import axiosClient from "./axiosCilent";

const trademarkAPI = {
    get() {
        const url = `/product/trademark`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/trademark`;
        return axiosClient.post(url, data);
    },
};

export default trademarkAPI;
