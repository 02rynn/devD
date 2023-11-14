import './App.css';
import { useState } from 'react';
import { debounce } from './debounce';

function App() {
  const [inputValue, setInputValue] = useState('기본값입니다');

  const debounceUserInput = debounce((e) => {
    return e.target.value;
  }, 1000);

  const cancelDelayedInput = debounceUserInput.cancel;

  const handleChangeUserInput = (e) => {
    cancelDelayedInput();
    delayInput(e);
  };

  const delayInput = (e) => {
    //주어진 시간동안 대기 후, 입력값 뱉어줌
    debounceUserInput.debounced(e).then((value) => {
      setInputValue(value);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>정혜린</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="값을 입력하세요"
          onChange={handleChangeUserInput}
        />
        <div className="showInput">입력값: {inputValue}</div>
      </main>
    </div>
  );
}

export default App;
