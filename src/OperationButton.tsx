type Props = {
  children: string;
  dispatch: (action: ActionTypes) => void;
};

function OperationButton({ children, dispatch }: Props) {
  return (
    <button
      onClick={() => dispatch({ type: 'CHOOSE_OPERATOR', payload: children })}
      className="operator">
      {children}
    </button>
  );
}

export default OperationButton;
