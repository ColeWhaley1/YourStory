import { useState } from "react";

const useAccessControl = () => {

    const [accessRevoked] = useState<boolean>(() => {
        const accessRevokedStorage = localStorage.getItem('accessRevoked');

        return accessRevokedStorage === "true";
    });

    const revokeAccess = () => {
        localStorage.setItem('accessRevoked', 'true')
    }

    const allowAccess = () => {
        localStorage.setItem('accessRevoked', 'false')
    }

    return {
        accessRevoked,
        revokeAccess,
        allowAccess
    }

}

export default useAccessControl;