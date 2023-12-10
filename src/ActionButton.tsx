type Props = {
  children: string;
  dispatch: (action: NullActionTypes) => void;
  type: NullActionTypes['type'];
  className?: string;
};

function ActionButton({ children, dispatch, type, className }: Props) {
  return (
    <button
      onClick={() => dispatch({ type, payload: null })}
      className={`action ${className}`}>
      {children}
    </button>
  );
}

export default ActionButton;
