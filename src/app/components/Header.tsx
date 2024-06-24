import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/header/logo_header.svg'
import tgLogo from '../assets/header/telegram_header.svg';
import twitterLogo from '../assets/header/twitter_header.svg'
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
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
        }} className='hideOnMobile'>
          <p>
            CLICK HERE TO ARMOR PRESALE
          </p>
        </div>

      <div className="flex hideOnMobile" style={{height:"13.5vh"}}>
        <div className="flex-custom-1 flex items-center">
          <Image src={logo} alt="brand-logo" style={{ width: '9.194rem', height: '2.363rem'}} className='logo-left-margins' loading='lazy'/>
        </div>
        <div className="flex-custom-1-65 flex justify-center items-center">
          <nav className={`${styles.mainNav} ${isDropdownOpen ? styles.open : ''}`}>
            <Link className={styles.linkAnimation} href="#concept">CONCEPT</Link>
            <Link className={styles.linkAnimation}  href="#features">FEATURES</Link>
            <Link className={styles.linkAnimation}  href="#about">ABOUT</Link>
            <Link className={styles.linkAnimation}  href="#tokenomics">TOKENOMICS</Link>
            <Link className={styles.linkAnimation}  href="#roadmap">ROADMAP</Link>
          </nav>
        </div>
        <div className="flex-custom-1 flex justify-center items-center">
          <div className={styles.socialLinks}>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src={twitterLogo} alt="Twitter" width={18.75} height={15} />
            </Link>
            <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer">
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
                <Image src={logo} alt="brand-logo" style={{ width: '11.64585rem', height: '3.012rem'}} loading='lazy'/>
              </div>
              <nav className={`${styles.mainNav} ${isDropdownOpen ? styles.open : ''}`}>
                <Link className={styles.linkAnimation} href="#concept">CONCEPT</Link>
                <Link className={styles.linkAnimation}  href="#features">FEATURES</Link>
                <Link className={styles.linkAnimation}  href="#about">ABOUT</Link>
                <Link className={styles.linkAnimation}  href="#tokenomics">TOKENOMICS</Link>
                <Link className={styles.linkAnimation}  href="#roadmap">ROADMAP</Link>
                <div className={styles.socialLinks}>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Image src={twitterLogo} alt="Twitter" width={18.75} height={15} />
                    </Link>
                    <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer">
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