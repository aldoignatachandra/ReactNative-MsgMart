import axios from 'axios';

export const getProduct = (item, page, token) => {
    return {
        type: 'GET_PRODUCT',
        payload: axios.get ('http://192.168.100.104:4000/api/product/',{ 
            params: {
                item,
                page
            },
            headers: {"x-access-token":token},
        })
    };
};

export const postProduct = (input, token) => {
    return {
        type: 'POST_PRODUCT',
        payload: axios.post ('http://192.168.100.104:4000/api/product/', input, { headers: {"x-access-token":token} } )
    };
};

export const patchProduct = (input, token) => {
    const id = input.id;
    return {
        type: 'PATCH_PRODUCT',
        payload: axios.put ('http://192.168.100.104:4000/api/product/'+id, input, { headers: {"x-access-token":token} })
    };
};

export const deleteProduct = (input, token) => {
    const id = input.id;
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete ('http://192.168.100.104:4000/api/product/'+id, { headers: {"x-access-token":token} })
    };
};
