import "./Home.css"
import hills from "../../assets/hills.jpg"
import { BsFillFolderFill, BsFillCheckCircleFill } from "react-icons/bs";
import useCollection from "../../Hooks/useCollection";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../../Hooks/useUserAuth";
import Todo from "../../Components/Todo";
import AddModal from "../../Components/AddModal/AddModal";

const Home = () => {

    // const [todos, setTodos] = useState();
    const [newTodo, setNewTodo] = useState();
    const [folderModal, setFolderModal] = useState(false);

    const [pending, setPending] = useState();
    const [complete, setComplete] = useState();
    const DateTime = new Date();

    const { fetchTodos, createTodo } = useCollection();
    const { logout } = useUserAuth();
    const { user, todos, dispach, project } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos()
    }, [user, project])

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
        newTodo && newTodo.trim() && createTodo({ todo: newTodo, createdBY: user._id, folderId: project })
        setNewTodo(null);
        e.target.reset();
    }

    return <div className="home">
        {folderModal && <AddModal setFolderModal={setFolderModal} />}
        <div className="header" style={{
            backgroundImage:
                `linear-gradient(45deg,#005858a9,#00ff8c91), url(${hills})`
        }}>
            <div className="header_contents">
                <div className="left_header_content">
                    <h1 onClick={logout}>TOD<BsFillCheckCircleFill style={{ fontSize: "23px", marginLeft: "2px" }} /></h1>
                    <div className="collection" onClick={() => { setFolderModal(true) }}>
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
                                    return <Todo each={each} isCompleted={false} key={each._id} />
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
                                    return <Todo each={each} isCompleted={true} key={each._id} />
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