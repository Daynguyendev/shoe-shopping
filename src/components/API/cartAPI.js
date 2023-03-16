import axiosClient from "./axiosCilent";

const cartAPI = {
    async getAll(id) {
        const url = `/cart/${id}`;
        return axiosClient.post(url);

    },
    getDetail(id) {
        const url = `/cart/${id}`;
        return axiosClient.post(url);

    },
    getAllJoin(id) {
        const url = `/cart/join/${id}`;
        return axiosClient.get(url);

    },
    updateQuantity(data) {
        const url = `/cart/quantity`;
        return axiosClient.patch(url, data);
    },
    updateQuantityButton(data) {
        const url = `/cart/quantitybutton`;
        return axiosClient.patch(url, data);
    },
    add(data) {
        const url = `/cart`;
        return axiosClient.post(url, data);
    },
    remove({ id_sp, id_khach_hang, id_mau_sac, id_kich_thuoc }) {
        const url = `/cart/${id_sp}/${id_khach_hang}/${id_mau_sac}/${id_kich_thuoc}`;
        return axiosClient.delete(url, id_sp, id_khach_hang, id_mau_sac, id_kich_thuoc);
    },
    removeAll({ id_khach_hang }) {
        const url = `/cart/all/${id_khach_hang}}`;
        return axiosClient.delete(url, id_khach_hang);
    },
};

export default cartAPI;
