import './App.css';
import Starter from './components/Starter';
import Questions from './components/Questions';
import Modal from './components/Modal';
import { useSelector } from 'react-redux'

function App() {
  const { displayQuestion } = useSelector((state) => state.question.value);
  const { modalDisplay } = useSelector((state) => state.modal.value)
  
  return (
    <main>
      <div className="container">
        <Starter />
        {
          displayQuestion && <Questions />
        }
        {modalDisplay && <Modal />}
      </div>
    </main>
  );
}

export default App;