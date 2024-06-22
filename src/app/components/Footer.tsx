import React,{useRef , useEffect, useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../assets/footer/logo.png'
import twitterLogo from '../assets/twitter.png'
import tgLogo from '../assets/telegram.png'
import gitLogo from '../assets/github.png'
import mediumLogo from '../assets/medium.png'
import footerLogoFull from '../assets/footer/footer_logo_full.svg'

const Footer = () => {
  const linkElementRef = useRef<HTMLDivElement>(null);
  const [heightLink, setHeightLink] = useState(0);

  const linkMElementRef = useRef<HTMLDivElement>(null);
  const [heightMLink, setHeightMLink] = useState(0);

  useEffect(() => {
    if (linkElementRef.current) {
      setHeightLink(linkElementRef.current.offsetHeight + 30);
    }
    if (linkMElementRef.current) {
      setHeightMLink(linkMElementRef.current.offsetHeight + 30);
    }
  }, []);

  return (
    <footer className="bg-white py-6 " style={{marginTop:"10vw"}}>

      <div className="flex hideOnMobile">
        <div className="flex-custom-1">
          <Image src={footerLogo} alt="Logo" style={{ width: '2.5rem', height: '2.5rem', marginLeft:"10vw"}} className='mr-12'/>
        </div>
        <div className="flex-custom-2-1">

          <div className="flex flex-col sm:flex-row items-start pl-4 pb-4 max-w-full sm:max-w-3xl">
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start ">
                <div className="flex items-center">
                  <div className="w-5 h-5 mb-1 sm:mb-0 mr-2 cursor-pointer" >
                      
                  </div>
                  <div className="h-5 mb-1 sm:mb-0  cursor-pointer" style={{marginRight:"0.2rem"}}>
                      
                  </div>
                  {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                      
                  </span> */}
                  <span className="mx-2 sm:mx-0 sm:ml-2" style={{ width: '3.25rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                      Links
                  </span>
                </div>
                <div
                style={{
                    width: '2px',
                    height: `${heightLink}px`,
                    backgroundColor: 'black',
                    marginTop: '0.6vh',
                    marginLeft : '0.5vw'
                }}
                />
            </div>
            <div className="ml-4 mt-2 sm:mt-0" ref={linkElementRef}>
                <div className="flex items-Start">
                    <div className="ml-1" style={{marginTop:"",fontSize:"1rem",lineHeight:"1.5rem",fontWeight:"600"}}>
                      <ul className="space-y-2">
                        <li><Link href="/features" className="hover:text-gray-900">Features</Link></li>
                        <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
                        <li><Link href="/nfts" className="hover:text-gray-900">Codex NFT</Link></li>
                        <li><Link href="/roadmap" className="hover:text-gray-900">Roadmap</Link></li>
                        <li><Link href="/docs" className="hover:text-gray-900">Docs</Link></li>
                        <li><Link href="/privacy" className="hover:text-gray-900">Terms</Link></li>
                      </ul>
                    </div>
                </div>
            </div>
          </div>

        </div>
        <div className="flex-custom-1-4 flex justify-start" >
          <div className="flex flex-col sm:flex-row items-start pb-4 max-w-full sm:max-w-3xl">

            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start ">
                <span className="" style={{ width: '3.8rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A", fontSize:"1.125rem",fontWeight:"400"}}>
                    Socials
                </span>
              <div
                style={{
                    width: '2px',
                    height: `${heightLink}px`,
                    backgroundColor: 'black',
                    marginTop: '0.6vh',
                    marginLeft : '0.5vw'
                }}
                />
            </div>
            <div className="ml-4 mt-2 sm:mt-0" ref={linkElementRef}>
                <div className="flex items-Start">
                  <div className="mt-2 space-x-4">
                      <Link href="https://twitter.com"><Image src={twitterLogo} alt="Twitter" style={{width:"1.688rem", height:"1.35"}} /></Link>
                      <Link href="https://github.com"><Image src={gitLogo} alt="GitHub" style={{width:"1.688rem", height:"1.35"}} /></Link>
                      <Link href="https://telegram.org"><Image src={tgLogo} alt="Telegram" style={{width:"1.688rem", height:"1.35"}} /></Link>
                      <Link href="https://medium.com"><Image src={mediumLogo} alt="Medium" style={{width:"1.688rem", height:"1.35"}} /></Link>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>

      

      <div className="flex hideOnDesktop">
        <div className="flex-1">
          <Image src={footerLogo} alt="Logo" style={{ width: '3rem', height: '3rem', marginLeft:"4vw"}} className='mr-12'/>
        </div>
        
        <div className="flex-1 ml-8">
          <div className="flex flex-row items-start pb-4 max-w-full">
            <div className="flex-shrink-0 flex flex-row">
              <div
                style={{
                  width: '2px',
                  height: `${heightMLink}px`,
                  backgroundColor: 'black',
                  marginTop: '0.6vh',
                }}
              />
            </div>
            <div className="ml-1" ref={linkMElementRef}>
              <div className="flex items-start">
                <div className="ml-2 mt-1" style={{ fontSize: "0.75rem", lineHeight: "1.5rem", fontWeight: "550" }}>
                  <ul className="space-y-2">
                    <li style={{ display: 'inline-block', fontSize: "1.25rem", fontWeight: "700" }}> Links</li>
                    <li><Link href="/features" className="hover:text-gray-900">Features</Link></li>
                    <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
                    <li><Link href="/nfts" className="hover:text-gray-900">Codex NFT</Link></li>
                    <li><Link href="/roadmap" className="hover:text-gray-900">Roadmap</Link></li>
                    <li><Link href="/docs" className="hover:text-gray-900">Docs</Link></li>
                    <li><Link href="/privacy" className="hover:text-gray-900">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex hideOnDesktop">
        <div className="flex-1 ">
          
        </div>
        
        <div className="flex-1 ml-8">
          <div className="flex flex-row items-start max-w-full">
            <div className="flex-shrink-0 flex flex-row items-start">

              <div
                style={{
                  width: '2px',
                  height: `${heightMLink}px`,
                  backgroundColor: 'black',
                  marginTop: '0.6vh',
                }}
              />
            </div>
            <div className="ml-1" ref={linkMElementRef}>
              <div className="flex items-start">
                <div className="ml-2 mt-1" style={{ fontSize: "0.75rem", lineHeight: "1.5rem", fontWeight: "550" }}>
                  <ul className="space-y-4">
                    <li style={{ display: 'inline-block', fontSize: "1.25rem", fontWeight: "700" }}> Socials</li>
                    <li><Link href="https://twitter.com"><Image src={twitterLogo} alt="Twitter" style={{width:"1.688rem", height:"1.35"}} /></Link></li>
                    <li><Link href="https://github.com"><Image src={gitLogo} alt="GitHub" style={{width:"1.688rem", height:"1.35"}} /></Link></li>
                    <li><Link href="https://telegram.org"><Image src={tgLogo} alt="Telegram" style={{width:"1.688rem", height:"1.35"}} /></Link></li>
                    <li><Link href="https://medium.com"><Image src={mediumLogo} alt="Medium" style={{width:"1.688rem", height:"1.35"}} /></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col items-center justify-center mt-8 mb-1">
        <div className="text-center" style={{fontSize:"0.75rem", color:"#7A7A7A"}}>
          ©2023-2024 0xArmor Ltd. All rights reserved.
        </div>
      </div>

    </footer>
  )
}

export default Footer