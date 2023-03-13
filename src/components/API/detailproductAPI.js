import axiosClient from "./axiosCilent";


const DetailProductAPI = {
    getByName(name) {
        const url = `/all`;
        return axiosClient.get(url);
    },
    getById(id) {
        const url = `/all/${id}`;
        return axiosClient.get(url, id);
    },
    getByIdColor(id, color) {
        const url = `/all/${id}/color/${color}`;
        return axiosClient.get(url, id, color);
    },
    getById(id) {
        const url = `/all/${id}`;
        return axiosClient.get(url, id);
    },
    add(data) {
        const url = `/all`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/all`;
        return axiosClient.patch(url, data);
    },
    remove(data) {
        const url = `/all`;
        return axiosClient.delete(url, data);
    },
    getAll() {
        const url = `/all`;
        return axiosClient.get(url);
    },
    UpdateQuantity(data) {
        const url = `/all/quantity`;
        return axiosClient.post(url, data);
    },
    getQuantityCart(data) {
        const url = `/quantitycart/all`;
        return axiosClient.post(url, data);
    },

};

export default DetailProductAPI;
