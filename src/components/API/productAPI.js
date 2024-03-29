import axiosClient from "./axiosCilent";

const productAPI = {
    async Fillter(params) {
        const result = await axiosClient.get('/products', { params });
        console.log('test truyen params', params);
        return {
            data: result.data.products,
            pagination: result.data.pagination,
        };
    },
    getAll() {
        const url = `/product`;
        return axiosClient.get(url);

    },
    getAllItemSale() {
        const url = `/productsale`;
        return axiosClient.get(url);

    },
    get(id) {
        const url = `/product/detail/${id}`;
        return axiosClient.get(url);
    },
    getItemById(id) {
        const url = `/product/getid/id`;
        return axiosClient.post(url, id);
    },
    update(data) {
        const url = `/product`;
        return axiosClient.patch(url, data);
    },
    add(data) {
        const url = `/product`;
        return axiosClient.post(url, data);
    },
    delete(id_sp) {
        const url = `/product/${id_sp}`;
        return axiosClient.delete(url);
    },
    getName(name) {
        const url = `/product/${name}`;
        return axiosClient.get(url);
    },
    getCategory(name) {
        const url = `/product/category/${name}`;
        return axiosClient.get(url);
    },


};

export default productAPI;
