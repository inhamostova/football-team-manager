import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeFormation, changeTeamName } from '../redux/teamSlice';
import { addGoal, addPlayer, deletePlayer } from '../redux/playerSlice';
import {
  finishMatch,
  goalForOpponent,
  goalForUs,
  resetMatch,
  setOpponent,
  startMatch,
} from '../redux/matchSlice';

export const App = () => {
  const [isFormVisisble, setIsFormVisisble] = useState(false);
  const [isAddPlayerFormVisisble, setIsAddPlayerFormVisisble] = useState(false);

  const teamName = useSelector(state => state.team.name);
  const teamFormation = useSelector(state => state.team.formation);
  const players = useSelector(state => state.players);

  const opponent = useSelector(state => state.match.opponent);
  const ourScore = useSelector(state => state.match.ourScore);
  const opponentScore = useSelector(state => state.match.opponentScore);
  const matchStatus = useSelector(state => state.match.status);

  const dispatch = useDispatch();

  const handleEditTeamClick = () => {
    setIsFormVisisble(true);
  };

  const handleAddPlayerClick = () => {
    setIsAddPlayerFormVisisble(true);
  };

  const handleSubmitEditTeam = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const formation = form.elements.formation.value;
    dispatch(changeTeamName(name));
    dispatch(changeFormation(formation));
    form.reset();
    setIsFormVisisble(false);
  };

  const handleSubmitAddingPlayer = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const position = form.elements.position.value;
    const number = Number(form.elements.number.value);
    const goals = Number(form.elements.goals.value);
    const data = {
      name,
      position,
      number,
      goals,
    };
    dispatch(addPlayer(data));

    form.reset();
    setIsAddPlayerFormVisisble(false);
  };

  const enterOpponent = evt => {
    evt.preventDefault();
    const form = evt.target;
    dispatch(setOpponent(form.elements.opponent.value));
  };

  return (
    <>
      <h2>Team: {teamName}</h2>
      <h3>Formation: {teamFormation}</h3>
      <button onClick={handleEditTeamClick} type="button">
        Edit team
      </button>
      {isFormVisisble && (
        <form onSubmit={handleSubmitEditTeam}>
          <input type="text" name="name" placeholder="Enter new name..." />
          <input
            type="text"
            name="formation"
            placeholder="Enter new formation..."
          />
          <button type="submit">Edit</button>
        </form>
      )}
      <button onClick={handleAddPlayerClick} type="button">
        Add player
      </button>
      {isAddPlayerFormVisisble && (
        <form onSubmit={handleSubmitAddingPlayer}>
          <input type="text" name="name" placeholder="Player name..." />
          <input type="text" name="position" placeholder="Player position..." />
          <input type="number" name="number" placeholder="Player number..." />
          <input type="number" name="goals" placeholder="Goals..." />
          <button type="submit">Edit</button>
        </form>
      )}
      <ol>
        {players.map(player => (
          <li key={player.id}>
            <h3>{player.name}</h3>
            <p>{player.position}</p>
            <p># {player.number}</p>
            <p>
              {player.goals} ⚽️
              <button
                onClick={() => dispatch(addGoal(player.id))}
                type="button"
              >
                +
              </button>
            </p>
            <button
              onClick={() => dispatch(deletePlayer(player.id))}
              type="button"
            >
              X
            </button>
          </li>
        ))}
      </ol>

      {!opponent && (
        <form onSubmit={enterOpponent}>
          <input type="text" name="opponent" placeholder="Enter opponent..." />
          <button type="submit">Enter</button>
        </form>
      )}

      {opponent && (
        <div>
          <h2>⚽️ MATCH CENTER</h2>
          <h3>Opponent: {opponent}</h3>
          <h3>
            <span>Kolos {ourScore} </span> :{' '}
            <span>
              {opponentScore} {opponent}
            </span>
          </h3>
          <h3>Status: {matchStatus}</h3>
          <button onClick={() => dispatch(goalForUs())} type="button">
            ⚽️ Kolos goal
          </button>
          <button onClick={() => dispatch(goalForOpponent())} type="button">
            ⚽️ Opponent goal
          </button>
          <hr />
          <button onClick={() => dispatch(startMatch())} type="button">
            Start match
          </button>
          <button onClick={() => dispatch(finishMatch())} type="button">
            Finish match
          </button>
          <button onClick={() => dispatch(resetMatch())} type="button">
            Reset
          </button>
        </div>
      )}
    </>
  );
};
