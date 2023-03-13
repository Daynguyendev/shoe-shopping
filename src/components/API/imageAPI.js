import axiosClient from "./axiosCilent";


const imageAPI = {
    get(id) {
        const url = `/image/detail/${id}`;
        return axiosClient.post(url);
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
