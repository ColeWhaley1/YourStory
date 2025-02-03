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
    handleSelection: (selection: string) => void;
}

const StoryFilterDropdown: React.FC<DropdownProps> = ({ name, handleSelection }) => {
    const [selected, setSelected] = useState<string>("Most Recent");

    const handleClick = (selection: string) => {
        setSelected(selection);
        handleSelection(selection);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleClick("Most Recent")}>
                        <IoTime />
                        <span>Most Recent</span>
                        {selected === "Most Recent" && <FaCheck className="ml-auto scale-[.6]"/>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClick("Least Recent")}>
                        <IoTime className="rotate-180" />
                        <span>Least Recent</span>
                        {selected === "Least Recent" && <FaCheck className="ml-auto scale-[.6]"/>}
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
