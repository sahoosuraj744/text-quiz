import { useState, useEffect, useRef } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import {
  useUser,
  useAuth,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Home, List, User, Menu, X } from "lucide-react";
const Navbar = ({
  logoSrc = null,
  siteName = "Tech Quiz Master",
  rightContent = null,
  onNavigate = null,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  //to save token
  const prevSignedInRef = useRef(isSignedIn);
  useEffect(() => {
    let mounted = true;
    async function saveTokenAndMaybeRedirect() {
      if (!isSignedIn || prevSignedInRef.current === isSignedIn) return;
      try {
        const token = await getToken();
        if (token && mounted) {
          localStorage.setItem("clerkToken", token);
          console.log("clerkToken saved");
        }
      } catch (error) {
        console.error("Failed to get Clerk Token", error);
      }
      const path = window.location.pathname;
      const shouldRedirect =
        path === "/" || path === "/login" || path === "/signin" || path === "";
      if (shouldRedirect) {
        if (onNavigate) onNavigate("/dashboard");
      } else {
        try {
          navigate("/dashbaord");
        } catch {
          window.location.href = "/dashboard";
        }
      }
    }
    saveTokenAndMaybeRedirect();
    return ()=>{
      mounted=false;

    }
  },[isSignedIn,getToken,navigate,onNavigate]);
  const handleNavigate = (href) => {
    setMobileOpen(false);
    if (onNavigate) return onNavigate(href);
    try {
      navigate(href);
    } catch  {
      window.location.href = href;
    }
  };
  return (
    <nav className={navbarStyles.nav}>
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          <div className={navbarStyles.homeButton}>
            <button
              type="button"
              onClick={() => handleNavigate("/dashboard")}
              className={navbarStyles.homeButton}
            >
              <div className={navbarStyles.logoWrapper}>
                <img
                  src={
                    logoSrc ||
                    "https://cdn-icons-png.flaticon.com/128/5806/5806364.png"
                  }
                  alt={`${siteName} logo`}
                  className={navbarStyles.logoImg}
                />
              </div>
              <div className={navbarStyles.siteNameWrapper}>
                <span className={navbarStyles.siteName}>{siteName}</span>
                <span className={navbarStyles.siteSubtitle}>
                  Learning Platform
                </span>
              </div>
            </button>
          </div>
          <SignedIn>
            <div className={navbarStyles.desktopCenterContainer}>
              <div className={navbarStyles.desktopCenterInner}>
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className={navbarStyles.button}
                >
                  <Home className={navbarStyles.dashboardIcon} />
                  <span className={navbarStyles.dashboardText}>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNavigate("/list")}
                  className={navbarStyles.button}
                >
                  <List className={navbarStyles.listIcon} />
                  <span className={navbarStyles.listText}>List Quiz</span>
                </button>
              </div>
            </div>
          </SignedIn>

          <div className={navbarStyles.desktopRightContent}>
            {rightContent ? (
              rightContent
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className={navbarStyles.profileButton}
                    >
                      <User className={navbarStyles.profileIcon} />
                      <span>My Profile</span>
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className={navbarStyles.profileGroup}>
                    <div className={navbarStyles.profileBlur}></div>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9",
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className={navbarStyles.desktopRightContent}>
              {rightContent ? (
                rightContent
              ) : (
                <div className={navbarStyles.profileIcon}>
                  <div className={navbarStyles.profileIcon}>
                    <SignedOut>
                      <SignInButton mode="model">
                        <button
                          type="button"
                          className={navbarStyles.profileButton}
                        >
                          <User className={navbarStyles.profileIcon} />
                          <span>My Profile</span>
                        </button>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      <div className={navbarStyles.profileGroup}>
                        <div className={navbarStyles.profileBlur} />
                        <UserButton
                          appearance={{ elements: { avatarBox: "w-9 h-9" } }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              )}
            </div>
            <div className={navbarStyles.mobileMenuContainer}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileOpen((s) => !s);
                }}
                className={navbarStyles.hamburgerButton}
              >
                {mobileOpen ? (
                  <X className={navbarStyles.xIcon} />
                ) : (
                  <Menu className={navbarStyles.menuIcon} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div id="mobile-menu" className={navbarStyles.mobileOverlay}>
          <div
            onClick={() => setMobileOpen(false)}
            className={navbarStyles.mobileBackdrop}
          />
          <div
            className={navbarStyles.mobilePanel}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className={navbarStyles.mobileNav}>
              <SignedIn>
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className={navbarStyles.mobileNav}
                >
                  <Home className={navbarStyles.mobileNavIcon} />
                  <div>
                    <div className={navbarStyles.mobileNavItemTitle}>
                      Dashboard
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigate("/list")}
                  className={navbarStyles.mobileNavButton}
                >
                  <List className={navbarStyles.mobileNavIcon} />
                  <div>
                    <div className={navbarStyles.mobileNavItemTitle}>
                      List Quiz
                    </div>
                  </div>
                </button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="model">
                  <button className={navbarStyles.mobileNavButton}>
                    <User className={navbarStyles.mobileNavIcon} />
                    <div>
                      <div className={navbarStyles.mobileNavItemTitle}>
                        Login
                      </div>
                    </div>
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className={navbarStyles.mobileNavIcon}>
                  <UserButton />
                </div>
              </SignedIn>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
