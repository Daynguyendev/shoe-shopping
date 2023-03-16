import axiosClient from "./axiosCilent";

const addresskAPI = {
    getAddress(id) {
        const url = `/account/address`;
        return axiosClient.post(url, id);
    },
    add(data) {
        const url = `/account`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/account`;
        return axiosClient.patch(url, data);
    },
    delete(id_dia_chi) {
        const url = `/account/${id_dia_chi}`;
        return axiosClient.delete(url);
    }
};

export default addresskAPI;
