import React, { useRef, useEffect, useState } from 'react'

const Info = () => {
  const topPromptElementRef = useRef<HTMLDivElement>(null);
  const [heightTopPrompt, setHeightTopPrompt] = useState(0);
  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  useEffect(() => {
    if (topPromptElementRef.current) {
      setHeightTopPrompt(topPromptElementRef.current.offsetHeight);
    }
    if (contentElementRef.current) {
      setHeightContent(contentElementRef.current.offsetHeight + 40);
    }
  }, []);

  return (
    <>
        <div className="flex flex-col sm:flex-row items-start p-4 max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start hideOnMobile">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0 cursor-pointer" style={{marginRight:"0.2rem"}} >
                  
              </div>
              {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span> */}
              <span className="mx-2 sm:mx-0 sm:ml-2" style={{ width: '1.875rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                  01
              </span>
              </div>
              <div
              style={{
                  width: '3px',
                  height: `${heightTopPrompt}px`,
                  backgroundColor: 'black',
                  marginTop: '0.5vh',
                  marginLeft : '0.5vw'
              }}
              />
          </div>
          <div className="ml-4 sm:mt-0" ref={topPromptElementRef}>
              <div className="flex items-start">
                <span style={{fontSize:"4.5rem",fontWeight:"400",marginTop:"-1.4rem"}}>
                  Top Prompts
                </span>
              </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start p-4 max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start hideOnMobile">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0  cursor-pointer" style={{marginRight:"0.2rem"}}>
                  
              </div>
              {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span> */}
              <span className="mx-2 sm:mx-0 sm:ml-2" style={{ width: '1.875rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                  02
              </span>
              </div>
              <div
              style={{
                  width: '3px',
                  height: `${heightContent}px`,
                  backgroundColor: 'black',
                  marginTop: '0.5vh',
                  marginLeft : '0.5vw'
              }}
              />
          </div>
          <div className="ml-4 mt-2 sm:mt-0" ref={contentElementRef}>
              <div className="flex items-Start">
                <span style={{marginTop:"-0.1rem",fontSize:"1.375rem",lineHeight:"1.664rem",fontWeight:"400"}}>
                  Vote on the best (and worst) AI trading prompts that you would want to use in Armor Wallet. Connect your wallet to submit a prompt and then to vote on other prompts. 1 vote per wallet.
                </span>
              </div>
          </div>
        </div>
    </>
  )
}

export default Info