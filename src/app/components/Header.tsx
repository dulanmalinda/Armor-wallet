import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/header/logo_header.svg'
import tgLogo from '../assets/header/telegram_header.svg';
import twitterLogo from '../assets/header/twitter_header.svg'
import { useState } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  minLogoWidth: number;
}

const Header = ({minLogoWidth}:HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
    return (
      <>
        <div style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#BDFF6A',
          textAlign: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
          fontSize: '0.75rem',
          top: '0',
          width: '100%',
          zIndex: '1000',
          fontWeight : '500'
        }} className=''>
          <Link href="https://airdrop.armorwallet.ai/" className='button-enlarge-md'>
            CLICK HERE FOR ARMOR AIRDROP
          </Link>
        </div>

      <div className="flex hideOnMobile" style={{height:"13.5vh"}}>

        <div className="flex-custom-1-2 flex items-center justify-end" style={{minWidth:minLogoWidth}}>
          <div style={{width:"11.5rem"}}>
            <a href='https://www.armorwallet.ai/'>
              <Image src={logo} alt="brand-logo" style={{ width: '9.194rem', height: '2.363rem'}}/>
            </a>
          </div>
        </div>

        <div className="flex-custom-2-3 flex justify-start items-center">
          
          <div className="flex-shrink-0 flex flex-row items-start pl-4">

            <div className="flex items-center">
                <div className="w-5 h-5 mb-0 mr-2 cursor-pointer hideOnMobile" >
                    
                </div>
                <div className="w-5 h-5 mb-0 " style={{marginRight:"0.2rem"}} >

                </div>
                {/* <span className="font-bold mx-2 sm:mx-0 sm:ml-2 text-gray-500 text-lg" style={{ width: '40px', display: 'inline-block', textAlign: 'right' }}>
                    
                </span> */}
                <span className="mx-1 sm:mx-0 sm:ml-2" style={{ width: '2rem', display: 'inline-block', textAlign: 'right',color:"#7A7A7A",fontSize:"1.125rem",fontWeight:"400"}}>
                    
                </span>
            </div>

            <div
            className=""
            style={{
                width: '2px',
                height: `0px`,
                backgroundColor: 'black',
                marginTop: '0.5vh',
                marginLeft : '0.5vw'
            }}
            />
            </div>

          <nav className={`${styles.mainNav} ${isDropdownOpen ? styles.open : ''}`}>
            <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/concept">CONCEPT</Link>
            <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/features">FEATURES</Link>
            <Link className={styles.linkAnimation} style={{whiteSpace:"nowrap"}}  href="https://www.armorwallet.ai/armor-ai">ARMOR AI</Link>
            <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/about">ABOUT</Link>
            <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/tokenomics">TOKENOMICS</Link>
          </nav>
        </div>
        
        <div className="flex-custom-1-2 flex justify-center items-center">
          <div className={styles.socialLinks}>
            <Link href="https://x.com/armorwallet" target="_blank" rel="noopener noreferrer" className='button-enlarge-md'>
              <Image src={twitterLogo} alt="Twitter" width={18.75} height={15} />
            </Link>
            <Link href="https://t.me/armor_wallet" target="_blank" rel="noopener noreferrer" className='button-enlarge-md'>
              <Image src={tgLogo} alt="Telegram" width={16.66} height={15} />
            </Link>
          </div>
        </div>
      </div>


      <div className='hideOnDesktop'>
        <header style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              backgroundColor: 'white', 
              textAlign: 'center', 
              paddingTop: '1rem', 
              paddingBottom: '2.188rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1.75rem' }}>
                <Image src={logo} alt="brand-logo" style={{ width: '13.6256445rem', height: '3.52404rem'}} />
              </div>
              <nav className={`${styles.mainNav} ${isDropdownOpen ? styles.open : ''}`}>
                <Link className={styles.linkAnimation} href="https://www.armorwallet.ai/concept">CONCEPT</Link>
                <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/features">FEATURES</Link>
                <Link className={styles.linkAnimation} style={{whiteSpace:"nowrap"}}  href="https://www.armorwallet.ai/armor-ai">ARMOR AI</Link>
                <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/about">ABOUT</Link>
                <Link className={styles.linkAnimation}  href="https://www.armorwallet.ai/tokenomics">TOKENOMICS</Link>
                <div className={styles.socialLinks}>
                    <Link href="https://x.com/armorwallet" target="_blank" rel="noopener noreferrer">
                      <Image src={twitterLogo} alt="Twitter" width={18.75} height={15} />
                    </Link>
                    <Link href="https://t.me/armor_wallet" target="_blank" rel="noopener noreferrer">
                      <Image src={tgLogo} alt="Telegram" width={16.66} height={15} />
                    </Link>
                  </div>
              </nav>
              <button className={styles.menuToggle} onClick={toggleDropdown}>
                ☰
              </button>
          </header>
      </div>
    </>
      );
}

export default Header