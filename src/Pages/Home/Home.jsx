import "./Home.css"
import hills from "../../assets/hills.jpg"
import { BsFillFolderFill, BsFillCheckCircleFill, BsCircle, BsXLg } from "react-icons/bs";
import useCollection from "../../Hooks/useCollection";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../../Hooks/useUserAuth";

const Home = () => {

    const [todos, setTodos] = useState();
    const [newTodo, setNewTodo] = useState();

    const [pending, setPending] = useState();
    const [complete, setComplete] = useState();
    const DateTime = new Date();

    const { fetchTodos, createTodo, toogleTodo, deleteTodo } = useCollection(setTodos);
    const { logout } = useUserAuth();
    const { user } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos()
    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user])

    useEffect(() => {
        todos && setPending(todos.filter(each => {
            return each.isPending;
        }))
        todos && setComplete(todos.filter(each => {
            return !each.isPending;
        }))
    }, [todos])

    const handleAdd = (e) => {
        e.preventDefault();
        newTodo && newTodo.trim() && createTodo({ todo: newTodo, createdBY: user._id })
        setNewTodo(null);
        e.target.reset();
    }

    const toogleCheckedState = (todo) => {
        toogleTodo(todo);
    }

    return <div className="home">
        <div className="header" style={{
            backgroundImage:
                `linear-gradient(45deg,#005858a9,#00ff8c91), url(${hills})`
        }}>
            <div className="header_contents">
                <div className="left_header_content" onClick={logout}>
                    <h1>TOD<BsFillCheckCircleFill style={{ fontSize: "23px", marginLeft: "2px" }} /></h1>
                    <div className="collection">
                        <p>default</p>
                        <BsFillFolderFill />
                    </div>
                </div>
                <div className="right_header_content">
                    <p className="date">{format(DateTime, 'cccc, LLLL d. y')}</p>
                </div>
            </div>
        </div>
        <div className="home_content">
            <div className="todo_contain">
                <form className="todo_header" onSubmit={handleAdd}>
                    <h1 className="header_title">Tasks</h1>
                    <input type="text" className="todo_tb" placeholder="Type to add a new Task..." onChange={(e) => { setNewTodo(e.target.value) }} />
                </form>
                <hr className="todo_partition" />
                {todos && todos.length <= 0 && <div className="empty_prompt">
                    <h1>Let's get some work done</h1>
                </div>}
                <div className="todo_list">
                    {
                        pending && pending.length > 0 && <div className="pending_todos">
                            <div className="todo_section_heading">
                                <p>to do</p>
                            </div>
                            {
                                pending.map(each => {
                                    return <div key={each._id}>
                                        <div className="todo">
                                            <div className="todo_left">
                                                <BsCircle className="checkmark" onClick={() => { toogleCheckedState(each) }} />
                                                <p>{each.todo}</p>
                                            </div>
                                            <div className="todo_del" onClick={() => { deleteTodo(each) }}>
                                                <BsXLg />
                                            </div>
                                        </div>
                                        <hr className="todo_partition" />
                                    </div>
                                })
                            }
                        </div>
                    }
                    {
                        complete && complete.length > 0 && <div className="completed_todos">
                            <div className="todo_section_heading">
                                <p>done</p>
                            </div>
                            {
                                complete.map(each => {
                                    return <div key={each._id}>
                                        <div className="todo">
                                            <div className="todo_left">
                                                <BsFillCheckCircleFill className="checkmark" onClick={() => { toogleCheckedState(each) }} />
                                                <p>{each.todo}</p>
                                            </div>
                                            <div className="todo_del" onClick={() => { deleteTodo(each) }}>
                                                <BsXLg />
                                            </div>
                                        </div>
                                        <hr className="todo_partition" />
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Home