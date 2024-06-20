'use client'

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Login = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
  
    useEffect(() => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      } else {
        console.log('MetaMask is not installed!');
      }
    }, []);
  
    const connectWallet = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };
  
    const signMessage = async () => {
      if (!message) {
        alert('Please enter a message to sign.');
        return;
      }
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
  
        const signature = (await signer).signMessage(message);
        console.log('Signature:', signature);
        alert(`Message signed: ${signature}`);
        setShowPopup(false);
        setMessage('');
      } catch (error) {
        console.error('Error signing message:', error);
      }
    };

    const onPopUpClose = () =>{
        setShowPopup((prevState) => !prevState);
        setMessage("");
    }

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <button onClick={() => setShowPopup(true)}>Write Prompt</button>
          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Sign a Message</h2>
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Enter your message"
                />
                <button onClick={signMessage}>Sign Message</button>
                <button onClick={() => onPopUpClose()}>Close</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-inner {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          color: black
        }
      `}</style>
    </div>
  );
}

export default Login