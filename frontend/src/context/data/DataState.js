import React, { useReducer } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import DataContext from './dataContext';
import dataReducer from './dataReducer';
import { CONNECT_WALLET, GET_DATA, SET_ACCOUNT, VERIFY_SUCCESS } from '../types';

const DataState = ({ children }) => {
    const initialState = {
        web3: undefined,
        account: undefined,
        token: undefined,
        data: [],
        message: "Only sign this message for NFT Gateway POC."
    }

    const [state, dispatch] = useReducer(dataReducer, initialState);

    const connectWallet = async () => {
        // ethereum injection
        if (window.ethereum) {
            const web3a = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                dispatch({ type: CONNECT_WALLET, payload: web3a})
                web3a.eth.getAccounts().then(accs => {
                    dispatch({ type: SET_ACCOUNT, payload: accs[0]});
                });
            } catch (error) {
                console.error(error);
            }
        }
        // legacy
        else if (window.web3) {
            const web3a = window.web3;
            dispatch({ type: CONNECT_WALLET, payload: web3a})
            web3a.eth.getAccounts().then(accs => {
                dispatch({ type: SET_ACCOUNT, payload: accs[0]});
            });
        }
        // user has no wallet
        else alert("Please connect a web3 wallet! Visit metamask.io 🦊");
    };

    const verifyNFT = () => {
        // have the user sign our message
        initialState.web3.eth.personal.sign(initialState.web3.utils.toHex(this.message), initialState.account)
            .then(signature => {
                // send signature and address to api
                axios.post('http://localhost:3005/api/verify',
                    {signature: signature, address: initialState.account})
                    .then(r => {
                        // store token
                        if (r.status === 200) dispatch({ type: VERIFY_SUCCESS , payload: r.data });
                        fetchData();
                    }).catch(e => alert(e.response ? e.response.data : e.toString()));
            });
    };

    const fetchData = async () => {
        // can only fetch data with valid token
        if (initialState.token === undefined)
            return console.log("Cannot fetch data without valid token.");
        // fetch data
        let res = {};

        try {
            res = await axios.get('http://localhost:3005/api/data', {headers: {'Authorization': `Bearer ${initialState.token}`}})
            dispatch({ type: GET_DATA, payload: res })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DataContext.Provider value={{
            web3: state.web3,
            account: state.account,
            token: state.token,
            data: state.data,
            message: state.message,
            fetchData,
            verifyNFT,
            connectWallet
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataState;
