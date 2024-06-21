'use client'

import {SetStateAction, useEffect, useState } from 'react';
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
    console.log(data);
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

      setLoading(false);

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
    <div
        className={`
          fixed inset-0 bg-gray-500 bg-opacity-40 backdrop-blur-lg transition-opacity z-1 transition-opacity duration-300 
          ${isVisible ? 'visible' : 'invisible'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
    </div>

    <div className={`${isVisible ? 'visible' : 'invisible'} absolute inset-0 flex items-center justify-center transition-transform transition-opacity duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} z-2`} onTransitionEnd={() => setPopUpVisibleState(isOpen)}>
        <div className={`bg-white p-8 rounded-lg`}>
          <h2 className="text-lg font-bold mb-4">Input Field</h2>
          
          <input
            className="w-full h-16 px-3 py-2 border rounded-md focus:outline-none focus:border-black-500 overflow-auto"
            type="text"
            placeholder='Type Here'
            value={promptInput}
            onChange={handleChange}
          />

          <span className=''>
            <button
              className="mt-4 mr-4 bg-[#a7ff4b] hover:bg-[#A5EE59] text-white px-4 py-2 rounded disabled:bg-[#CFFF94]"
              onClick={handleSignMessage}
              style={{ width: '200px' }}
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

            <button
              className="mt-4 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </span>
        </div>
      </div>
    
    </>
  )
}

export default PromptPopup