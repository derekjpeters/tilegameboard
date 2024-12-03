//GameBoard.js: Manages the puzzle logic and grid rendering
import React, {useState, useEffect} from "react";
import Tile from './Tile'; 
import './GameBoard.css'; 

function GameBoard({ gridSize }) {
    const [tiles, setTiles] = useState([]); // State to hold the current tile positions
    const [isSolved, setIsSolved] = useState(false); // State to track if the puzzle is solved
  
    // Initialize and shuffle the tiles when the component mounts
    useEffect(() => {
      // Create an array with numbers from 1 to gridSize^2
      const initialTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
      setTiles(shuffle(initialTiles)); // Shuffle the tiles and set to state
    }, [gridSize]);
  
    // Function to shuffle an array using Fisher-Yates algorithm
    const shuffle = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
      }
      return shuffled;
    };
  
    // Function to swap two tiles and update state
    const swapTiles = (index1, index2) => {
      const newTiles = [...tiles]; // Create a copy of the current tiles
      [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]]; // Swap the tiles
      setTiles(newTiles); // Update state
      checkIfSolved(newTiles); // Check if the puzzle is solved
    };
  
    // Function to check if the puzzle is solved
    const checkIfSolved = (tiles) => {
      // Puzzle is solved if all tiles are in sequential order
      setIsSolved(tiles.every((tile, index) => tile === index + 1));
    };

    return (
        <div>
          {/* Render the grid of tiles */}
          <div className="game-board">
            {tiles.map((tile, index) => (
                <Tile
                key={index} //Unique key for React rendering
                value={tile} //The number displayed on the tile
                index={index} //The current index of the tile
                onClick={() => {
                    //Swap the clicked tile with the next tile
                    if (index < tiles.length -1) {
                        swapTiles(index, index+1)
                    }
                }}
                />
            ))}
          </div>
          {/*Display a message if the puzzle is solved*/}
          {isSolved && <p>Congradulations! You have solved the puzzle</p>}
        </div>
    );
}

export default GameBoard;