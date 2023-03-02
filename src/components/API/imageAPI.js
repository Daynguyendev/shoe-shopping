import axiosClient from "./axiosCilent";


const imageAPI = {
    get(id) {
        const url = `/product/image/${id}`;
        return axiosClient.get(url);
    },
    getAll() {
        const url = `/product/image`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/product/image`;
        return axiosClient.post(url, data);
    },
};

export default imageAPI;
