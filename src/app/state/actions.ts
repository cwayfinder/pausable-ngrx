import { createAction, props } from '@ngrx/store';

export const move = createAction('[Dot] Move', props<{ x: number; y: number }>());
export const changeColor = createAction('[Dot] Change color', props<{ color: string }>());
export const changeSize = createAction('[Dot] Change size', props<{ size: number }>());
