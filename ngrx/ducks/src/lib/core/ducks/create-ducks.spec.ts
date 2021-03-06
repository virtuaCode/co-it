import { createDucks } from './create-ducks';
import { wireUpActions } from '../wired-actions/wire-up-actions';
import { ActionDispatcher } from '../types/__internal__/';

import { Ducks } from '../types';

interface State {
  count: number;
}

interface RootState {
  counter: State;
}

class Counter {
  forEffect = '[Counter] Load Counter from API';

  set(state: State, payload: number): State {
    return {
      ...state,
      count: payload
    };
  }
}

describe('create-ducks', () => {
  describe('When a type provides action types to trigger asynchronous operations', () => {
    let counter: Counter;
    let dispatchMock: jest.Mock;
    let store: ActionDispatcher;
    let ducks: Ducks<Counter>;

    beforeEach(() => {
      counter = new Counter();

      dispatchMock = jest.fn();
      store = { dispatch: dispatchMock };

      const wiredActions = wireUpActions(Counter, {
        set: '[Counter] Set'
      });

      ducks = createDucks(wiredActions, store);
    });

    it('should make the type available through an additional property', () => {
      expect(ducks.forEffect.type).toBe(counter.forEffect);
    });

    it('should dispatch that action type', () => {
      ducks.forEffect.dispatch();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
