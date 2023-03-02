import axiosClient from "./axiosCilent";

const productAPI = {
    async getAll() {
        const url = `/product`;
        return axiosClient.get(url);

    },
    get(id) {
        const url = `/product/detail/${id}`;
        return axiosClient.get(url);
    },
    update(id, data) {
        const url = `/products/${id}`;
        return axiosClient.patch(url, data);
    },
    add(data) {
        const url = `/product`;
        return axiosClient.post(url, data);
    },
    delete(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productAPI;
