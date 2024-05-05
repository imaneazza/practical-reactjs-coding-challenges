import "./App.scss"
import {ReactComponent as Add} from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import {taskList} from "./siteData/taskList"
import {useState} from "react";

const App = () => {
    const [showAddEditModal, setshowAddEditModal] = useState(false)
    const [showDeleteModal, setshowDeleteModal] = useState(false)
    const [taskLists, setTasklists] = useState<any[]>(taskList);
    const [currentTask, setcurrentTask] = useState<any>();
    const showDelete = (task: any) => {
        setcurrentTask(task);
        setshowDeleteModal(true)
    }
    const showEdit = (task: any) => {
        setcurrentTask(task);
        setshowAddEditModal(true)
    }
    const approuveAdd = (task: any) => {
        const taskad = {
            id: Math.random(),
            title: task.name,
            priority: task.priority,
            status: "To Do",
            progress: 0,
        }
        setTasklists(taskList => [taskad, ...taskList])
        setshowAddEditModal(false)
    }
    const confirmDelete = () => {

        setTasklists(taskList => taskList.filter(tas => tas.id != currentTask.id))
        setshowDeleteModal(false)
        setcurrentTask(null)
    }
    const confirmEdit = (task: any) => {

        setTasklists(taskList => {

            const list = [...taskLists];
            list.forEach((element, index) => {
                if (element.id == task.id) {
                    list[index] = task
                }
            })
            return list;
        })
        setshowAddEditModal(false)
        setcurrentTask(null)
    }

    function changeStatue(task: any) {
        const statusList=['To Do','In Progress','Done']
        let index= statusList.indexOf(task.status);
        if(index ==2)index = 0;
        else index ++;
        task.status=statusList[index];
        switch (task.status){
            case 'To Do': task.progress = 0;break;
            case 'In Progress': task.progress = 50;break;
            case 'Done': task.progress = 100;break;
        }
        setTasklists(taskList => {

            const list = [...taskLists];
            list.forEach((element, index) => {
                if (element.id == task.id) {
                    list[index] = task
                }
            })
            return list;
        })
    }

    return (
        <div className="container">
            <div className="page-wrapper">
                <div className="top-title">
                    <h2>Task List</h2>
                    <Button title="Add Task" icon={<Add/>} onClick={() => {
                        setshowAddEditModal(true)
                    }}/>
                </div>
                <div className="task-container">
                    {taskLists.map((task) => (
                        <TaskCard task={task} deleteModal={() => showDelete(task)} editTask={() => showEdit(task)} gotoStatus={()=>changeStatue(task)} key={task.id}/>
                    ))}
                </div>
            </div>
            {showAddEditModal && <AddEditTaskForm addTask={approuveAdd} closeModal={() => setshowAddEditModal(false)}
                                                  confirmEdit={confirmEdit}
                                                  task={currentTask}/>}
            {showDeleteModal &&
                <DeleteModal closeModal={() => setshowDeleteModal(false)} confirmDelete={confirmDelete}/>}
        </div>
    )
}

export default App
