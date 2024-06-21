'use client'

import { useEffect, useState } from 'react';
import Popup from '../components/PromptPopup';

interface WritepromptProps {
  walletAddress: string | null;
  fetchPrompts:() =>void;
  bsaeApiURL:string;
}

const Writeprompt = ({walletAddress,fetchPrompts,bsaeApiURL} : WritepromptProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptSubmittedOnce, setPromptSubmittedOnce] = useState<boolean>(true);

    const togglePopUp  = () =>{
        setShowPopup((prevState) => !prevState);
    }
  
    const checkForExistingPrompts = () => {
      setPromptSubmittedOnce(true)
      fetch(`${bsaeApiURL}check-wallet?walletAddress=${walletAddress}`)
        .then((response) => response.json())
        .then((data) => {
           setPromptSubmittedOnce(data.exists);
        });
    };

    useEffect(() => {
      checkForExistingPrompts();
    }, [walletAddress,showPopup]);


    return (
        <div className="items-center">
          <div className="mr-2 mb-2 hideOnMobile">Write a Prompt</div>
          <button onClick={togglePopUp} className="bg-[#a7ff4b] hover:bg-[#A5EE59] text-white font-bold py-2 px-4 rounded pl-20 pr-20  disabled:bg-[#CFFF94]" disabled={!walletAddress || promptSubmittedOnce}>
            <span> + </span>
          </button>
          <Popup isOpen={showPopup} onClose={togglePopUp} walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={bsaeApiURL}/>
        </div>
      )
  }

export default Writeprompt