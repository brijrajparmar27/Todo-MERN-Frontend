import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import useCollection from "../../Hooks/useCollection";
import "./AddModal.css";

const AddModal = ({ setFolderModal }) => {

    const { createProject } = useCollection();
    const { user, dispach } = useAuthContext();

    const [newProject, setNewProject] = useState("");

    const handleNewProject = (e) => {
        e.preventDefault()
        if (newProject) {
            let newData = { _id: user._id, projects: [...user.projects, { "name": newProject, "id": Math.round(Math.random() * 10000000000) }] }
            createProject(newData);
        }

    }

    return <div className="addModal" onClick={() => { setFolderModal(false) }}>
        <div className="modal" onClick={(e) => { e.stopPropagation() }}>
            <div className="modal_header">
                <form className="todo_header" onSubmit={handleNewProject}>
                    <h1 className="header_title">Projects</h1>
                    <input type="text" className="todo_tb" placeholder="New Project" onChange={(e) => { setNewProject(e.target.value.trim()) }} />
                </form>
            </div>
            <div className="modal_body">
                {
                    user && user.projects.map((each) => {
                        return <p onClick={()=>{dispach({type:"setproject", payload:each.id})}}>{each.name}</p>
                    })
                }
            </div>
        </div>
    </div>
}

export default AddModal;