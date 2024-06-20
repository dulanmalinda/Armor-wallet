'use client'

import { useEffect, useState } from 'react';
import Popup from '../components/PromptPopup';

interface WritepromptProps {
  walletAddress: string | null;
  fetchPrompts:() =>void;
}

const Writeprompt = ({walletAddress,fetchPrompts} : WritepromptProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptSubmittedOnce, setPromptSubmittedOnce] = useState<boolean>(true);

    const togglePopUp  = () =>{
        setShowPopup((prevState) => !prevState);
    }
  
    const checkForExistingPrompts = () => {
      setPromptSubmittedOnce(true)
      fetch(`http://localhost:5000/api/check-wallet?walletAddress=${walletAddress}`)
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
          <div className="mr-2 mb-2 hidden sm:block">Write a Prompt</div>
          <button onClick={togglePopUp} className="bg-[#a7ff4b] hover:bg-[#A5EE59] text-white font-bold py-2 px-4 rounded pl-20 pr-20  disabled:bg-[#ebffd2]" disabled={!walletAddress || promptSubmittedOnce}>
            <span> + </span>
          </button>
          <Popup isOpen={showPopup} onClose={togglePopUp} walletAddress={walletAddress} fetchPrompts={fetchPrompts} />
        </div>
      )
  }

export default Writeprompt