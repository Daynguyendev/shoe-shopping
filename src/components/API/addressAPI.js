import axiosClient from "./axiosCilent";

const addresskAPI = {
    getAddress(id) {
        const url = `/account/address`;
        return axiosClient.post(url, id);
    },
    add(data) {
        const url = `/account`;
        return axiosClient.post(url, data);
    },
};

export default addresskAPI;
