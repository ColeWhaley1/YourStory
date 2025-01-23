import Lottie from "lottie-react";
import RightArrow from "../../assets/lottie_animations/right_arrow_white.json";

interface HintBoxProps {
    message: string;
    setShowHint: (show: boolean) => void;
    exitButtonTitle?: string;
    header: string;
}

const HintBox: React.FC<HintBoxProps> = ({ message, header, setShowHint, exitButtonTitle = "Continue" }) => {
    return (
        <div className="absolute inset-0 -top-48 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center min-w-[8rem] min-h-[8rem] max-w-[28rem] bg-white shadow-lg z-10 border border-gray-300 rounded-lg p-6 text-gray-700 space-y-4">
                <div className="flex items-center justify-center w-full bg-gray-100 p-2 rounded-md">
                    <h3 className="text-2xl font-bold">{header}</h3>
                </div>
                <p className="text-center text-lg font-medium">{message}</p>
                <button className="w-fit text-black text-center bg-secondary p-1 px-2 rounded-sm" onClick={() => setShowHint(false)}>
                    <div className="flex justify-center items-center text-white space-x-2">
                        <div>
                            {exitButtonTitle}
                        </div>
                        <div>
                            <Lottie animationData={RightArrow} className="w-6" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default HintBox;
