import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload }
        case "LOGOUT":
            localStorage.clear();
            return { ...state, user: null }
        case "setTodos":
            return { ...state, todos: action.payload }
        case "setproject":
            return { ...state, project: action.payload }
        default:
            return state
    }

}

export const AuthProvider = ({ children }) => {

    const [state, dispach] = useReducer(authReducer, { user: null, todos: null, project: 2641989273 })

    return <AuthContext.Provider value={{ ...state, dispach }}>
        {children}
    </AuthContext.Provider>
}