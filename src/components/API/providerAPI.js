import axiosClient from "./axiosCilent";

const providerAPI = {
    get() {
        const url = `/provider`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/provider`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/provider`;
        return axiosClient.patch(url, data);
    },
    delete(id_nha_cc) {
        const url = `/provider/${id_nha_cc}`;
        return axiosClient.delete(url);
    }
};

export default providerAPI;
