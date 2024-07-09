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

import usePolling from './components/CustomHooks/usePolling';

const apiURL = "https://prompt.armorwallet.ai/api/";

interface Prompt {
  walletAddress: string;
  prompt: string;
  upVoteCount: number;
  downVoteCount: number;
  upVotedWallets: string[];
  downVotedWallets: string[];
}

const Page = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<any[]>([]);

  const [userSubmittedPromptCount, setUserSubmittedPromptCount] = useState<number | null>(null);
  const [votedCount, setvotedCount] = useState<number>(0);

  const [btnDistanceFromTop, setBtnDistanceFromTop] = useState<number | null>(0);
  const [renderBtns, setRenderBtns] = useState<boolean>(false);

  const { data, loading, error } = usePolling(`${apiURL}getPrompts`, 10000);

  const referenceElement = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState<number>(0);
  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const client = createThirdwebClient({
    clientId: "906393bcf3a603cdaf81ad7dbf23fffc",
  });

  const sortPromptsByWallet = (prompts: Prompt[], userwallet: string): Prompt[] => {
    return prompts.sort((a, b) => {
      if (a.walletAddress == userwallet && b.walletAddress != userwallet) {
        return -1;
      }
      if (a.walletAddress != userwallet && b.walletAddress == userwallet) {
        return 1; 
      }
      return 0; 
    });
  };
  
  const fetchPrompts = () => {
    fetch(`${apiURL}getPrompts`)
      .then((response) => response.json())
      .then((data) => {
        if(walletAddress)
        {
          const sortedData = sortPromptsByWallet(data, walletAddress);
          setPrompts(sortedData);
        }
        else
        {
          setPrompts(data);
        }
      });
  };

  const didUserUpVoted = (upVotedWallets:Array<string>) =>{
    for (let e of upVotedWallets) {
      if (e == walletAddress) {
        return true;
      }
    }
    return false;
  }

  const didUserDownVoted = (downVotedWallets:Array<string>) =>{
    for (let e of downVotedWallets) {
      if (e == walletAddress) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    fetchPrompts();
  },[]);

  useEffect(() => {
    if(walletAddress){
      const sortedData = sortPromptsByWallet(prompts, walletAddress);
      setPrompts(sortedData);
    }
    else{
      fetchPrompts();
    }
  },[walletAddress]);


  if (error) {
    console.log(error.message);
  }

  if(data.length > prompts.length)
  {
    fetchPrompts();
  }

  useEffect(() => {
    if (referenceElement.current) {
      const width = referenceElement.current.offsetWidth;
      setDivWidth(width);
    }
  }, [referenceElement]);

  return (
    <>
    <div className="flex flex-col min-h-screen inter.variable">
      <Header minLogoWidth={divWidth}></Header>
      
      <div className="flex hideOnMobile min-h-screen">
        <div className="flex-custom-1-2 flex justify-end " ref={referenceElement}>
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
                            didUserUpVoted={didUserUpVoted(prompt.upVotedWallets)}
                            didUserDownVoted={didUserDownVoted(prompt.downVotedWallets)}
                            userVotedCount={votedCount}
                            setvotedCount={setvotedCount}
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
              <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={apiURL} setUserPromptCount={setUserSubmittedPromptCount} setUserVotedCount={setvotedCount} /> 
              :''
            }
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4 hideOnDesktop">

          <Info setBtnDistanceFromTop={setBtnDistanceFromTop} setRenderBtns={setRenderBtns} isDesktop={false}/>

          <Walletconnect setWalletAddress={setWalletAddress} baseApiURL={apiURL} />
          
          <Writeprompt walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={apiURL} setUserPromptCount={setUserSubmittedPromptCount} setUserVotedCount={setvotedCount}/>
            
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
                              didUserUpVoted={didUserUpVoted(prompt.upVotedWallets)}
                              didUserDownVoted={didUserDownVoted(prompt.downVotedWallets)}
                              userVotedCount={votedCount}
                              setvotedCount={setvotedCount}
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