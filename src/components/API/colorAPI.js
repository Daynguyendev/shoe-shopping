import axiosClient from "./axiosCilent";

const colorAPI = {
    get() {
        const url = `/product/color`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/color`;
        return axiosClient.post(url, data);
    },
};

export default colorAPI;
