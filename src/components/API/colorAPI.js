import axiosClient from "./axiosCilent";

const colorAPI = {
    get() {
        const url = `/color`;
        return axiosClient.get(url);
    },
    getdetailbyId(id) {
        const url = `/detailcolor/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/color`;
        return axiosClient.post(url, data);
    },
    getName(data) {
        const url = `/color/kkk`;
        return axiosClient.get(url, data);
    },
    getById(id) {
        const url = `/all/${id}`;
        return axiosClient.get(url, id);
    },
};

export default colorAPI;
