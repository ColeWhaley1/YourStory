import { IoIosClose } from "react-icons/io";

interface RemovableLabelProps {
    children: React.ReactNode;
    removeElement?: () => void;
}   

const RemovableLabel: React.FC<RemovableLabelProps> = (props) => {

    const {children, removeElement} = props;

    return (
        <div className="flex justify-center items-center bg-primary rounded-sm text-white pl-2 py-1">
            <div>
                {children}
            </div>
            <button onClick={removeElement} type="button">
                <IoIosClose className="size-6"/>
            </button>
        </div>
    )
}

export default RemovableLabel;