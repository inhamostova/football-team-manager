import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './teamSlice';
import { playerReducer } from './playerSlice';
import { matchReducer } from './matchSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    players: playerReducer,
    match: matchReducer,
  },
});
