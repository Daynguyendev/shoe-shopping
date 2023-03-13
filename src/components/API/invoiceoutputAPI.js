import axiosClient from "./axiosCilent";


const invoiceoutputAPI = {
    getByName(name) {
        const url = `/invoiceoutput/${name}`;
        return axiosClient.get(url);
    },
    getAll() {
        const url = `/invoiceoutput`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/invoiceoutput`;
        return axiosClient.post(url, data);
    },
    getByIdBill(data) {
        const url = `/invoiceoutput/id`;
        return axiosClient.post(url, data);
    },
    checkRate(data, id_khach_hang) {
        const url = `/invoiceoutput/id/${id_khach_hang}`;
        return axiosClient.post(url, data);
    },

};

export default invoiceoutputAPI;
