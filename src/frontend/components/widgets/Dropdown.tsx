import { useState } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoTime } from "react-icons/io5";
import { FaCheck, FaFireAlt } from "react-icons/fa";
import { LuSnowflake } from "react-icons/lu";

interface DropdownProps {
    name: string;
    onSelect: (selection: string) => void;
}

const StoryFilterDropdown: React.FC<DropdownProps> = ({ name, onSelect }) => {
    const [selected, setSelected] = useState<string>("Newest");

    const handleClick = (selection: string) => {
        setSelected(selection);
        onSelect(selection);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleClick("Newest")}>
                        <IoTime />
                        <span>Newest</span>
                        {selected === "Newest" && <FaCheck className="ml-auto scale-[.6]"/>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClick("Oldest")}>
                        <IoTime className="rotate-180" />
                        <span>Oldest</span>
                        {selected === "Oldest" && <FaCheck className="ml-auto scale-[.6]"/>}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleClick("Highest Rated")}>
                        <FaFireAlt className="text-[#ff7733]" />
                        <span>Highest Rated</span>
                        {selected === "Highest Rated" && <FaCheck className="ml-auto scale-[.6]"/>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClick("Lowest Rated")}>
                        <LuSnowflake className="text-blue-400" />
                        <span>Lowest Rated</span>
                        {selected === "Lowest Rated" && <FaCheck className="ml-auto scale-[.6]"/>}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default StoryFilterDropdown;
