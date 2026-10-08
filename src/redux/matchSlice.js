import { createSlice } from '@reduxjs/toolkit';

export const MATCH_STATUS = {
  notStarted: 'not started',
  live: 'live',
  finished: 'finished',
};

const initialState = {
  opponent: '',
  ourScore: 0,
  opponentScore: 0,
  status: MATCH_STATUS.notStarted,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setOpponent(state, action) {
      state.opponent = action.payload;
    },
    startMatch(state) {
      state.status = MATCH_STATUS.live;
    },
    goalForUs(state) {
      state.ourScore += 1;
    },
    goalForOpponent(state) {
      state.opponentScore += 1;
    },
    finishMatch(state) {
      state.status = MATCH_STATUS.finished;
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
