import React, { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import useAuthStatus from "../helpers/useAuthStatus";
import DefaultAvatar from "../../assets/static_images/DefaultAvatar.png";
import GlobalLoading from "./GlobalLoading";  // Import GlobalLoading
import { useLoading } from "../contexts/loadingContext";

interface props {
  children: (controls: { hideNav: () => void; showNav: () => void }) => React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const [isNavBarRemoved, setIsNavBarRemoved] = useState<boolean>(false);

  const isSignedIn = useAuthStatus();
  console.log("user signed in: ", isSignedIn);

  const showNav = () => {
    setIsNavBarRemoved(false);
    setIsNavBarVisible(true);
  };
  const hideNav = () => setIsNavBarVisible(false);

  const {isLoading} = useLoading();

  return (
    <>
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
              <NavigationMenuList className="flex justify-between w-full space-x-4">
                {/* Nav items. Left aligned */}
                <div className="flex space-x-8 m-6">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/" className={`${navigationMenuTriggerStyle()} text-lg`}>
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/my_stories" className={`${navigationMenuTriggerStyle()} text-lg`}>
                      My Stories
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>

                {/* Log in and Sign Up. Right aligned */}
                {isSignedIn === false && (
                  <div className="flex space-x-2 md:space-x-4 m-8 pr-4">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/sign_up" className="text-xs text-white bg-tertiary rounded-3xl p-1 sm:p-2 md:p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
                        Sign Up
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/log_in" className="text-xs text-white bg-tertiary rounded-3xl p-1 sm:p-2 md:p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
                        Log In
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </div>
                )}

                {/* Profile. Right aligned */}
                {isSignedIn && (
                  <div className="flex space-x-2 md:space-x-4 m-6 pr-4">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/my_profile">
                        <img src={DefaultAvatar} alt="avatar" className="max-h-10" />
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </div>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        <main>
          {isLoading ? (
            <GlobalLoading />
          ) : (
            // Render the children function that passes `hideNav` and `showNav`
            children({ hideNav, showNav })
          )}
        </main>
      </div>
    </>
  );
};

export default Layout;
