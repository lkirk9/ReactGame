import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Game = () => {
  const [movie1, setMovie1] = useState({});
  const [movie2, setMovie2] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => {
        setMovie1(response.data.movie1);
        setMovie2(response.data.movie2);
      })
      .catch(error => console.log(error));
  }, []);

  const handleGuess = (guess) => {
    const isHigher = movie2.rating >= movie1.rating;
    if ((guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher)) {
      setScore(score + 1);
      alert('Correct!');
    } else {
      setScore(0);
      alert('Incorrect. Try again!');
    }
    setMovie1(movie2);
    axios.get('http://localhost:5000/movies')
      .then(response => {
        setMovie2(response.data.movie2);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="movieCards ">
      <Card className='bg-dark text-white border-0 rounded-0 customCardClass'>
        <Card.Img src={movie1.poster} alt={movie1.title} className="h-100" />
        <Card.ImgOverlay className="rounded-0 border-0 d-flex justify-content-center align-items-center m-auto customCardClass p-0">
          <Card className='bg-dark text-white d-flex justify-content-center align-items-center m-auto bg-opacity-75 w-100 h-100 rounded-0 border-0 '>
            <Card.Title>{movie1.title} <br></br> has a rating of </Card.Title>
            <Card.Text>
             {movie1.rating}
            </Card.Text>
          </Card>
        </Card.ImgOverlay>
      </Card>
      <Card className='bg-dark text-white border-0 rounded-0 customCardClass'>
        <Card.Img src={movie2.poster} alt={movie2.title} className="h-100" />
        <Card.ImgOverlay className="rounded-0 border-0 d-flex justify-content-center align-items-center m-auto customCardClass p-0">
          <Card className='bg-dark text-white d-flex justify-content-center align-items-center m-auto bg-opacity-75 w-100 h-100 rounded-0 border-0 '>
            <Card.Title>{movie2.title} has a </Card.Title>
            <Button variant="success" onClick={() => {handleGuess('higher')}}>Higher</Button>
            <br></br>
            <Button variant="danger" onClick={() => {handleGuess('lower')}}>Lower</Button>
            <Card.Text>
              Rating than <br></br> {movie1.title} 
              <br></br>
              <p>Score: {score}</p>
            </Card.Text>
          </Card>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default Game;