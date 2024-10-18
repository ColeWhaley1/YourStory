import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@radix-ui/react-navigation-menu";

function App() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-between w-full space-x-4">
        {/* Nav items. Left aligned */}
        <div className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">My Stories</NavigationMenuLink>
          </NavigationMenuItem>
        </div>

        {/* Log in and Sign Up. Right aligned */}
        <div className="flex">
          <NavigationMenuItem>
            <button className="bg-tertiary rounded-3xl my-6 mr-6 p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
              <div className="text-white">
                Sign Up
              </div>
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <button className="bg-tertiary rounded-3xl my-6 mr-6 p-3 hover:shadow-2xl hover:ring-1 hover:ring-tertiary">
              <div className="text-white">
                Log In
              </div>
            </button>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default App;
