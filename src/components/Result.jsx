import { useEffect, useRef } from 'react';

export default function Result({ result, resetGame }) {
  const modal = useRef(null);

  useEffect(() => modal.current.showModal());

  return (
    <dialog className="result" ref={modal}>
      <h1>You {result}!</h1>
      <button onClick={resetGame}>Play again!</button>
    </dialog>
  );
}
