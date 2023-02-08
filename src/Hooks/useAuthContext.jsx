import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const useAuthContext = () => {
    const { user, todos, project, dispach } = useContext(AuthContext);
    return { user, todos, project, dispach };
}

export default useAuthContext