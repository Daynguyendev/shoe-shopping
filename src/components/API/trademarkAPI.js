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
    update(data) {
        const url = `/trademark`;
        return axiosClient.patch(url, data);
    },
    delete(id_thuong_hieu) {
        const url = `/trademark/${id_thuong_hieu}`;
        return axiosClient.delete(url);
    }
};

export default trademarkAPI;
