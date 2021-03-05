import React, {Component} from 'react';
import styles from './header.module.css';
import logo from '../../assets/721-gate.png'

class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <div className="d-flex flex-row justify-content-center my-auto">
                    <img className={styles.logo} src={logo} alt="logo"/>
                    <span className={styles.title}>NFT Gateway</span>
                </div>
                <div className='d-flex flex-row justify-content-center my-auto'>
                    <span
                        className={`${styles.link} ${this.props.web3 === undefined 
                            ? styles.yellowCircle 
                            : styles.greenCircle}`
                        }
                        onClick={()=>{this.props.connectFn()}}
                    >
                        Connect{this.props.web3 === undefined ? '' : 'ed'}
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;
