'use client'

import { useEffect, useState } from 'react';
import { ConnectButton, darkTheme } from 'thirdweb/react';
import { createWallet} from "thirdweb/wallets";
import { createThirdwebClient,defineChain } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

interface WalletconnectProps {
  setWalletAddress: (newValue: string | null) => void;
}

const Walletconnect = ({ setWalletAddress}: WalletconnectProps) => {
  const [connectedChainId, setConnectedChainId] = useState(0);

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

  return (
    <div className="items-center">
      <ConnectButton 
          client={client} 

          wallets={wallets} 

          theme={darkTheme({
            colors: {
                primaryButtonBg: "#a7ff4b",
                primaryButtonText: "white",
              },
          })}

          onConnect={(wallet) => onConnected(wallet.getAccount()?.address,wallet.getChain()?.id)}

          onDisconnect={onDisconnected}

          autoConnect = {true}

          connectModal={{ 
            size:  "compact",
            showThirdwebBranding:false
          }}

          detailsButton={{
            style: { 
              borderRadius: "10px",
            },
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
  )
}

export default Walletconnect