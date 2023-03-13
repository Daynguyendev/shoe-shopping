import axiosClient from "./axiosCilent";

const trademarkAPI = {
    get() {
        const url = `/trademark`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/trademark`;
        return axiosClient.post(url, data);
    },
};

export default trademarkAPI;
