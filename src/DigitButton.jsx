import { actions } from './App';

function DigitButton({ children, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: actions.ADD_NUMBER, payload: children })}>
      {children}
    </button>
  );
}

export default DigitButton;
