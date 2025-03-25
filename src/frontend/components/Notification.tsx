import { NotificationType } from "../contexts/notificationContext";
import { IoCloseOutline } from "react-icons/io5";

interface NotificationProps {
    isVisible: boolean,
    setIsVisible: (state: boolean) => void,
    notificationType: NotificationType,
    message: string,
    lifespan: number | undefined,
    action?: (() => void) | undefined,
}

const Notification: React.FC<NotificationProps> = ({ isVisible, setIsVisible, notificationType, message, lifespan, action }) => {

    const getNotificationStyle = () => {
        switch (notificationType) {
            case "success":
                return "alert alert-success text-white shadow-xl";
            case "info":
                return "alert alert-info text-white shadow-xl";
            case "error":
                return "alert alert-error text-white shadow-xl";
            default:
                return "alert alert-neutral text-white shadow-xl";
        }
    }

    const getNotificationSymbol = () => {

        switch (notificationType) {
            case "success":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "info":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
            case "error":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
        }
    }

    return (
        <div className="absolute top-4 w-full flex justify-center">
            <div className="opacity-90">
                <div className={getNotificationStyle()}>

                    <div>
                        {getNotificationSymbol()}
                    </div>

                    <div>
                        {message}
                    </div>

                    <div className="hover:scale-150 transition-transform duration-300 transform will-change-transform">
                        <IoCloseOutline />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notification;