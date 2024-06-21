import React from 'react'

const Info = () => {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start p-4 max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-start hideOnMobile">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span>
              <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  01
              </span>
              </div>
              <div
              style={{
                  width: '3px',
                  height: '10vh',
                  backgroundColor: 'black',
                  marginTop: '0.5vh',
                  marginLeft : '0.5vw'
              }}
              />
          </div>
          <div className="ml-4 mt-2 sm:mt-0">
              <div className="flex items-Start">
                <span className="text-5xl font-bold">
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
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                  
              </div>
              <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span>
              <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  02
              </span>
              </div>
              <div
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
              <div className="flex items-Start">
                <span className="text-lg">
                  Vote on the best (and worst) AI trading prompts that you would want to use in Armor Wallet. Connect your wallet to submit a prompt and then to vote on other prompts. 1 vote per wallet.
                </span>
              </div>
          </div>
        </div>
    </>
  )
}

export default Info