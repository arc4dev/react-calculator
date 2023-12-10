type AppState = {
  previousOperand: string | null;
  currentOperand: string;
  operator: string | null;
};

type NullActionTypes =
  | {
      type: 'CLEAR';
      payload: null;
    }
  | {
      type: 'DELETE_NUMBER';
      payload: null;
    }
  | {
      type: 'COMPUTE';
      payload: null;
    };

type ActionTypes =
  | { type: 'ADD_NUMBER'; payload: string }
  | { type: 'CHOOSE_OPERATOR'; payload: string }
  | NullActionTypes;
