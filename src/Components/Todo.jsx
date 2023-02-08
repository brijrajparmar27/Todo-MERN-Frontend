import useCollection from "../Hooks/useCollection";
import { BsFillCheckCircleFill, BsCircle, BsXLg } from "react-icons/bs";

const Todo = ({ each, isCompleted }) => {
    const { toogleTodo, deleteTodo } = useCollection();

    return <div>
        <div className="todo">
            <div className="todo_left">
                {isCompleted && <BsFillCheckCircleFill className="checkmark" onClick={() => { toogleTodo(each) }} />}
                {!isCompleted && <BsCircle className="checkmark" onClick={() => { toogleTodo(each) }} />}
                <p>{each.todo}</p>
            </div>
            <div className="todo_del" onClick={() => { deleteTodo(each) }}>
                <BsXLg />
            </div>
        </div>
        <hr className="todo_partition" />
    </div>
}

export default Todo