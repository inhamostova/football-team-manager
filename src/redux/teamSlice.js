import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    name: 'Kolos',
    formation: '4-4-2',
  },
  reducers: {
    changeTeamName(state, action) {
      if (!action.payload) {
        return state;
      }
      state.name = action.payload;
    },
    changeFormation(state, action) {
      if (!action.payload) {
        return state;
      }
      state.formation = action.payload;
    },
  },
});

export const { changeFormation, changeTeamName } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
