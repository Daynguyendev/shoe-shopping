import axiosClient from "./axiosCilent";


const imageAPI = {
    get(id) {
        const url = `/image/detail/${id}`;
        return axiosClient.post(url);
    },
    getAll() {
        const url = `/image`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/image`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/image`;
        return axiosClient.patch(url, data);
    },
    delete(id_anh) {
        const url = `/image/${id_anh}`;
        return axiosClient.delete(url);
    }
};

export default imageAPI;
