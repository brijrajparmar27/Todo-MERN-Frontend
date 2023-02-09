import API from "../Axios/Axios";
import useAuthContext from "./useAuthContext";
const useCollection = () => {
  const { user, dispach, project } = useAuthContext();

  const fetchTodos = () => {
    user &&
      API.get(`/todo/${user._id}/${project}`).then((data) => {
        dispach({ type: "setTodos", payload: data.data });
      });
  };
  const createTodo = (todo) => {
    todo;
    API.post("/todo/", todo).then((data) => {
      fetchTodos();
    });
  };

  const toogleTodo = (todo) => {
    API.patch(`/todo/${todo._id}`, { isPending: !todo.isPending }).then(() => {
      fetchTodos();
    });
  };

  const deleteTodo = ({ _id }) => {
    API.delete(`/todo/${_id}`).then(() => {
      fetchTodos();
    });
  };

  const createProject = ({ _id, projects }) => {
    API.patch("user/newproject", { _id, projects }).then(({ data }) => {
      data;
      dispach({ type: "LOGIN", payload: data });
    });
  };

  const deleteProject = ({ _id, projects }) => {
    API.patch("user/delproject", { _id, projects }).then(({ data }) => {
      data;
      dispach({ type: "LOGIN", payload: data });
    });
  };

  return {
    fetchTodos,
    createTodo,
    toogleTodo,
    deleteTodo,
    createProject,
    deleteProject,
  };
};

export default useCollection;
