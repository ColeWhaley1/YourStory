import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import useAuthStatus from "../helpers/useAuthStatus";
import GlobalLoading from "./GlobalLoading";
import { useLoading } from "../contexts/loadingContext";
import ProfileAvatar from "./ProfileAvatar";
import { useMyProfile } from "../contexts/myProfileContext";

interface props {
  children: (controls: { hideNav: () => void; showNav: () => void }) => React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const [isNavBarRemoved, setIsNavBarRemoved] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const isSignedIn = useAuthStatus();
  const { isLoading } = useLoading();

  const showNav = () => {
    setIsNavBarRemoved(false);
    setIsNavBarVisible(true);
  };
  const hideNav = () => setIsNavBarVisible(false);

  const { profile } = useMyProfile();

  return (
    <div>
      {!isNavBarRemoved && (
        <div
          className={`${isNavBarVisible ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300 ease-in-out`}
          onTransitionEnd={() => {
            if (!isNavBarVisible) {
              setIsNavBarRemoved(true);
            } else {
              setIsNavBarRemoved(false);
            }
          }}
        >
          <NavigationMenu>
            <NavigationMenuList className="flex justify-between w-full space-x-4 outline outline-[#00000014]">
              {/* Nav items. Left aligned */}
              <div className="flex space-x-8 m-6">
                <NavigationMenuItem>
                  <button
                    onClick={() => navigate("/")}
                    className={`${navigationMenuTriggerStyle()} text-lg`}
                  >
                    Home
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => navigate("/my_stories")}
                    className={`${navigationMenuTriggerStyle()} text-lg`}
                  >
                    My Stories
                  </button>
                </NavigationMenuItem>
              </div>

              {/* Log in and Sign Up. Right aligned */}
              {!isSignedIn && (
                <div className="flex space-x-2 md:space-x-4 m-8 pr-4">
                  <NavigationMenuItem>
                    <button
                      onClick={() => navigate("/sign_up")}
                      className="text-xs text-white bg-tertiary rounded-3xl p-1 sm:p-2 md:p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary"
                    >
                      Sign Up
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button
                      onClick={() => navigate("/log_in")}
                      className="text-xs text-white bg-tertiary rounded-3xl p-1 sm:p-2 md:p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary"
                    >
                      Log In
                    </button>
                  </NavigationMenuItem>
                </div>
              )}

              {/* Profile. Right aligned */}
              {isSignedIn && (
                <div className="flex space-x-2 md:space-x-4 m-6 pr-4">
                  <NavigationMenuItem>
                    <button onClick={() => navigate("/my_profile")}>
                      <div className="transform transition-transform duration-200 ease-in-out hover:scale-150">
                        <ProfileAvatar size="h-10 w-10" avatarUrl={profile?.author.avatarUrl}/>
                      </div>
                    </button>
                  </NavigationMenuItem>
                </div>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
      <main>
        {isLoading ? <GlobalLoading /> : children({ hideNav, showNav })}
      </main>
    </div>
  );
};

export default Layout;
