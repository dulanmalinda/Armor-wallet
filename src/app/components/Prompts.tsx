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
    didUserVoted:boolean
    fetchPrompts:() =>void;
    baseApiURL: string;
  }

const Prompts = ({authorsWalletAddress,userWalletAddress,prompt,id,upVoteCount,downVoteCount,didUserVoted,fetchPrompts,baseApiURL} : PromptsProps) => {

    const [upVoteSignature, setUpVoteSignature] = useState<String>("");
    const [downVoteSignature, setDownVoteSignature] = useState<String>("");

    const contentElementRef = useRef<HTMLDivElement>(null);
    const [heightContent, setHeightContent] = useState(0);

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
        if(!didUserVoted && userWalletAddress){
            signVote(true);
        }
    }

    const signDownVote = () =>{
        if(!didUserVoted && userWalletAddress){
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

    useEffect(() => {
        if (contentElementRef.current) {
          setHeightContent(contentElementRef.current.offsetHeight + 30);
        }
      }, []);


  return (
       <div className="flex flex-col sm:flex-row items-start p-4 max-w-full sm:max-w-3xl">
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start">

                <div className="flex items-center hideOnMobile">
                    <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                        
                    </div>
                    <div className="w-5 h-5 mb-1 sm:mb-0 cursor-pointer" style={{marginRight:"0.2rem"}} >
                        <button className="w-5 h-5 mb-1 sm:mb-0 cursor-pointer" onClick={signUpVote} style={{marginRight:"0.2rem"}}>
                            <Image src={upArrowBlack} alt="Down arrow" layout="responsive" className={(didUserVoted || !userWalletAddress) ? 'opacity-50' : ''}/>
                        </button>
                        <button className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" onClick={signDownVote}>
                            <Image src={downArrowBlack} alt="Up arrow" layout="responsive" className={(didUserVoted || !userWalletAddress) ? 'opacity-50' : ''}/>
                        </button>
                    </div>
                    {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                        
                    </span> */}
                    <span className="mx-1 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',fontSize:"1rem",fontWeight:"900"}}>
                        {upVoteCount}
                    </span>
                </div>

                <div className="flex items-center hideOnDesktop">
                    <button className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" onClick={signDownVote}>
                        <Image src={downArrowBlack} alt="Up arrow" layout="responsive" className={(didUserVoted || !userWalletAddress) ? 'opacity-50' : ''}/>
                    </button>
                    <button className="w-5 h-5 mb-1 sm:mb-0 cursor-pointer" onClick={signUpVote} style={{marginRight:"0.2rem"}}>
                        <Image src={upArrowBlack} alt="Down arrow" layout="responsive" className={(didUserVoted || !userWalletAddress) ? 'opacity-50' : ''}/>
                    </button>
                    <span className="mx-1 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',fontSize:"1rem",fontWeight:"900"}}>
                        {upVoteCount}
                    </span>
                    {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2" style={{ width: '40px', display: 'inline-block', textAlign: 'right',color:"#fe195d" }}>
                        {downVoteCount}
                    </span> */}
                </div>

                <div
                className="hidden sm:block"
                style={{
                    width: '2px',
                    height: `${heightContent}px`,
                    backgroundColor: 'black',
                    marginTop: '0.5vh',
                    marginLeft : '0.5vw'
                }}
                />
            </div>
            <div className="ml-4 mt-2 sm:mt-0" ref={contentElementRef}>
                <div className="flex items-center">
                <span style={{fontSize:"1rem",fontWeight:"400"}}>
                    {
                        authorsWalletAddress ? truncateText(authorsWalletAddress,10) : ""
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