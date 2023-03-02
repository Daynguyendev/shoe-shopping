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
};

export default invoiceAPI;
