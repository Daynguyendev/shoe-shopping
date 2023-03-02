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
    remove({ id_sp, id_khach_hang, ten_mau_sac, ten_kich_thuoc }) {
        const url = `/cart/${id_sp}/${id_khach_hang}/${ten_mau_sac}/${ten_kich_thuoc}`;
        return axiosClient.delete(url, id_sp, id_khach_hang, ten_mau_sac, ten_kich_thuoc);
    },
};

export default cartAPI;
