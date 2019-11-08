import axios from 'axios';

export const getCategories = (item, page, token) => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get ('http://192.168.100.104:4000/api/category/',{ 
            params: {
                item,
                page
            },
            headers: {"x-access-token":token},
        })
  };
};

export const postCategories = (input, token) => {
    return {
        type: 'POST_CATEGORIES',
        payload: axios.post ('http://192.168.100.104:4000/api/category/', input, { headers: {"x-access-token":token} } )
  };
};

export const patchCategories = (input, token) => {
    const id = input.id;
    return {
        type: 'PATCH_CATEGORIES',
        payload: axios.put ('http://192.168.100.104:4000/api/category/'+id, input, { headers: {"x-access-token":token} })
    };
};

export const deleteCategories = (input, token) => {
    const id = input.id;
    return {
        type: 'DELETE_CATEGORIES',
        payload: axios.delete ('http://192.168.100.104:4000/api/category/'+id, { headers: {"x-access-token":token} })
    };
};
