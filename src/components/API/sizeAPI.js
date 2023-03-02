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
    getName(id) {
        const url = `/product/size/id`;
        return axiosClient.get(url, id);
    },
};

export default sizeAPI;
