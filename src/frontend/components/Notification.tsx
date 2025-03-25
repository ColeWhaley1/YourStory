import { useEffect, useState } from "react";
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

    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isEntering, setIsEntering] = useState<boolean>(true);

    useEffect(() => {
        const notificationEnteringTimeout = setTimeout(() => {
            setIsEntering(false);
        }, 700);

        return () => clearTimeout(notificationEnteringTimeout);
    })

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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

    const onCloseNotification = () => {
        setIsExiting(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000)
    }

    return (
        <div className={`absolute top-4 w-full flex justify-center z-50 ${isEntering
                ?
                "transform -translate-y-40 transition-transform duration-300"
                :
                isExiting
                    ?
                    "transform -translate-y-40 transition-transform duration-700"
                    :
                    "transform translate-y-0 transition-transform duration-300"
            }`
        }>
            <div className="opacity-90">
                <div className={getNotificationStyle()}>

                    <div>
                        {getNotificationSymbol()}
                    </div>

                    <div>
                        {message}
                    </div>

                    <button className="hover:scale-150 transition-transform duration-300" onClick={onCloseNotification}>
                        <IoCloseOutline size={18} />
                    </button>

                </div>
            </div>
        </div >
    )
}

export default Notification;