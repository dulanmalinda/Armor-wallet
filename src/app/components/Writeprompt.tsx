'use client'

import { useRef, useEffect, useState } from 'react';
import Popup from '../components/PromptPopup';

interface WritepromptProps {
  walletAddress: string | null;
  fetchPrompts:() =>void;
  setUserPromptCount: (newValue: number | null) => void;
  setUserVotedCount: (newValue: number) => void;
  baseApiURL:string;
}

const Writeprompt = ({walletAddress,fetchPrompts,setUserPromptCount,setUserVotedCount,baseApiURL} : WritepromptProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptSubmittedTomax, setpromptSubmittedTomax] = useState<boolean>(true);

  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const contentElementMobileRef = useRef<HTMLDivElement>(null);
  const [heightContentMobile, setHeightContentMobile] = useState(0);

    const togglePopUp  = () =>{
        setShowPopup((prevState) => !prevState);
    }

    const checkForExistingPrompts= () => {
      fetch(`${baseApiURL}user?walletAddress=${walletAddress}`)
        .then((response) => response.json())
        .then((data) => {

            setUserPromptCount(data.promptsCount)
            setUserVotedCount(data.voteCount)

            if(data.promptsCount >= 20) //Here sets the max prompts count
            {
               setpromptSubmittedTomax(true);
            }
            else
            {
              setpromptSubmittedTomax(false);
            }

        });
    };
  

    useEffect(() => {
      if(walletAddress){
        checkForExistingPrompts();
      }
    }, [walletAddress,showPopup]);

    useEffect(() => {
      if (contentElementRef.current) {
        setHeightContent(contentElementRef.current.offsetHeight + 20);
      }
      if (contentElementMobileRef.current) {
        setHeightContentMobile(contentElementMobileRef.current.offsetHeight + 20);
      }
    }, []);

    return (
      <>
      <div className="flex flex-col sm:flex-row items-start max-w-full sm:max-w-3xl hideOnMobile">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start">
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
          <div className="ml-4 mt-2 sm:mt-1" ref={contentElementRef}>
            <div className="flex items-center mb-3">
              <span style={{fontSize:"1rem",fontWeight:"400"}}>
                Submit a Prompt
              </span>
            </div>

            <button onClick={togglePopUp} style={{fontSize:"1.875rem",width:"10.66rem",height:"3rem"}}  className="bg-[#BDFF6A] rounded  disabled:opacity-50"disabled={!walletAddress || promptSubmittedTomax}>
              +
            </button>
          </div>
        </div>

        <div className="flex flex-row items-start p-4 p-4 pt-0 sm:pt-4 max-w-full sm:max-w-3xl hideOnDesktop">
            <div className="flex-shrink-0 flex flex-row items-start">

                <div className="flex items-center">
                    <div className="w-5 h-5 mb-0 mr-2 cursor-pointer hideOnMobile" >
                        
                    </div>
                    <div className="w-5 h-5 mb-0 " style={{marginRight:"0.2rem"}} >

                    </div>
                    {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                        
                    </span> */}
                    <span className="mx-1 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',fontSize:"1rem",fontWeight:"900"}}>
                       
                    </span>
                </div>

                <div
                className=""
                style={{
                    width: '2px',
                    height: `${heightContentMobile}px`,
                    backgroundColor: 'black',
                    marginTop: '0.5vh',
                    marginLeft : '0.5vw'
                }}
                />
            </div>
            <div className="ml-4 mt-0" ref={contentElementMobileRef}>
                <div className="flex items-center">
                <span style={{fontSize:"1rem",fontWeight:"400",marginBottom:"0.8rem"}}>
                  Submit a Prompt
                </span>
                </div>
                  <button onClick={togglePopUp} style={{fontSize:"1.875rem",width:"10.66rem",height:"3rem"}}  className="bg-[#BDFF6A] rounded  disabled:opacity-50"disabled={!walletAddress || promptSubmittedTomax}>
                    +
                  </button>
            </div>
        </div>

        <div className="items-center">
          <Popup isOpen={showPopup} onClose={togglePopUp} walletAddress={walletAddress} fetchPrompts={fetchPrompts} baseApiURL={baseApiURL} />
        </div>
      </>
      )
  }

export default Writeprompt