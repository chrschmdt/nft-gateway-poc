import React, { useContext } from 'react';
import DataContext from '../../context/data/dataContext';
import styles from './header.module.css';
import logo from '../../assets/721-gate.png'

const Header = () => {

    const dataContext = useContext(DataContext);

    const { web3, connectWallet } = dataContext;

    const handleClick = () => {
        connectWallet();
    }
  
        return (
            <div className={styles.header}>
                <div className="d-flex flex-row justify-content-center my-auto">
                    <img className={styles.logo} src={logo} alt="logo"/>
                    <span className={styles.title}>NFT Gateway</span>
                </div>
                <div className='d-flex flex-row justify-content-center my-auto'>
                    <span
                        className={`${styles.link} ${web3 === undefined 
                            ? styles.yellowCircle 
                            : styles.greenCircle}`
                        }
                        onClick={handleClick}
                    >
                        Connect{web3 === undefined ? '' : 'ed'}
                    </span>
                </div>
            </div>
        );
    
}

export default Header;
