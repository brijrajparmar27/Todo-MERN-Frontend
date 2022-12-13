import API from "../Axios/Axios";
import useAuthContext from "./useAuthContext";
const useCollection = (setTodos) => {
    const {user} = useAuthContext();

    const fetchTodos = () => {
        user && API.get(`/todo/${user._id}`).then((data) => {
            setTodos(data.data)
        })
    }
    const createTodo = (todo) => {
        console.log(todo);
        API.post("/todo/", todo).then((data) => {
            // return data;
            fetchTodos();
        })
    }

    const toogleTodo = (todo) => {
        API.patch(`/todo/${todo._id}`, { isPending: !todo.isPending }).then(() => {
            fetchTodos();
        })
    }

    const deleteTodo = ({ _id }) => {
        API.delete(`/todo/${_id}`).then(() => {
            fetchTodos();
        })
    }
    return { fetchTodos, createTodo, toogleTodo, deleteTodo }
}

export default useCollection;