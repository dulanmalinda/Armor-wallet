'use client'

import Header from './components/Header'
import Prompts from './components/Prompts'
import Footer from './components/Footer'
import Walletconnect from './components/Walletconnect'
import Writeprompt from './components/Writeprompt'
import Info from './components/Info'
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

import { useEffect, useState } from 'react';

const page = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<any[]>([]);

  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const client = createThirdwebClient({
    clientId: "906393bcf3a603cdaf81ad7dbf23fffc",
  });
  
  const fetchPrompts = () => {
    fetch('http://localhost:5000/api/getPrompts')
      .then((response) => response.json())
      .then((data) => {
        setPrompts(data);
      });
  };

  const didUserVoted = (votedWallets:Array<string>) =>{
    for (let e of votedWallets) {
      if (e == walletAddress) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    fetchPrompts();
  },[]);

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header></Header>

      <div className="flex h-screen">
        <div className="flex-custom-1 flex justify-center" style={{marginTop : "10vh"}}>
          <Walletconnect setWalletAddress={setWalletAddress} />
        </div>
        <div className="flex-custom-1-25 p-4 rounded-lg shadow-md overflow-y-scroll hide-scrollbar">
          
          <Info></Info>

          <div className="">
              <div className='w-full'>
                    {prompts.map((prompt, index) => (
                        <Prompts
                            key={index}
                            authorsWalletAddress={prompt.walletAddress}
                            userWalletAddress={walletAddress}
                            prompt={prompt.prompt}
                            id={prompt._id}
                            voteCount={prompt.upVoteCount}
                            fetchPrompts={fetchPrompts}
                            didUserVoted={didUserVoted(prompt.votedWallets)}
                        />
                    ))}
              </div>    
          </div>  

        </div>
        <div className="flex-custom-1 flex justify-center" style={{marginTop : "9vh"}}>
          <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} />
        </div>
      </div>
      
      <Footer/>
      </div>
    </>
  )
}

export default page