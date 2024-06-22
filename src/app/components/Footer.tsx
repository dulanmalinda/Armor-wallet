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
  const contentElementRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  useEffect(() => {
    if (contentElementRef.current) {
      setHeightContent(contentElementRef.current.offsetHeight + 40);
    }
  }, []);

  return (
    <footer className="bg-white py-6">

      
      

      <div className="container mx-auto flex justify-between items-start hideOnMobile">
        <div className="flex items-start ml-6">
          <Image src={footerLogo} alt="Logo" width={40} height={40} className='mr-12'/>
          <p className="text-gray-600 mr-1">Links</p>

          <div style={{
            width: "3px",
            height: "18vh",
            backgroundColor: "black",
            marginTop: "0.5vh"
          }} />

          <div className="ml-4">
            <ul className="space-y-2">
              <li><Link href="/features" className="font-bold hover:text-gray-900">Features</Link></li>
              <li><Link href="/about" className="font-bold hover:text-gray-900">About</Link></li>
              <li><Link href="/nfts" className="font-bold hover:text-gray-900">NFTs</Link></li>
              <li><Link href="/docs" className="font-bold hover:text-gray-900">Docs</Link></li>
              <li><Link href="/privacy" className="font-bold hover:text-gray-900">Privacy Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-right flex mr-6">
          <p className="text-gray-600 mr-1">Socials</p>

          <div style={{
            width: "3px",
            height: "18vh",
            backgroundColor: "black",
            marginTop: "0.5vh"
          }} />

          <div className="ml-4">
            <div className="mt-2 space-x-4">
              <Link href="https://twitter.com"><Image src={twitterLogo} alt="Twitter" width={24} height={24} /></Link>
              <Link href="https://github.com"><Image src={gitLogo} alt="GitHub" width={24} height={24} /></Link>
              <Link href="https://telegram.org"><Image src={tgLogo} alt="Telegram" width={24} height={24} /></Link>
              <Link href="https://medium.com"><Image src={mediumLogo} alt="Medium" width={24} height={24} /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12 md:mt-0">
        <Image src={footerLogoFull} alt="Logo" width={120} height={120} className='mb-6 hideOnDesktop'/>
        <div className="text-center text-gray-500 text-sm">
          ©2023-2024 0xArmor Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer