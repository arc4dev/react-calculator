function ActionButton({ children, dispatch, type, className }) {
  return (
    <button
      onClick={() => dispatch({ type, payload: null })}
      className={`action ${className}`}>
      {children}
    </button>
  );
}

export default ActionButton;
