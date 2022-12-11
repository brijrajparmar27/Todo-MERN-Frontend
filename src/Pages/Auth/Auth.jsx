import "./Auth.css"
import hills from "../../assets/hills.jpg"
import { useState } from "react"
import { BsFillCheckCircleFill } from "react-icons/bs";

const Auth = () => {
    const [isLogin, setIslogin] = useState(false);
    const toogleLogin = () => {
        setIslogin(prev => !prev);
    }
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
                    <form className="login_form">
                        <div className="feild_bundle">
                            <p>Email</p>
                            <input type="text" name="email" id="email" className="inputbox" />
                        </div>
                        <div className="feild_bundle">
                            <p>password</p>
                            <input type="password" name="email" id="email" className="inputbox" />
                        </div>
                        <input type="submit" value="Login" className="submit_btn" />
                        <p onClick={toogleLogin}>New here? Register.</p>
                    </form>
                </div>}
                {!isLogin && <div className="register">
                    <h1>Register</h1>
                    <form className="login_form">
                        <div className="feild_bundle">
                            <p>Email</p>
                            <input type="text" name="email" id="email" className="inputbox" />
                        </div>
                        <div className="feild_bundle">
                            <p>password</p>
                            <input type="password" name="email" id="email" className="inputbox" />
                        </div>
                        <input type="submit" value="Sign In" className="submit_btn" />
                        <p onClick={toogleLogin}>Already have an account?</p>
                    </form>
                </div>}
            </div>
        </div>
    </div>
}

export default Auth