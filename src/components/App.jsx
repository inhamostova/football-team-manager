import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeFormation, changeTeamName } from '../redux/teamSlice';
import { addGoal, addPlayer, deletePlayer } from '../redux/playerSlice';

export const App = () => {
  const [isFormVisisble, setIsFormVisisble] = useState(false);
  const [isAddPlayerFormVisisble, setIsAddPlayerFormVisisble] = useState(false);

  const teamName = useSelector(state => state.team.name);
  const teamFormation = useSelector(state => state.team.formation);
  const players = useSelector(state => state.players);

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
    </>
  );
};
