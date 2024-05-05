import classNames from "classnames"
import {ReactComponent as Close} from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import {useState} from "react";

const AddEditTaskForm = ({addTask, closeModal, task, confirmEdit}: any) => {
    const [taskname, setTaskName] = useState(task ? task.title : '')
    const [selectedPriority, setpriority] = useState(task ? task.priority : 'low')
    const [validInput, setValidinput] = useState(task ? task.title.trim() !== '' : false)
    const mode = task ? 'edit' : 'add'
    const onAddData = (e: any) => {
        e.preventDefault()
        addTask({
            name: taskname, priority: selectedPriority
        })
    }
    const onconfirmEdit = (e: any) => {
        e.preventDefault()
        confirmEdit({
            ...task,
            title: taskname, priority: selectedPriority
        })
    }
    const confirmModal = (e: any) => {
        if (mode == 'add')
            onAddData(e);
        else onconfirmEdit(e)
    }
    return (
        <Modal>
            <form>
                <div className="add-edit-modal">
                    <div className="flx-between">
                        <span className="modal-title">Add Task </span>
                        <Close className="cp" onClick={closeModal}/>
                    </div>
                    <Input label="Task" placeholder="Type your task here..." onChange={({target}) => {
                        setTaskName(target.value);
                        setValidinput(target.value.trim() !== '')
                    }} name="title" value={taskname}/>
                    <div className="modal-priority">
                        <span>Priority</span>
                        <ul className="priority-buttons">
                            {["high", "medium", "low"].map((priority) => {
                                    let classes = classNames(priority)
                                    if (priority == selectedPriority) classes = classNames(`${priority}-selected`, priority)
                                    return <li key={priority} className={classes} onClick={() => setpriority(priority)}  >
                                        {priority}
                                    </li>
                                }
                            )}
                        </ul>
                    </div>
                    <div className="flx-right mt-50">
                        <Button title={mode == 'add' ? 'Add' : 'Edit'} onClick={confirmModal} disabled={!validInput}/>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default AddEditTaskForm
