import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { changeColor, changeSize, move } from './actions';

export interface DotState {
  position: { x: number, y: number };
  color: string;
  size: number;
}

const initialState: DotState = {
  position: { x: 0, y: 0 },
  color: 'red',
  size: 24,
};

const dotReducer = createReducer(
  initialState,
  on(move, (state, { x, y }) => ({ ...state, position: { x, y } })),
  on(changeColor, (state, { color }) => ({ ...state, color })),
  on(changeSize, (state, { size }) => ({ ...state, size })),
);

export interface AppState {
  dot: DotState;
}

export const reducers: ActionReducerMap<AppState> = {
  dot: dotReducer
};
