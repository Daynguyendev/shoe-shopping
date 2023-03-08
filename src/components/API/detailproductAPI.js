import axiosClient from "./axiosCilent";


const DetailProductAPI = {
    getByName(name) {
        const url = `/product/all`;
        return axiosClient.get(url);
    },
    getById(id) {
        const url = `/product/all/${id}`;
        return axiosClient.get(url, id);
    },
    getByIdColor(id, color) {
        const url = `/product/all/${id}/color/${color}`;
        return axiosClient.get(url, id, color);
    },
    getById(id) {
        const url = `/product/all/${id}`;
        return axiosClient.get(url, id);
    },
    add(data) {
        const url = `/product/all`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/product/all`;
        return axiosClient.patch(url, data);
    },
    remove(data) {
        const url = `/product/all`;
        return axiosClient.delete(url, data);
    },
    getAll() {
        const url = `/product/all`;
        return axiosClient.get(url);
    },
    UpdateQuantity(data) {
        const url = `/product/all/quantity`;
        return axiosClient.post(url, data);
    },
    getQuantityCart(data) {
        const url = `/product/quantitycart/all`;
        return axiosClient.post(url, data);
    },

};

export default DetailProductAPI;
