'use client'

import { useRef, useEffect, useState } from 'react';
import Popup from '../components/PromptPopup';

interface WritepromptProps {
  walletAddress: string | null;
  fetchPrompts:() =>void;
  bsaeApiURL:string;
}

const Writeprompt = ({walletAddress,fetchPrompts,bsaeApiURL} : WritepromptProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptSubmittedOnce, setPromptSubmittedOnce] = useState<boolean>(true);

  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

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

    useEffect(() => {
      if (contentElementRef.current) {
        setHeightContent(contentElementRef.current.offsetHeight + 20);
      }
    }, []);

    return (
      <>
      <div className="flex flex-col sm:flex-row items-start max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start hideOnMobile">
              <div
              style={{
                  width: '2px',
                  height: `${heightContent}px`,
                  backgroundColor: 'black',
                  marginTop: '0.5vh',
                  marginLeft : '0.5vw',
              }}
              />
          </div>
          <div className="ml-4 mt-2 sm:mt-0" ref={contentElementRef}>
            <div className="flex items-center mb-3">
              <span style={{fontSize:"1rem",fontWeight:"400"}}>
                Submit a Prompt
              </span>
            </div>

            <button onClick={togglePopUp} className="bg-[#BDFF6A] text-white font-bold py-2 px-4 rounded pl-20 pr-20  disabled:bg-opacity-50" disabled={!walletAddress || promptSubmittedOnce}>
              <span> + </span>
            </button>
          </div>
        </div>

        <div className="items-center">
          <Popup isOpen={showPopup} onClose={togglePopUp} walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={bsaeApiURL}/>
        </div>
      </>
      )
  }

export default Writeprompt