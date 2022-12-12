import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const useAuthContext = () => {
    const { user, dispach } = useContext(AuthContext);
    return { user, dispach };
}

export default useAuthContext