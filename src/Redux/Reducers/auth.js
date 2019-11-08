const initialState = {
    resultsLogin: [],
    resultsRegister: [],
    resultItem: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
};
  
const auth = (state = initialState, action) => {
    switch (action.type) {

        //LOGIN
        case 'LOGIN_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'LOGIN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                resultsLogin: action.payload.data.result,
            };
            
        //REGISTER
        case 'REGISTER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
            case 'REGISTER_REJECTED':
                return {
                    ...state,
                    isLoading: false,
                    isRejected: true,
                };
            case 'REGISTER_FULFILLED':
                return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                resultsRegister: action.payload,
            };
        
        //GET ITEM

        case 'ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
            case 'ITEM_REJECTED':
                return {
                ...state,
                isLoading: false,
                isRejected: true,
                };
            case 'ITEM_FULFILLED':
                return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                resultItem:  JSON.parse(action.payload)
            };

        //DEFAULT STATE
        default:
            return {
                ...state,
            }
    }
};
  
export default auth;