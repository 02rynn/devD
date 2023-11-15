import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { debounce } from './debounce';

interface DebounceOptions {
  wait: number;
  immediate: boolean;
}

function App() {
  const [inputValue, setInputValue] = useState<string>('기본값입니다');
  const [wait, setWait] = useState<number>(1000);
  const [confirmWait, setConfirmWait] = useState<number>(wait);
  const [immediate, setImmediate] = useState<boolean>(false);

  //wait은 지연시간, immediate는 즉시실행 유무
  //함수를 통해 직접 변경하고 싶다면 wait: 5000, immediate:true/false로
  //값을 직접 변경할 수 있습니다.
  const debounceUserInput = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      return e.target.value;
    },
    { wait: confirmWait, immediate: immediate } as DebounceOptions
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceUserInput.debounced(e).then(() => {
      //프로미스가 resolve되면 값을 set
      setInputValue(e.target.value);
    });
  };

  const handleChangeWait = (e: ChangeEvent<HTMLInputElement>) => {
    const waitValue = parseInt(e.target.value);
    setWait(waitValue);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!wait) {
      alert('값을 입력해주세요. 기본 지연값은 1초 입니다');
      return;
    }
    alert(`지연값이${wait / 1000}초로 변경되었습니다`);
    setConfirmWait(wait);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      alert('debounce mode가 해제됩니다');
    } else {
      alert('debounce mode가 실행됩니다');
    }
    setImmediate(e.target.checked);
  };

  return (
    <div className="App">
      <header>
        <h1>데브디 코딩테스트 - 정혜린</h1>
      </header>
      <main>
        <div className="optionBox">
          <p> *지연시간은 단위는 ms입니다 (1000ms == 1초)</p>
          <p> {`*현재 지연설정 : ${confirmWait / 1000}초`}</p>
          <input
            type="number"
            placeholder="지연시간을 입력해주세요"
            onChange={handleChangeWait}
          />
          <button onClick={handleClick}>확인</button>
          <label>
            <input type="checkbox" onChange={handleRadioChange} />
            No debounce
          </label>
        </div>
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
