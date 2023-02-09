import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import useCollection from "../../Hooks/useCollection";
import { RxCross2 } from "react-icons/rx";
import "./AddModal.css";

const AddModal = ({ setFolderModal }) => {
  const { createProject, deleteProject } = useCollection();
  const { user, dispach } = useAuthContext();

  const [newProject, setNewProject] = useState("");

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setFolderModal(false);
  };

  const handleDeleteProject = (target) => {
    // ("delete ", each);
    let newData = {
      _id: user._id,
      projects: user.projects.filter((each) => {
        return each.id !== target.id;
      }),
    };
    deleteProject(newData);
  };

  const handleNewProject = (e) => {
    e.preventDefault();
    if (newProject) {
      let newData = {
        _id: user._id,
        projects: [
          ...user.projects,
          { name: newProject, id: Math.round(Math.random() * 10000000000) },
        ],
      };
      newData;
      createProject(newData);
    }
    e.target.reset();
  };

  return (
    <div className="addModal" onClick={closeModal}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_header">
          <form className="todo_header" onSubmit={handleNewProject}>
            <h1 className="header_title">Projects</h1>
            <input
              type="text"
              className="todo_tb"
              placeholder="New Project"
              onChange={(e) => {
                setNewProject(e.target.value.trim());
              }}
            />
          </form>
        </div>
        <div className="modal_body">
          {user &&
            user.projects.map((each) => {
              return (
                <div
                  key={each.id}
                  className="project_card"
                  onClick={() => {
                    dispach({ type: "setproject", payload: each.id });
                    closeModal();
                  }}
                >
                  <p>{each.name}</p>
                  <div onClick={preventBubbling}>
                    <div
                      className="delete_project"
                      onClick={() => {
                        handleDeleteProject(each);
                      }}
                    >
                      <RxCross2 />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AddModal;
