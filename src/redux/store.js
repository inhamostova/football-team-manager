import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './teamSlice';
import { playerReducer } from './playerSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    players: playerReducer,
  },
});
