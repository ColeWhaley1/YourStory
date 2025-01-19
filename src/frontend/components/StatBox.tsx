import { useNavigate } from "react-router-dom";

interface StatBoxProps {
    title: string;
    count: number;
    redirect: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, count, redirect }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirect);
    };

    return (
        <button
            onClick={handleClick}
            className="p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 w-full group bg-white"
        >
            <div className="flex flex-col space-y-2">

                <div className="text-lg text-gray-800">{title}</div>

                <div className="text-3xl font-bold text-primary flex items-center justify-center relative">
                    <div className="transform transition group-hover:scale-125">
                        {count}
                    </div>
                </div>
            </div>
        </button>
    );
};

export default StatBox;
