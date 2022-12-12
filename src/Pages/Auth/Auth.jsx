import "./Auth.css"
import hills from "../../assets/hills.jpg"
import { useEffect, useState } from "react"
import { BsFillCheckCircleFill } from "react-icons/bs";
import useUserAuth from "../../Hooks/useUserAuth";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isLogin, setIslogin] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { login, signup } = useUserAuth(setError);

    const toogleLogin = () => {
        setError(null)
        setIslogin(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(email, password)
        } else {
            signup(email, password)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    return <div className="auth">
        <div className="branding">
            <h1>TOD<BsFillCheckCircleFill style={{ fontSize: "23px", marginLeft: "2px" }} /></h1>
        </div>
        <div className="auth_card">
            <div className="left" style={{
                backgroundImage:
                    `linear-gradient(45deg,#005858a9,#00ff8c91), url(${hills})`
            }}>
            </div>
            <div className="right">
                {isLogin && <div className="login">
                    <h1>Login</h1>
                    <form className="login_form" onSubmit={handleSubmit}>
                        <div className="feild_bundle">
                            <p>Email</p>
                            <input type="text" name="email" id="email" className="inputbox" onChange={(e) => { setEmail(e.target.value.trim()) }} />
                        </div>
                        <div className="feild_bundle">
                            <p>password</p>
                            <input type="password" name="password" id="password" className="inputbox" onChange={(e) => { setPassword(e.target.value.trim()) }} />
                        </div>
                        {error && <p>{error.message}</p>}
                        <input type="submit" value="Login" className="submit_btn" />
                        <p onClick={toogleLogin}>New here? Register.</p>
                    </form>
                </div>}
                {!isLogin && <div className="register">
                    <h1>Register</h1>
                    <form className="login_form" onSubmit={handleSubmit}>
                        <div className="feild_bundle">
                            <p>Email</p>
                            <input type="text" name="email" id="email" className="inputbox" onChange={(e) => { setEmail(e.target.value.trim()) }} />
                        </div>
                        <div className="feild_bundle">
                            <p>password</p>
                            <input type="password" name="password" id="password" className="inputbox" onChange={(e) => { setPassword(e.target.value.trim()) }} />
                        </div>
                        {error && <p>{error.message}</p>}
                        <input type="submit" value="Sign In" className="submit_btn" />
                        <p onClick={toogleLogin}>Already have an account?</p>
                    </form>
                </div>}
            </div>
        </div>
    </div>
}

export default Auth