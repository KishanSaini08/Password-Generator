import { useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '1234567890';
    if (characterAllowed) str += '~!@#$%^&*()';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed]);

  return (
    <>
      <div style={{ backgroundColor: 'gray', color: '#fff', padding: '4rem 6rem', margin: '0 8rem' }}>
        <h1 style={{ color: '#fff' }}>Password Generator</h1>
        <div>
          <input
            type="text"
            value={password}
            style={{ padding: '1rem 2rem', border: 'none' }}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            style={{ padding: '0.9rem 2rem', backgroundColor: 'blue', color: 'white' }}
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-1" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
