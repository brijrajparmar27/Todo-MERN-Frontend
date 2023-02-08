import { useState } from "react"
import axios from "../Axios/Axios"
import useAuthContext from "./useAuthContext";

const useUserAuth = (setError) => {

    const [loading, setLoading] = useState(false);
    const { dispach } = useAuthContext();

    const login = (email, password) => {
        axios.post("/user/login", {
            email, password
        }).then((res) => {
            if (res.data.jwt) {
                dispach({ type: "LOGIN", payload: res.data })
            }
            res.data.message && setError(res.data);
            // return res
        }).catch((err) => {
            setError(err);
        })
    }

    const signup = (email, password) => {
        axios.post("/user/signup", {
            email, password
        }).then((res) => {
            if (res.data.jwt) {
                dispach({ type: "LOGIN", payload: res.data })
            }
            res.data.message && setError(res.data);
        }).catch((err) => {
            setError(err);
        })
    }

    const logout = () => {
        dispach({ type: "LOGOUT", payload: null })
    }

    return { login, signup, logout }
}

export default useUserAuth