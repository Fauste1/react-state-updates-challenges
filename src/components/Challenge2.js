
/**
 * 
 * There is a draggable box on a static background. You can change the box’s color using the select input.
 * 
 * But there is a bug. If you move the box first, and then change its color, 
 * the background (which isn’t supposed to move!) will “jump” to the box position. 
 * But this should not happen: the Background’s position prop is set to initialPosition, 
 * which is { x: 0, y: 0 }. Why is the background moving after the color change?
 * 
 * Find the bug and fix it.
 * 
 * Cheap solution: hardcode the position value of Background to 0,0
 * Our solution: instead of referencing the actual initialPosition object in the position state object, we make a copy (by spreading) to prevent renders from setting the initialPosition values to the coordinates of the moved box.
 */

/**
 * 
 * Challenge 3: Implement the same thing using Immer
 * 
 */


import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, updateShape] = useImmer({
    color: 'orange',
    position: {
        ...initialPosition
    }
  });

  function handleMove(dx, dy) {
    updateShape(draft => {
        draft.position.x += dx
        draft.position.y += dy
    })
  }

  function handleColorChange(e) {
    updateShape(draft => {
        draft.color = e.target.value
    })
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
