import { actions } from './App';

function OperationButton({ children, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: actions.CHOOSE_OPERATOR, payload: children })
      }
      className="operator">
      {children}
    </button>
  );
}

export default OperationButton;
