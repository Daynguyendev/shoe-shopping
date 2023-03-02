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
};

export default invoiceoutputAPI;
