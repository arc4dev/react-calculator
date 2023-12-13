import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import App from '../App';

const performOperation = (operations: string[]) => {
  operations.forEach((operation) => {
    userEvent.click(screen.getByRole('button', { name: operation }));
  });
};

describe('App rendering', () => {
  it('renders Calculator', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Calculator operations', () => {
  it('should add two number properly', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['1', '+', '5', '+', '9', '=']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('15');
  });

  it('should subtract two number properly', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['8', '-', '5', '-', '1', '=']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('2');
  });

  it('should multiply two number properly', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['3', 'x', '4', 'x', '2', '=']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('24');
  });

  it('should divide two number properly', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['9', '0', '÷', '5', '=']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('18');
  });

  it('should clear the result', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['9', '÷', '3', 'AC', '0', 'AC']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('0');
  });

  it('should delete the last digit', () => {
    // arrange
    render(<App />);

    // act
    act(() => {
      performOperation(['5', '4', '2', 'DEL', 'DEL']);
    });

    // assert
    const currentResult = screen.getByTestId('current-result');
    expect(currentResult).toHaveTextContent('5');
  });
});
