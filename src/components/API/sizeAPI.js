import axiosClient from "./axiosCilent";

const sizeAPI = {
    get() {
        const url = `/size`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/size`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/size`;
        return axiosClient.patch(url, data);
    },
    getName(id) {
        const url = `/size/${id}`;
        return axiosClient.get(url);
    },
    delete(id_kich_thuoc) {
        const url = `/size/${id_kich_thuoc}`;
        return axiosClient.delete(url);
    }
};

export default sizeAPI;
