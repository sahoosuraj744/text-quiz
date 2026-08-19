import {backgroundDesigns,svgPatterns,navbarAnimations,navbarStyles} from '../assets/style'
import {useRef,useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {X,Menu} from 'lucide-react'
import {SignedOut,SignInButton,UserButton} from '@clerk/clerk-react'
const Navbar = ({
  logoSrc,quizType="default",
}) => {
  const navigate=useNavigate()
  const [menuOpen,setMenuOpen]= useState(false)
  const [isHovering,setIsHovering]=useState(false)
  const navRef=useRef(null)
  const menuBtnRef=useRef(null)
  const menuRef=useRef(null)
  const design=backgroundDesigns[quizType] || backgroundDesigns.default;
  const pattern=svgPatterns[design.pattern]|| svgPatterns.abstract;

  
  useEffect(() => {
    if (!menuOpen) return;

    const handleDocClick = (e) => {
      if (
        navRef.current?.contains(e.target) ||
        menuBtnRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("click", handleDocClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleDocClick, { capture: true });
  }, [menuOpen]);
  const goTo=(path)=>{
    navigate(path);
    setMenuOpen(false)
  }
  return (
    <div className={navbarStyles.container}>
      <nav ref={navRef} className={navbarStyles.nav(design.borderColor,isHovering)} onMouseEnter={()=>setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}>
          <div className={navbarStyles.patternContainer}>
            <div className={navbarStyles.patternLayer} style={{
              backgroundImage:pattern,
              ...navbarStyles.backgroundPatternStyle
            }}/>
          </div>
          <div className={navbarStyles.innerContainer}>
            <div className={navbarStyles.flexContainer}>
              <div className={navbarStyles.logoSection}>
                <button className={navbarStyles.logoButton} onClick={()=>goTo("/")}>
                  <img src={
                    logoSrc ||
                    "https://cdn-icons-png.flaticon.com/128/5806/5806364.png"
                  }
                  alt="logo"
                  className={navbarStyles.logoImage} />
                </button>
              </div>
              <div className={navbarStyles.titleContainer}>
                <div className={navbarStyles.titleWrapper}>
                  <div className={navbarStyles.titleBox}>
                    <h1 className={navbarStyles.titleText(design.textColor)}>
                      <span className={navbarStyles.titleGradient}>
                        Tech Quiz Master
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className={navbarStyles.desktopButtons}>
                  <SignedOut>
                    <button className={navbarStyles.buttonBase(design.accentColor)}>
                      My Result
                    </button>
                  </SignedOut>
                  <SignInButton>
                    <button onClick={()=>navigate("/result")} className={navbarStyles.buttonBase(design.accentColor)}>
                      My Result
                    </button>
                  </SignInButton>
                  <SignedOut>
                    <button className={navbarStyles.buttonBase(design.accentColor)}>
                      Login
                    </button>
                  </SignedOut>
                  <SignInButton>
                    <div className="flex items-center justify-center ml-3 ">
                 <UserButton appearance={{
                  elements:{
                    avatarBox:"w-9 h-9",
                   },}} />
                    </div>
                  </SignInButton>
              </div>
              <button ref={menuBtnRef}className={`lg:hidden ${
                navbarStyles.mobileMenuButton(design.accentColor)
              }`} onClick={()=>setMenuOpen((s)=>!s)}>
                {menuOpen?(
                   <X/>
                ):<Menu/>}
              </button>
            </div>
            {menuOpen && (
                <div ref={menuRef} className={navbarStyles.mobileMenuWrapper}>
                  <SignedOut>
                    <button className={navbarStyles.buttonBase (design.accentColor)}>
                      My Results
                    </button>
                  </SignedOut>
                  <SignInButton>
                    <button onClick={()=>{
                      navigate("/result");
                      setMenuOpen(false);
                    }} className={navbarStyles.buttonBase(design.accentColor)} >
                      My Results
                    </button>
                  </SignInButton>
                  <SignedOut>
                    <button className={navbarStyles.buttonBase(design.accentColor)}>
                      Login
                    </button>
                  </SignedOut>
                  <SignInButton>
                    <UserButton/>
                  </SignInButton>
                </div>
            )}
          </div>
        </nav>
        <style>{navbarAnimations}</style>
        </div>
    
  )
}

export default Navbar