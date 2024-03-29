import axiosClient from "./axiosCilent";

const checkoutAPI = {
    get() {
        const url = `/checkout`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/checkout`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/checkout`;
        return axiosClient.patch(url, data);
    },
    delete(id_phuong_thuc_tt) {
        const url = `/checkout/${id_phuong_thuc_tt}`;
        return axiosClient.delete(url);
    },
    addCheckout(data) {
        const url = `/order/create_payment_url`;
        return axiosClient.post(url, data);
    },

};

export default checkoutAPI;
