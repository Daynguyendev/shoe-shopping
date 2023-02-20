import axiosClient from "./axiosCilent";

const sizeAPI = {
    get() {
        const url = `/product/size`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/size`;
        return axiosClient.post(url, data);
    },
};

export default sizeAPI;
