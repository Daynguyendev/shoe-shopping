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
    update(data) {
        const url = `/category`;
        return axiosClient.patch(url, data);
    },
    delete(id_loai_sp) {
        const url = `/category/${id_loai_sp}`;
        return axiosClient.delete(url);
    }
};

export default categoryAPI;
