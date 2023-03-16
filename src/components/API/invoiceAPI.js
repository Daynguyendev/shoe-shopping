import axiosClient from "./axiosCilent";


const invoiceAPI = {
    getByName(name) {
        const url = `/invoice/${name}`;
        return axiosClient.get(url);
    },
    getAll() {
        const url = `/invoice`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/invoice`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/invoice`;
        return axiosClient.patch(url, data);
    },
    delete(id_hd_nhap_hang) {
        const url = `/invoice/${id_hd_nhap_hang}`;
        return axiosClient.delete(url);
    }
};

export default invoiceAPI;
