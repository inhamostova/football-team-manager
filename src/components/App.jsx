import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeFormation, changeTeamName } from '../redux/teamSlice';

export const App = () => {
  const [isFormVisisble, setIsFormVisisble] = useState(false);

  const teamName = useSelector(state => state.team.name);
  const teamFormation = useSelector(state => state.team.formation);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsFormVisisble(true);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const formation = form.elements.formation.value;
    dispatch(changeTeamName(name));
    dispatch(changeFormation(formation));
    form.reset();
    setIsFormVisisble(false);
  };

  return (
    <>
      <h2>Team: {teamName}</h2>
      <h3>Formation: {teamFormation}</h3>
      <button onClick={handleClick} type="button">
        Edit team
      </button>
      {isFormVisisble && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter new name..." />
          <input
            type="text"
            name="formation"
            placeholder="Enter new formation..."
          />
          <button type="submit">Edit</button>
        </form>
      )}
    </>
  );
};
