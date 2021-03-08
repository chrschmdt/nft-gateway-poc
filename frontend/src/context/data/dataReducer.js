import { CONNECT_WALLET, GET_DATA, SET_ACCOUNT, VERIFY_SUCCESS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload.data
      };
    case VERIFY_SUCCESS: 
      return {
        ...state,
        token: action.payload.token
      }
    case CONNECT_WALLET: 
      return { 
        ...state, 
        web3: action.payload
      }
    case SET_ACCOUNT: 
      return {
        ...state, 
        account: action.payload
      }
    default:
      return state;
  }
};
