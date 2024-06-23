'use client'

import {useRef , useEffect, useState } from 'react';
import { useActiveAccount } from "thirdweb/react";
import ClipLoader from "react-spinners/ClipLoader";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    walletAddress : string | null;
    fetchPrompts:() =>void;
    baseApiURL:string;
  }

const PromptPopup = ({ isOpen, onClose,walletAddress ,fetchPrompts,baseApiURL}:PopupProps) => {

  const [promptInput, setPromptInput] = useState<string>("");
  const [upVotes, setupVotes] = useState<number>(0);
  const [downVotes, setdownVotes] = useState<number>(0);
  const [signature, setSignature] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const activeAccount = useActiveAccount();

  const onSubmit = async () => {
    const res = await fetch(`${baseApiURL}createPrompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "walletAddress":walletAddress,"prompt":promptInput, "upVoteCount":upVotes, "downVoteCount":downVotes,"votedWallets":[walletAddress]}),
    });

    const data = await res.json();
    onClose();
    setLoading(false);
    fetchPrompts();
  }
  
  const handleSignMessage = async () => {
    if (!promptInput) {
      alert('Please enter a message to sign.');
      return;
    }

    setLoading(true);

    try {
      const signature = await activeAccount?.signMessage({message:"confirm prompt"});

      console.log("Signature:", signature);
      if(signature)
      {
        setSignature(signature?.toString());
      }

    } catch (error) {
      console.error("Error signing message:", error);
      setLoading(false);
    }
  };  

  useEffect(() => {
      if (signature) {
          onSubmit();
      }
  }, [signature]);

  useEffect(() => {
    if (isOpen) {
        setIsVisible(true);
    }
}, [isOpen]);

useEffect(() => {
  if (contentElementRef.current) {
    setHeightContent(contentElementRef.current.offsetHeight);
  }
}, []);

  const handleChange = (e: { target: { value: any; }; }) => {
    const input = e.target.value;
    const characterLimit = 1000; 

    if (input.length <= characterLimit) {
      setPromptInput(input);
    } else {
      // alert(`Word limit of ${wordLimit} exceeded`);
    }
  };

  const setPopUpVisibleState = (isopen:boolean) =>{
    if(!isopen)
    {
      setPromptInput('');
      setIsVisible(false);
      setLoading(false);
    }
  }


  return (
    <>
    <div onClick={onClose}>
      <div
        className={`
          fixed inset-0 bg-white bg-opacity-40 backdrop-blur-lg transition-opacity z-10 
          ${isVisible ? 'visible' : 'invisible'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
      </div>

      <div
        className={`${isVisible ? 'visible' : 'invisible'} fixed inset-0 flex items-center justify-center transition-transform transition-opacity duration-300 z-20 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        onTransitionEnd={() => setPopUpVisibleState(isOpen)}
        //onClick={(e) => e.stopPropagation()}  // Prevent click propagation to the background
      >
        <div
                style={{
                    width: '2px',
                    height: `${heightContent}px`,
                    backgroundColor: 'black',
                    marginTop: '0.5vh',
                    marginLeft : '0.5vw',
                }}
          />
        <div className="pl-4" ref={contentElementRef}>
          <h2 className="mb-2" style={{fontSize:"1rem",fontWeight:"500"}} onClick={(e) => e.stopPropagation()}>Input Field</h2>
          
          <textarea onClick={(e) => e.stopPropagation()}
            id="prompt"
            className="w-full py-2 px-3 text-black-700 leading-tight focus:outline-none font-jetbrains-mono"
            style={{height:"20vh",border:"1px solid black",fontSize:"1rem"}}
            placeholder="Type Here"
            onChange={handleChange}
          />

          <span onClick={(e) => e.stopPropagation()}>
            <button
              className="mt-4 mr-4 bg-[#BDFF6A] px-4 py-2 disabled:bg-opacity-50"
              onClick={handleSignMessage}
              style={{ width: '300px', fontSize: "1rem" }}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color={"#ffffff"}
                  loading={loading}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                'Submit Your Prompt'
              )}
            </button>
          </span>
        </div>
      </div>
    </div>
    </>
  )
}

export default PromptPopup