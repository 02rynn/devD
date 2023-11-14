import React, { ChangeEvent, useState } from 'react';
import { debounce } from './debounce';

interface DebounceOptions {
  wait: number;
  immediate: boolean;
}

function App() {
  const [inputValue, setInputValue] = useState<string>('기본값입니다');

  const debounceUserInput = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    { wait: 1000, immediate: false } as DebounceOptions
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceUserInput.debounced(e).then(() => {
      console.log('promise fullfilled');
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
