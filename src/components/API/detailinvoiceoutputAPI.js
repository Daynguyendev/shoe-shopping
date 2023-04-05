import axiosClient from "./axiosCilent";


const detailinvoiceoutputAPI = {
    async getAllItem(params) {
        const result = await axiosClient.get('/detailinvoiceoutput/query', { params });
        console.log(params);
        return {
            data: result.data.products,
        };
    },
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
