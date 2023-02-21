import type { MovieResponse, TVResponse } from '@/types/typings';
import axios from 'axios';

export const getMoviesInTheatre = async () => {
  const response = await axios.get<MovieResponse>('/api/movies/now_playing');
  response.data.type = 'movie';
  return response;
};

export const getTrendingMovies = async () => {
  const response = await axios.get<MovieResponse>('api/misc/trending?type=movie');
  response.data.type = 'movie';
  return response;
};

export const getSeriesPlaying = async () => {
  const response = await axios.get<TVResponse>('/api/tv/airing_today');
  response.data.type = 'tv';
  return response;
};

export const getTrendingSeries = async () => {
  const response = await axios.get<TVResponse>('api/misc/trending?type=tv');
  response.data.type = 'tv';
  return response;
};
