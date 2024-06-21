import {useEffect, useState } from 'react';
import Image from 'next/image'
import downArrow from '../assets/prompts/downArrow.png'
import upArrow from '../assets/prompts/upArrow.png'
import { useActiveAccount } from "thirdweb/react";

interface PromptsProps {
    authorsWalletAddress: string | null;
    userWalletAddress :string | null;
    prompt: string | null;
    id: string | null;
    upVoteCount: number | null;
    downVoteCount: number | null;
    didUserVoted:boolean
    fetchPrompts:() =>void;
    baseApiURL: string;
  }

const Prompts = ({authorsWalletAddress,userWalletAddress,prompt,id,upVoteCount,downVoteCount,didUserVoted,fetchPrompts,baseApiURL} : PromptsProps) => {

    const [upVoteSignature, setUpVoteSignature] = useState<String>("");
    const [downVoteSignature, setDownVoteSignature] = useState<String>("");
    const [hasBeenVotedByThisUser, setHasBeenVotedByThisUser] = useState<boolean>(true);

    const activeAccount = useActiveAccount();

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            const halfLength = Math.floor(maxLength / 2);
            const firstHalf = text.substring(0, halfLength);
            const secondHalf = text.substring(text.length - halfLength);
            return firstHalf + '...' + secondHalf;
        }
        return text;
    };

    const signUpVote = () => {
        if(!didUserVoted){
            signVote(true);
        }
    }

    const signDownVote = () =>{
        if(!didUserVoted){
            signVote(false);
        }
    }
    
    const onVoteSigned = async (isUpVote:boolean) => {
        if(isUpVote)
        {
            const res = await fetch(`${baseApiURL}prompts/${id}/vote`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "voteType":"upvote","votedWalletAddress":userWalletAddress}),
              });
          
              const data = await res.json();
              console.log(data);
        }
        else
        {
            const res = await fetch(`${baseApiURL}prompts/${id}/vote`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "voteType":"downvote","votedWalletAddress":userWalletAddress}),
              });
          
              const data = await res.json();
              console.log(data);
        }

        fetchPrompts();
    }

    const signVote = async (isUpVote:boolean) => {    
        if(isUpVote)
        {
            try {
                    const signature = await activeAccount?.signMessage({message:"confirm up vote"});
            
                    console.log("Signature:", signature);
                    if(signature)
                    {
                        setUpVoteSignature(signature?.toString());
                    }
      
                } 
            catch (error) 
                {
                    console.error("Error signing message:", error);
                }
        }
        else
        {
            try {
                const signature = await activeAccount?.signMessage({message:"confirm down vote"});
        
                console.log("Signature:", signature);
                if(signature)
                {
                    setDownVoteSignature(signature?.toString());
                }
  
            } 
        catch (error) 
            {
                console.error("Error signing message:", error);
            }
        }
      }

      useEffect(() => {
        if (upVoteSignature != "") {
            onVoteSigned(true);
            setUpVoteSignature("");
        }
        if (downVoteSignature != "") {
            onVoteSigned(false);
            setDownVoteSignature("");
        }
    }, [upVoteSignature,downVoteSignature]);


  return (
       <div className="flex flex-col sm:flex-row items-start p-4 max-w-full sm:max-w-3xl">
        <div className="flex-shrink-0 flex flex-col sm:flex-row items-start">
            <div className="flex items-center">
            <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" onClick={signUpVote}>
                <Image src={upArrow} alt="Up arrow" layout="responsive" />
            </div>
            <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" onClick={signDownVote}>
                <Image src={downArrow} alt="Down arrow" layout="responsive" />
            </div>
            <span className="font-bold mx-2 sm:mx-0 sm:ml-2" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                {upVoteCount}
            </span>
            <span className="font-bold mx-2 sm:mx-0 sm:ml-2" style={{ width: '40px', display: 'inline-block', textAlign: 'right',color:"#fe195d" }}>
                {downVoteCount}
            </span>
            </div>
            <div
            className="hidden sm:block"
            style={{
                width: '3px',
                height: '14vh',
                backgroundColor: 'black',
                marginTop: '0.5vh',
                marginLeft : '0.5vw'
            }}
            />
        </div>
        <div className="ml-4 mt-2 sm:mt-0">
            <div className="flex items-center">
            <span className="text-gray-500">
                {
                    authorsWalletAddress ? truncateText(authorsWalletAddress,10) : ""
                }
            </span>
            </div>
            <p className="mt-2 text-gray-700">
            {prompt}
            </p>
        </div>
        </div>
  )
}

export default Prompts