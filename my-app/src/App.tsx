import React, { ChangeEvent, useState } from 'react';
import { debounce } from './debounce';

interface DebounceOptions {
  wait: number;
  immediate: boolean;
}

function App() {
  const [inputValue, setInputValue] = useState<string>('기본값입니다');

  //wait은 지연시간, immediate는 즉시실행 유무
  const debounceUserInput = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      return e.target.value;
    },
    { wait: 1000, immediate: false } as DebounceOptions
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceUserInput.debounced(e).then(() => {
      //프로미스가 resolve되면 값을 set
      setInputValue(e.target.value);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>데브디 코딩테스트 - 정혜린</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="값을 입력하세요"
          onChange={handleChange}
        />
        <div className="showInput">입력값: {inputValue}</div>
      </main>
    </div>
  );
}

export default App;
