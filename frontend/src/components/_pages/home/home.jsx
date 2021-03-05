import React, {Component} from 'react';
import styles from './home.module.css'

class Home extends Component {

    render() {
        return (
            <div className={styles.home}>
                <div className="container-fluid">
                    <div className="row mt-5 mb-3">
                        <div className="col">
                            <div className={!this.props.web3 ? styles.contextBox : 'd-none'}>
                                Please connect a web3 wallet.
                            </div>
                            <div className={this.props.web3 && !this.props.token ? styles.contextBox : 'd-none'}>
                                Please verify that you have one of the desired tokens (default is hashmasks):
                                <span className={styles.verify} onClick={()=>{this.props.verifyFn()}}>Verify</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className={this.props.data.length > 0 ? 'd-none' : styles.contextBox}>
                                This content is locked 🔒
                            </div>
                            <div className={this.props.data.length > 0 ? styles.contextBox : 'd-none'}>
                                🔓 Unlocked content:
                                {this.props.data.map(p => (
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
}

export default Home;
