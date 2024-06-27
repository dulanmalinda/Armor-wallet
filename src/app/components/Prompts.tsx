import {useRef , useEffect, useState } from 'react';
import Image from 'next/image'
import downArrowBlack from '../assets/prompts/downarrowBlack_prompts.svg'
import upArrowBlack from '../assets/prompts/upnarrowBlack_prompts.svg'
import downArrowRed from '../assets/prompts/downarrowRed_prompts.svg'
import upArrowGreen from '../assets/prompts/uparrowGreen_prompts.svg'
import { useActiveAccount } from "thirdweb/react";

interface PromptsProps {
    authorsWalletAddress: string | null;
    userWalletAddress :string | null;
    prompt: string | null;
    id: string | null;
    upVoteCount: number | null;
    downVoteCount: number | null;
    didUserUpVoted:boolean;
    didUserDownVoted:boolean;
    userVotedCount: number;
    fetchPrompts:() =>void;
    setvotedCount: (newValue: number) => void;
    baseApiURL: string;
  }

const Prompts = ({authorsWalletAddress,userWalletAddress,prompt,id,upVoteCount,downVoteCount,didUserUpVoted,didUserDownVoted,userVotedCount,fetchPrompts,setvotedCount,baseApiURL} : PromptsProps) => {

    const [upVoteSignature, setUpVoteSignature] = useState<String>("");
    const [downVoteSignature, setDownVoteSignature] = useState<String>("");
    const [upVoteRemoveSignature, setUpVoteRemoveSignature] = useState<String>("");
    const [downVoteRemoveSignature, setDownVoteRemoveSignature] = useState<String>("");

    const contentElementRef = useRef<HTMLDivElement>(null);
    const [heightContent, setHeightContent] = useState(0);

    const activeAccount = useActiveAccount();

    const truncateText = (text: string, maxLength: number) => {
        if(text != "My Submission")
        {
            if (text.length > maxLength) {
                const halfLength = Math.floor(maxLength / 2);
                const firstHalf = text.substring(0, halfLength);
                const secondHalf = text.substring(text.length - halfLength);
                return firstHalf + '...' + secondHalf;
            }
        }
        return text;
    };

    const signUpVote = () => {
        if(!didUserUpVoted && !didUserDownVoted && userWalletAddress && userVotedCount < 20 && (userWalletAddress != authorsWalletAddress)){
            signVote(true);
        }
        else if(didUserUpVoted){
            signRemoveVote(true);
        }
    }

    const signDownVote = () =>{
        if(!didUserUpVoted && !didUserDownVoted && userWalletAddress && userVotedCount < 20 && (userWalletAddress != authorsWalletAddress)){
            signVote(false);
        }
        else if(didUserDownVoted){
            signRemoveVote(false);
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
        }

        updateUserVoteCount(true);
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

    const onRemoveVoteSigned = async (isUpVote:boolean) => {
        if(isUpVote)
        {
            const res = await fetch(`${baseApiURL}prompts/${id}/remove-vote`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "voteType":"upvote","votedWalletAddress":userWalletAddress}),
              });
          
              const data = await res.json();
        }
        else
        {
            const res = await fetch(`${baseApiURL}prompts/${id}/remove-vote`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "voteType":"downvote","votedWalletAddress":userWalletAddress}),
              });
          
              const data = await res.json();
        }

        updateUserVoteCount(false);
    }

    const signRemoveVote = async (isUpVote:boolean) => {    
        if(isUpVote)
        {
            try {
                    const signature = await activeAccount?.signMessage({message:"confirm revoke up vote"});
            
                    console.log("Signature:", signature);
                    if(signature)
                    {
                        setUpVoteRemoveSignature(signature?.toString());
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
                const signature = await activeAccount?.signMessage({message:"confirm revoke down vote"});
        
                console.log("Signature:", signature);
                if(signature)
                {
                    setDownVoteRemoveSignature(signature?.toString());
                }
  
            } 
        catch (error) 
            {
                console.error("Error signing message:", error);
            }
        }
      }


      const updateUserVoteCount = async (isIncrement:boolean) => {
        if(isIncrement)
        {
            const res = await fetch(`${baseApiURL}user/increment-vote?walletAddress=${userWalletAddress}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              const data = await res.json();
              setvotedCount(data.voteCount);
        }
        else
        {
            const res = await fetch(`${baseApiURL}user/decrement-vote?walletAddress=${userWalletAddress}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              const data = await res.json();
              setvotedCount(data.voteCount);
        }

        fetchPrompts();
    }

      useEffect(() => {
        if (upVoteRemoveSignature != "") {
            onRemoveVoteSigned(true);
            setUpVoteRemoveSignature("");
        }
        if (downVoteRemoveSignature != "") {
            onRemoveVoteSigned(false);
            setDownVoteRemoveSignature("");
        }
    }, [upVoteRemoveSignature,downVoteRemoveSignature]);

    useEffect(() => {
        if (contentElementRef.current) {
          setHeightContent(contentElementRef.current.offsetHeight + 30);
        }
      }, []);


  return (
       <div className="flex flex-row items-start p-4 max-w-full sm:max-w-3xl">
            <div className="flex-shrink-0 flex flex-row items-start">

                <div className="flex items-center">
                    <div className="w-5 h-5 mb-0 mr-2 cursor-pointer hideOnMobile" >
                        
                    </div>
                    <div className="w-5 h-5 mb-0 " style={{marginRight:"0.2rem"}} >
                        <button className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-0  ${(userWalletAddress == authorsWalletAddress)?'invisible':'cursor-pointer'}`} onClick={signUpVote}>
                            <Image src={didUserUpVoted?upArrowGreen:upArrowBlack} alt="Down arrow" className={(!userWalletAddress) ? 'opacity-50' : ''}/>
                        </button>
                        <button className={`w-5 h-5 mb-0 ${(userWalletAddress == authorsWalletAddress)?'invisible':'cursor-pointer'}`} onClick={signDownVote}>
                            <Image src={didUserDownVoted?downArrowRed:downArrowBlack} alt="Up arrow" className={(!userWalletAddress) ? 'opacity-50' : ''}/>
                        </button>
                    </div>
                    {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                        
                    </span> */}
                    <span className="mx-1 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',fontSize:"1rem",fontWeight:"900"}}>
                        {upVoteCount}
                    </span>
                </div>

                <div
                className=""
                style={{
                    width: '2px',
                    height: `${heightContent}px`,
                    backgroundColor: 'black',
                    marginTop: '0.5vh',
                    marginLeft : '0.5vw'
                }}
                />
            </div>
            <div className="ml-4 mt-0" ref={contentElementRef}>
                <div className="flex items-center">
                <span style={{fontSize:"1rem",fontWeight:"400"}}>
                    {
                        (userWalletAddress != authorsWalletAddress)?
                            (authorsWalletAddress ? truncateText(authorsWalletAddress,10) : ""):
                        "My Submission"
                    }
                </span>
                </div>
                <p className="mt-1 font-jetbrains-mono" style={{fontSize:"1rem",fontWeight:"700"}}>
                {prompt}
                </p>
            </div>
        </div>
  )
}

export default Prompts