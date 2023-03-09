import axiosClient from "./axiosCilent";

const promotionAPI = {
    get() {
        const url = `/product/promotion/all`;
        return axiosClient.get(url);
    },
    addPromotion(data) {
        const url = `/product/promotion/add`;
        return axiosClient.post(url, data);
    },
    removePromotion(data) {
        const url = `/product/promotion/delete`;
        return axiosClient.delete(url, data);
    },
    updatePromotion(data) {
        const url = `/product/promotion/update`;
        return axiosClient.patch(url, data);
    },
    addTrademark(data) {
        const url = `/product/promotion/trademark`;
        return axiosClient.post(url, data);
    },
    addCategory(data) {
        const url = `/product/promotion/category`;
        return axiosClient.post(url, data);
    },
    addIdProduct(data) {
        const url = `/product/promotion/id`;
        return axiosClient.post(url, data);
    },
};

export default promotionAPI;
