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
      state.map(player => {
        if (player.id === action.payload) {
          return (player.goals += 1);
        }
        return player;
      });
    },
  },
});

export const { addPlayer, deletePlayer, addGoal } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
