import { NotificationType } from "../contexts/notificationContext";

interface NotificationProps {
    isVisible: boolean,
    setIsVisible: (state: boolean) => void,
    notificationType: NotificationType,
    message: string,
    lifespan: number | undefined,
    action?: (() => void) | undefined,
}

const Notification: React.FC<NotificationProps> = ({ isVisible, setIsVisible, notificationType, message, lifespan, action }) => {
    return (
        <div className="absolute top-4 z-50 w-full h-full flex justify-center">
            <div className="opacity-90">
                <div className="alert">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        {message}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notification;