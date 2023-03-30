const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

apiKey = process.env.apiKey
const app = express();
const port = 5000;

app.use(express.static('C://Users//LKIRK//Documents//Github//react project//server'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/movies', async (req, res) => {
  const page1 = Math.floor(Math.random() * 50) + 1;
  const page2 = Math.floor(Math.random() * 50) + 1;
  const moviesResponse1 = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&vote_count.gte=500&page=${page1}`);
  const moviesResponse2 = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&vote_count.gte=500&page=${page2}`);
  const moviesData1 = await moviesResponse1.data;
  const moviesData2 = await moviesResponse2.data;
  const movie1 = moviesData1.results[Math.floor(Math.random() * moviesData1.results.length)];
  const movie2 = moviesData2.results[Math.floor(Math.random() * moviesData2.results.length)];
  const movie1Data = {
    title: movie1.title,
    rating: movie1.vote_average,
    poster: `https://image.tmdb.org/t/p/w500/${movie1.poster_path}`
  };
  const movie2Data = {
    title: movie2.title,
    rating: movie2.vote_average,
    poster: `https://image.tmdb.org/t/p/w500/${movie2.poster_path}`
  };
  const movies = {
    movie1: movie1Data,
    movie2: movie2Data
  };
  res.send(movies);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});