import axiosClient from "./axiosCilent";

const addresskAPI = {
    get() {
        const url = `/account`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/account`;
        return axiosClient.post(url, data);
    },
};

export default addresskAPI;
