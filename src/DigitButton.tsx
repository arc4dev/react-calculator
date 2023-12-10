type Props = {
  children: string;
  dispatch: (action: ActionTypes) => void;
};

function DigitButton({ children, dispatch }: Props) {
  return (
    <button onClick={() => dispatch({ type: 'ADD_NUMBER', payload: children })}>
      {children}
    </button>
  );
}

export default DigitButton;
