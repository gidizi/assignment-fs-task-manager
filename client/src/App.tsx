import { RecoilRoot } from 'recoil'
import TaskForm from './components/TaskForm/taskForm'
import TasksList from './components/TaskList/TaskList'
import ModalComponet from './components/modalComponent/ModalComponet'
import "./App.scss"

function App() {

  return (
    <RecoilRoot>
      <div className='app-wrapper'>
        <div className="task-manager">
          <div className='task-list-wrapper'>
            <TasksList />
          </div>
          <div className='task-form-wrapper'>
            <TaskForm />
          </div>
        </div>
      </div>
      <ModalComponet />
    </RecoilRoot>
  )
}

export default App
