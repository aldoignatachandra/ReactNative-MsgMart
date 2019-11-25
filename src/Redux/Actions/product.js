import axios from 'axios';

export const getProduct = (item, page, token) => {
    return {
        type: 'GET_PRODUCT',
        payload: axios.get ('https://pointofsalesapp.herokuapp.com/api/product/',{ 
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
        payload: axios.post ('https://pointofsalesapp.herokuapp.com/api/product/', input, { headers: {"x-access-token":token} } )
    };
};

export const patchProduct = (input, token) => {
    const id = input.id;
    return {
        type: 'PATCH_PRODUCT',
        payload: axios.put ('https://pointofsalesapp.herokuapp.com/api/product/'+id, input, { headers: {"x-access-token":token} })
    };
};

export const deleteProduct = (input, token) => {
    const id = input.id;
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete ('https://pointofsalesapp.herokuapp.com/api/product/'+id, { headers: {"x-access-token":token} })
    };
};
