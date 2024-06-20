'use client'

import {SetStateAction, useEffect, useState } from 'react';
import { useActiveAccount } from "thirdweb/react";


interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    walletAddress : string | null;
    fetchPrompts:() =>void;
  }

const PromptPopup = ({ isOpen, onClose,walletAddress ,fetchPrompts}:PopupProps) => {

  const [promptInput, setPromptInput] = useState<string>("");
  const [upVotes, setupVotes] = useState<number>(0);
  const [downVotes, setdownVotes] = useState<number>(0);
  const [signature, setSignature] = useState<String>("");

  const activeAccount = useActiveAccount();

  const onSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/createPrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "walletAddress":walletAddress,"prompt":promptInput, "upVoteCount":upVotes, "downVoteCount":downVotes,"votedWallets":[walletAddress]}),
    });

    const data = await res.json();
    console.log(data);
    setPromptInput('');
    closePopUp();
    fetchPrompts();
  }
  
  const handleSignMessage = async () => {
    if (!promptInput) {
      alert('Please enter a message to sign.');
      return;
    }

    try {
      const signature = await activeAccount?.signMessage({message:"confirm prompt"});

      console.log("Signature:", signature);
      if(signature)
      {
        setSignature(signature?.toString());
      }

    } catch (error) {
      console.error("Error signing message:", error);
    }
  };  

  useEffect(() => {
      if (signature) {
          onSubmit();
      }
  }, [signature]);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPromptInput(event.target.value);
  };

  const closePopUp = () =>{
    setPromptInput('');
    onClose();
  }

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg ">
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
                className="mt-4 mr-4 bg-[#a7ff4b] hover:bg-[#A5EE59] text-white px-4 py-2 rounded "
                onClick={handleSignMessage}
            >
                Submit Your Prompt
            </button>

            <button
                className="mt-4 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded "
                onClick={closePopUp}
            >
                Close
            </button>
          </span>
        </div>
      </div>

    </div>
  )
}

export default PromptPopup