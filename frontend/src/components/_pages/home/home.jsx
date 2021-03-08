import React, { useContext } from 'react';
import styles from './home.module.css'
import DataContext from '../../../context/data/dataContext';

const Home = (props) => {

    const dataContext = useContext(DataContext)

    const { web3, token, connectWallet, verifyFn, data } = dataContext;

    const handleConnectClick = () => {
        verifyFn();
    }

        return (
            <div className={styles.home}>
                <div className="container-fluid">
                    <div className="row mt-5 mb-3">
                        <div className="col">
                            <div className={!web3 ? styles.contextBox : 'd-none'}>
                                Please connect a web3 wallet.
                            </div>
                            <div className={web3 && !token ? styles.contextBox : 'd-none'}>
                                Please verify that you have one of the desired tokens (default is hashmasks):
                                <span className={styles.verify} onClick={handleConnectClick}>Verify</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className={data.length > 0 ? 'd-none' : styles.contextBox}>
                                This content is locked 🔒
                            </div>
                            <div className={data.length > 0 ? styles.contextBox : 'd-none'}>
                                🔓 Unlocked content:
                                {data.map(p => (
                                    <div className={`${styles.contextBox} my-1`}>
                                        <div><span className={styles.w700}>Name:</span> {p.name}</div>
                                        <div><span className={styles.w700}>Occupation:</span> {p.occupation}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default Home;