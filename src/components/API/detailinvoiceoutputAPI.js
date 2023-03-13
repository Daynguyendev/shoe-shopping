import axiosClient from "./axiosCilent";


const detailinvoiceoutputAPI = {
    getByName(name) {
        const url = `/detailinvoiceoutput/${name}`;
        return axiosClient.get(url);
    },
    getAll() {
        const url = `/detailinvoiceoutput`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/detailinvoiceoutput`;
        return axiosClient.post(url, data);
    },
    getDetail(data) {
        const url = `/invoiceoutput/detail`;
        return axiosClient.post(url, data);
    },


};

export default detailinvoiceoutputAPI;
