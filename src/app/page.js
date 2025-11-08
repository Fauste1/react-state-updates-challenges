
/**
 * 
 * Challenge 1 of 3: Fix incorrect state updates 
 * 
 * This form has a few bugs. Click the button that increases the score a few times.
 * Notice that it does not increase. Then edit the first name, and notice that
 * the score has suddenly “caught up” with your changes. Finally, edit the last name,
 * and notice that the score has disappeared completely.
 * 
 * Your task is to fix all of these bugs. As you fix them, explain why each of them happens.
 * 
 * Solution: 
 * Bug 1 - score not updating, because we're mutating an object directly instead of via useState.
 * Bug 2 - score "catching up" when we update first name, because that's when we call the setter with the object which includes the mutated score data
 * Bug 3 - score disappearing when we change last name, because of inproperly implemented setPlayer call. We need to include the object data as well & only then modify the property
 * 
 * Bonus: refactored handleFirstNameChange & handleLastNameChange into a single handleNameChange function
 */


'use client';

import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    setPlayer({
      ...player,
      score: player.score + 1
    });
  }

  function handleNameChange(e) {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          name="firstName"
          value={player.firstName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={player.lastName}
          onChange={handleNameChange}
        />
      </label>
    </>
  );
}
