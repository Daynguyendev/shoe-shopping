import axiosClient from "./axiosCilent";

const categoryAPI = {
    get() {
        const url = `/category`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/category`;
        return axiosClient.post(url, data);
    },
};

export default categoryAPI;
