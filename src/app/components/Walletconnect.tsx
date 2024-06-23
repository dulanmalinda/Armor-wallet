'use client'

import { useRef, useEffect, useState } from 'react';
import { ConnectButton, darkTheme } from 'thirdweb/react';
import { createWallet} from "thirdweb/wallets";
import { createThirdwebClient,defineChain } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import Image from 'next/image'
import connectCircle from '../assets/connectCircle.png'
import connectTick from '../assets/connectedTick.png'

interface WalletconnectProps {
  setWalletAddress: (newValue: string | null) => void;
}

const Walletconnect = ({ setWalletAddress}: WalletconnectProps) => {
  const [connectedChainId, setConnectedChainId] = useState(0);
  
  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const connectedChain = defineChain(connectedChainId);

  const activeAccount = useActiveAccount();

  const client = createThirdwebClient({
    clientId: "906393bcf3a603cdaf81ad7dbf23fffc",
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

    const onConnected = (addr:string = "",chainId = 0) =>{
        setWalletAddress(addr);
        setConnectedChainId(chainId);
    }

    const onDisconnected = () =>{
      setWalletAddress("");
      setConnectedChainId(0);
  }

    const truncateText = (text: string, maxLength: number) => {
      if (text.length > maxLength) {
          const halfLength = Math.floor(maxLength / 2);
          const firstHalf = text.substring(0, halfLength);
          const secondHalf = text.substring(text.length - halfLength);
          return firstHalf + '...' + secondHalf;
      }
      return text;
  };

  
  useEffect(() => {
    if(activeAccount?.address){
      setWalletAddress(activeAccount?.address);
    }
  }, [activeAccount?.address]);

  useEffect(() => {
    if (contentElementRef.current) {
      setHeightContent(contentElementRef.current.offsetHeight + 20);
    }
  }, []);

  const customRender = () => {
    return (
      <button className='flex' style={{backgroundColor:"#BDFF6A", paddingLeft:"1rem", paddingRight:"1rem",  paddingTop:"1rem",paddingBottom:"1rem",borderRadius:"1px"}}>
        <Image src={connectTick} alt="connected tick" layout="responsive" style={{width:"1.25rem",height:"1.25rem",marginRight:"0.5rem"}} loading='lazy'/>
          {
            activeAccount?.address ? truncateText(activeAccount.address,10) : ""
          }  
      </button>
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start hideOnMobile">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0  cursor-pointer" style={{marginRight:"0.2rem"}}>
                  
              </div>
              {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span> */}
              <span className="mx-2" style={{width:"0.938rem",height:"0.938rem"}}>
                <Image src={connectCircle} alt="connect circle" layout="responsive" loading='lazy'/>
              </span>
              </div>
              <div 
              style={{
                  width: '2px',
                  height: `${heightContent}px`,
                  backgroundColor: 'black',
                  marginTop: '0.5vh',
                  marginLeft : '0.5vw',
                  marginRight:"0.8vw",
              }}
              />
          </div>
          <div className="mt-2 sm:mt-0" ref={contentElementRef}>
            <div className="flex items-center mb-3">
              <span style={{fontSize:"1rem",fontWeight:"400"}}>
                Wallet
              </span>
            </div>
            <ConnectButton
                connectButton={{
                  label: "Connect Wallet",
                  className: "",
                  style: {
                    borderRadius: "1px",
                    backgroundColor: "transparent",
                    outline: "1px solid black"
                  },
                }}
                
                client={client} 

                wallets={wallets} 

                theme={darkTheme({
                  colors: {
                      primaryButtonBg: "#BDFF6A",
                      primaryButtonText: "black",
                    }
                })}

                onConnect={(wallet) => onConnected(wallet.getAccount()?.address,wallet.getChain()?.id)}

                onDisconnect={onDisconnected}

                autoConnect = {{timeout : 20000}}

                connectModal={{ 
                  size:  "compact",
                  showThirdwebBranding:false
                }}

                detailsButton={{
                  style: { 
                    borderRadius: "1px",
                    backgroundColor: "#BDFF6A",
                    color:"black"
                  },
                  render: customRender
                }}
                
                detailsModal={{
                  payOptions:{
                    buyWithCrypto: false,
                    buyWithFiat:false,
                    prefillBuy: {
                      allowEdits: { amount: true, chain: false, token: false },
                      chain: connectedChain,
                    },
                  }
                }}
            />
          </div>
        </div>
    </>
  )
}

export default Walletconnect