import React, { useRef, useEffect, useState } from 'react'
import styles from './Info.module.css'

interface InfoProps {
  setBtnDistanceFromTop: (newValue: number | null) => void;
  setRenderBtns: (newValue: boolean) => void;
  isDesktop: boolean
}

const Info = ({setBtnDistanceFromTop,setRenderBtns,isDesktop}:InfoProps) => {
  const topPromptElementRef = useRef<HTMLDivElement>(null);
  const [heightTopPrompt, setHeightTopPrompt] = useState(0);
  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [linePosition, setLinePosition] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  const btnComponentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topPromptElementRef.current) {
      setHeightTopPrompt(topPromptElementRef.current.offsetHeight + 15);
    }
    if (contentElementRef.current) {
      setHeightContent(contentElementRef.current.offsetHeight + 40);
    }
    if(lineRef.current)
    {
      lineRef.current.classList.add(styles.animated);
    }

    if (btnComponentRef.current) {
      const rect = btnComponentRef.current.getBoundingClientRect();
      if(rect.bottom + window.scrollY > 0 && isDesktop){
        setBtnDistanceFromTop(rect.bottom + window.scrollY - 9); 
        setRenderBtns(true);
      }
    }
  }, []);


  const updateLinePosition = () => {
    if (lineRef.current) {
      setLinePosition(lineRef.current.getBoundingClientRect().left + lineRef.current.clientWidth);
    }
  };

   // Set an interval to check height periodically
   const interval = setInterval(() => {
    updateLinePosition();
  }, 10);

  const animationDuration = 2 * 1000; 
    const halfwayDuration = animationDuration / 2;

    const timeout = setTimeout(() => {
      setTextVisible(true);
    }, halfwayDuration);

    useEffect(() => {
      if (textVisible) {
        textRef.current.forEach((letter) => {
          if (letter && letter.getBoundingClientRect().right > linePosition) {
            letter.classList.add(styles.visible);
          } else if (letter) {
            letter.classList.remove(styles.visible);
          }
        });
      }
    }, [linePosition, textVisible]);

  const text = "Top Prompts";

  return (
    <>
        <div className="flex flex-row items-start sm:p-4 max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-row items-start ">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer hideOnMobile" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0 cursor-pointer hideOnMobile" style={{marginRight:"0.2rem"}} >
                  
              </div>
              {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span> */}
              <span className="mx-2 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                  01
              </span>
              </div>
              <div
                ref={lineRef}
              className={styles.line}
              style={{
                  height: `${heightTopPrompt}px`
              }}
              />
          </div>
          <div className="ml-4 sm:mt-0" ref={topPromptElementRef}>
              <div className="flex items-start">
                <span className={styles.title}>
                  {text.split("").map((char, index) => (
                    <span
                      key={index}
                      ref={(el) => {
                        textRef.current[index] = el;
                      }}
                      className={styles.hidden}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
          </div>
        </div>

        <div className="flex flex-row items-start sm:p-4 max-w-full sm:max-w-3xl">
          <div className="flex-shrink-0 flex flex-row items-start">
              <div className="flex items-center">
              <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer hideOnMobile" >
                  
              </div>
              <div className="w-5 h-5 mb-1 sm:mb-0  cursor-pointer hideOnMobile" style={{marginRight:"0.2rem"}}>
                  
              </div>
              {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                  
              </span> */}
              <span ref={btnComponentRef} className="mx-2 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                  02
              </span>
              </div>
              <div
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
              <div className="flex items-Start">
                <span style={{marginTop:"-0.1rem",fontSize:"1.375rem",lineHeight:"1.664rem",fontWeight:"400"}}>
                  Vote on the best (and worst) AI trading prompts that you would want to use in Armor Wallet. Connect your wallet to submit prompts and then to vote on other prompts. 20 votes and prompts per wallet.
                </span>
              </div>
          </div>
        </div>
    </>
  )
}

export default Info