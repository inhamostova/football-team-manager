import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const playerSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    addPlayer: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: data => {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
    },
    deletePlayer(state, action) {
      return state.filter(player => player.id !== action.payload);
    },
    addGoal(state, action) {
      const player = state.find(player => player.id === action.payload);
      if (player) player.goals += 1;
    },
  },
});

export const { addPlayer, deletePlayer, addGoal } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
