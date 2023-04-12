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
      
      {/* top movie card */}
      <Card className='bg-dark text-white border-0 rounded-0 customCardClass'>
        <Card.Img src={movie1.poster} alt={movie1.title} className="h-100" />
        <Card.ImgOverlay className="rounded-0 border-0 d-flex justify-content-center align-items-center m-auto customCardClass p-0">
          <Card className='bg-dark text-white d-flex justify-content-center align-items-center m-auto bg-opacity-75 w-100 h-100 rounded-0 border-0 '>
            <Card.Title className="card-title fs-2">{movie1.title}</Card.Title>
            <Card.Text>
             has an average user rating of {movie1.rating}
            </Card.Text>
          </Card>
        </Card.ImgOverlay>
      </Card>

      {/* bottom movie card */}
      <Card className='bg-dark text-white border-0 rounded-0 customCardClass'>
        <Card.Img src={movie2.poster} alt={movie2.title} className="h-100" />
        <Card.ImgOverlay className="rounded-0 border-0 d-flex justify-content-center align-items-center m-auto customCardClass p-0">
          <Card className='bg-dark text-white d-flex justify-content-center align-items-center m-auto bg-opacity-75 w-100 h-100 rounded-0 border-0 '>
            <Card.Title className='card-title d-flex fs-2'>{movie2.title} </Card.Title>
            <Card.Text>
              <p className="d-flex m-0">has a </p>
            </Card.Text>
            <Button className="d-flex m-0" variant="success" onClick={() => {handleGuess('higher')}}>Higher</Button>
            <br></br>
            <Button className="d-flex mb-2" variant="danger" onClick={() => {handleGuess('lower')}}>Lower</Button>
            <Card.Text className="rating-text d-flex">
              Rating than
            </Card.Text>
            <Card.Text>
            {movie1.title} 
            </Card.Text>
            <Card.Text>
            <p className='mt-5 fs-3'>Score: {score}</p>
            </Card.Text>
          </Card>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default Game;