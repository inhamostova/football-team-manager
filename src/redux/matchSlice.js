import { createSlice } from '@reduxjs/toolkit';

const matchStatus = {
  notStarted: 'not started',
  live: 'live',
  finished: 'finished',
};

const initialState = {
  opponent: '',
  ourScore: 0,
  opponentScore: 0,
  status: matchStatus.notStarted,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setOpponent(state, action) {
      state.opponent = action.payload;
    },
    startMatch(state) {
      state.status = matchStatus.live;
    },
    goalForUs(state) {
      state.ourScore += 1;
    },
    goalForOpponent(state) {
      state.opponentScore += 1;
    },
    finishMatch(state) {
      state.status = matchStatus.finished;
    },
    resetMatch() {
      return initialState;
    },
  },
});

export const {
  setOpponent,
  startMatch,
  goalForOpponent,
  goalForUs,
  finishMatch,
  resetMatch,
} = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
