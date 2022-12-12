import API from "../Axios/Axios";
const useCollection = (setTodos) => {
    const fetchTodos = () => {
        API.get("/todo/").then((data) => {
            setTodos(data.data)
        })
    }
    const createTodo = (todo) => {
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

    const deleteTodo = ({_id}) =>{
        API.delete(`/todo/${_id}`).then(()=>{
            fetchTodos();
        })
    }
    return { fetchTodos, createTodo, toogleTodo, deleteTodo }
}

export default useCollection;