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
      
      <div className="flex h-screen hideOnMobile">
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

      <div className="flex-1 flex flex-col gap-4 p-4 hideOnDesktop">

          <div className="flex flex-col justify-center items-center text-center">
            <div className="mt-2">
              <span className="text-5xl font-bold">
                Top Prompts
              </span>
            </div>

            <div className="mt-2">
              <span className="text-lg">
                Vote on the best (and worst) AI trading prompts that you would want to use in Armor Wallet. Connect your wallet to submit a prompt and then to vote on other prompts. 1 vote per wallet.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-24 ">
            <div className="flex items-center justify-center">
              <Walletconnect setWalletAddress={setWalletAddress} />
            </div>
            <div className="flex items-center justify-center">
              <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} />
            </div>
          </div>
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
      
      <Footer/>
      </div>
    </>
  )
}

export default page