import axiosClient from "./axiosCilent";

const promotionAPI = {
    get() {
        const url = `/promotion/all`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/promotion/add`;
        return axiosClient.post(url, data);
    },
    // removePromotion(data) {
    //     const url = `/promotion/delete`;
    //     return axiosClient.delete(url, data);
    // },
    // updatePromotion(data) {
    //     const url = `/promotion/update`;
    //     return axiosClient.patch(url, data);
    // },
    // addTrademark(data) {
    //     const url = `/promotion/trademark`;
    //     return axiosClient.post(url, data);
    // },
    // addCategory(data) {
    //     const url = `/promotion/category`;
    //     return axiosClient.post(url, data);
    // },
    addIdProduct(data) {
        const url = `/promotion/id`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/promotion`;
        return axiosClient.patch(url, data);
    },
    delete(id_khuyen_mai) {
        const url = `/promotion/${id_khuyen_mai}`;
        return axiosClient.delete(url);
    }
};

export default promotionAPI;
