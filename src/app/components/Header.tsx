import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png'
import tgLogo from '../assets/telegram.png';
import twitterLogo from '../assets/twitter.png'
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a7ff4b',
        textAlign: 'center',
        paddingTop: '7px',
        paddingBottom: '7px',
        fontSize: '0.7em',
        color: 'black',
        fontWeight: 'bold',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1000'
      }}>
        <p>
          CLICK HERE TO ARMOR PRESALE
        </p>
      </div>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        paddingTop: '20px', 
        paddingBottom: '20px',
        marginTop: '44px' // Adjust this value based on the height of the fixed strip
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10%' }}>
          <Image src={logo} alt="Armor Logo" width={135} height={135} />
        </div>
        <nav className={`${styles.mainNav} ${isDropdownOpen ? styles.open : ''}`}>
          <Link className="text-black font-bold no-underline hover:underline" href="#concept">CONCEPT</Link>
          <Link className="text-black font-bold no-underline hover:underline" href="#features">FEATURES</Link>
          <Link className="text-black font-bold no-underline hover:underline" href="#about">ABOUT</Link>
          <Link className="text-black font-bold no-underline hover:underline" href="#tokenomics">TOKENOMICS</Link>
          <Link className="text-black font-bold no-underline hover:underline" href="#roadmap">ROADMAP</Link>
        </nav>
        <div className={styles.socialLinks}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src={twitterLogo} alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <Image src={tgLogo} alt="Telegram" width={24} height={24} />
          </a>
        </div>
        <button className={styles.menuToggle} onClick={toggleDropdown}>
          ☰
        </button>
      </header>
    </>
      );
}

export default Header