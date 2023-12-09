import { useReducer } from 'react';

import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import ActionButton from './ActionButton';

export const actions = {
  CLEAR: 'CLEAR',
  DELETE_NUMBER: 'DELETE_NUMBER',
  ADD_NUMBER: 'ADD_NUMBER',
  CHOOSE_OPERATOR: 'CHOOSE_OPERATOR',
  COMPUTE: 'COMPUTE',
};

const initialState = {
  previousOperand: null,
  currentOperand: '0',
  operator: null,
};

const reducer = (state, { type, payload }) => {
  const computeResult = (operator, num1, num2) => {
    let computation;

    switch (operator) {
      case '+':
        computation = num1 + num2;
        break;
      case '-':
        computation = num1 - num2;
        break;
      case 'x':
        computation = num1 * num2;
        break;
      case '÷':
        computation = num1 / num2;
        break;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }

    return String(computation);
  };

  switch (type) {
    case actions.ADD_NUMBER:
      if (state.currentOperand.includes('.') && payload === '.') return state;
      if (state.currentOperand === '0' && payload === '0') return state;
      if (state.currentOperand === '0')
        return {
          ...state,
          currentOperand: payload,
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload}`,
      };

    case actions.CHOOSE_OPERATOR:
      if (state.currentOperand === '0' && state.previousOperand === null)
        return state;

      if (state.operator && state.currentOperand !== '0') {
        const computation = computeResult(
          state.operator,
          parseFloat(state.previousOperand),
          parseFloat(state.currentOperand)
        );

        return {
          ...state,
          previousOperand: computation,
          currentOperand: '0',
          operator: payload,
        };
      }

      if (state.currentOperand === '0')
        return {
          ...state,
          operator: payload,
        };

      return {
        ...state,
        operator: payload,
        previousOperand: state.currentOperand,
        currentOperand: '0',
      };

    case actions.CLEAR:
      return initialState;

    case actions.DELETE_NUMBER:
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: '0' };

      if (state.currentOperand === '0') return state;

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case actions.COMPUTE:
      if (!state.operator) return state;

      const computation = computeResult(
        state.operator,
        parseFloat(state.previousOperand),
        parseFloat(state.currentOperand)
      );

      return {
        ...state,
        previousOperand: null,
        currentOperand: computation,
        operator: null,
      };

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

function App() {
  const [{ previousOperand, currentOperand, operator }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <h1 className="heading">
        <span>Calc</span>ulator
      </h1>

      <div className="calculator">
        <div className="output">
          <span className="previous-operand">
            {previousOperand}
            {operator}
          </span>
          <p className="current-operand">{currentOperand}</p>
        </div>

        <ActionButton
          dispatch={dispatch}
          type={actions.CLEAR}
          className="span-two">
          AC
        </ActionButton>
        <ActionButton dispatch={dispatch} type={actions.DELETE_NUMBER}>
          DEL
        </ActionButton>
        <OperationButton dispatch={dispatch}>÷</OperationButton>
        <DigitButton dispatch={dispatch}>1</DigitButton>
        <DigitButton dispatch={dispatch}>2</DigitButton>
        <DigitButton dispatch={dispatch}>3</DigitButton>
        <OperationButton dispatch={dispatch}>x</OperationButton>
        <DigitButton dispatch={dispatch}>4</DigitButton>
        <DigitButton dispatch={dispatch}>5</DigitButton>
        <DigitButton dispatch={dispatch}>6</DigitButton>
        <OperationButton dispatch={dispatch}>+</OperationButton>
        <DigitButton dispatch={dispatch}>7</DigitButton>
        <DigitButton dispatch={dispatch}>8</DigitButton>
        <DigitButton dispatch={dispatch}>9</DigitButton>
        <OperationButton dispatch={dispatch}>-</OperationButton>
        <DigitButton dispatch={dispatch}>0</DigitButton>
        <DigitButton dispatch={dispatch}>.</DigitButton>
        <ActionButton
          dispatch={dispatch}
          type={actions.COMPUTE}
          className="span-two operator">
          =
        </ActionButton>
      </div>

      <footer className="footer">
        <span>&copy; 2023 Arkadiusz Sroczyk.</span>
      </footer>
    </>
  );
}

export default App;
