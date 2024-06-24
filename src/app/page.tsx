'use client'

import Header from './components/Header'
import Prompts from './components/Prompts'
import Footer from './components/Footer'
import Walletconnect from './components/Walletconnect'
import Writeprompt from './components/Writeprompt'
import Info from './components/Info'
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

import { useRef, useEffect, useState } from 'react';

const apiURL = "http://51.158.125.49/api/";

const Page = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<any[]>([]);

  const [userSubmittedPromptCount, setUserSubmittedPromptCount] = useState<number | null>(null);

  const [btnDistanceFromTop, setBtnDistanceFromTop] = useState<number | null>(0);
  const [renderBtns, setRenderBtns] = useState<boolean>(false);

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
    fetch(`${apiURL}getPrompts`)
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
    <div className="flex flex-col min-h-screen inter.variable">
      <Header></Header>
      
      <div className="flex hideOnMobile min-h-screen">
        <div className="flex-custom-1-2 flex justify-end">
          <div style={{position:"absolute",top:`${btnDistanceFromTop}px`}}>
            {
              renderBtns? 
              <Walletconnect setWalletAddress={setWalletAddress} baseApiURL={apiURL} />
              : ''
            }
          </div>
        </div>
        <div className="flex-custom-2-3">
          
          <Info setBtnDistanceFromTop={setBtnDistanceFromTop} setRenderBtns={setRenderBtns} isDesktop={true}/>

          <div className="">
              <div className='w-full'>
                    {prompts.map((prompt, index) => (
                        <Prompts
                            key={index}
                            authorsWalletAddress={prompt.walletAddress}
                            userWalletAddress={walletAddress}
                            prompt={prompt.prompt}
                            id={prompt._id}
                            upVoteCount={prompt.upVoteCount}
                            downVoteCount={prompt.downVoteCount}
                            fetchPrompts={fetchPrompts}
                            didUserVoted={didUserVoted(prompt.votedWallets)}
                            baseApiURL={apiURL}
                        />
                    ))}
              </div>    
          </div>  

        </div>
        <div className="flex-custom-1-2 flex justify-start">
          <div style={{position:"absolute",top:`${btnDistanceFromTop}px`, paddingLeft:"3vw"}}>
            {
              renderBtns?
              <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={apiURL} setUserPromptCount={setUserSubmittedPromptCount} /> 
              :''
            }
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4 hideOnDesktop">

          <Info setBtnDistanceFromTop={setBtnDistanceFromTop} setRenderBtns={setRenderBtns} isDesktop={false}/>

          <div className="grid grid-cols-2 gap-4 h-24 ">
            <div className="flex items-center justify-center">
              <Walletconnect setWalletAddress={setWalletAddress} baseApiURL={apiURL} />
            </div>
            <div className="flex items-center justify-center">
              <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={apiURL} setUserPromptCount={setUserSubmittedPromptCount}/>
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
                              upVoteCount={prompt.upVoteCount}
                              downVoteCount={prompt.downVoteCount}
                              fetchPrompts={fetchPrompts}
                              didUserVoted={didUserVoted(prompt.votedWallets)}
                              baseApiURL = {apiURL}
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

export default Page