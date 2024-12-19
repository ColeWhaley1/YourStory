// src/components/Layout.tsx
import React, { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

interface props {
  children: (controls: { hideNav: () => void; showNav: () => void }) => React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const [isNavBarRemoved, setIsNavBarRemoved] = useState<boolean>(false);

  const showNav = () => {
    setIsNavBarRemoved(false);
    setIsNavBarVisible(true);
  };
  const hideNav = () => setIsNavBarVisible(false);

  return (
    <>
      {!isNavBarRemoved && (
        <div
          className={`${isNavBarVisible ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300 ease-in-out`}
          onTransitionEnd={() => {
            if (!isNavBarVisible) {
              setIsNavBarRemoved(true)
            } else {
              setIsNavBarRemoved(false)
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
                  <NavigationMenuLink href="/mystories" className={`${navigationMenuTriggerStyle()} text-lg`}>
                    My Stories
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </div>

              {/* Log in and Sign Up. Right aligned */}
              <div className="flex">
                <NavigationMenuItem>
                  <button className="bg-tertiary rounded-3xl my-6 mr-6 p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
                    <div className="text-white">Sign Up</div>
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button className="bg-tertiary rounded-3xl my-6 mr-6 p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
                    <div className="text-white">Log In</div>
                  </button>
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
      <main>{children({ hideNav, showNav })}</main>
    </>
  );
};

export default Layout;
