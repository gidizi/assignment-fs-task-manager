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
          <TasksList />
          <TaskForm />
        </div>
      </div>
      <ModalComponet />
    </RecoilRoot>
  )
}

export default App
