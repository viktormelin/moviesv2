import type { MovieResponse } from '@/types/typings';
import axios from 'axios';

export const getMoviesInTheatre = async () => {
  return await axios.get<MovieResponse>('/api/movies/now_playing');
};

export const getTrendingMovies = async () => {
  return await axios.get<MovieResponse>('api/misc/trending?type=movie');
};

export const getSeriesPlaying = async () => {
  return await axios.get<MovieResponse>('/api/tv/airing_today');
};

export const getTrendingSeries = async () => {
  return await axios.get<MovieResponse>('api/misc/trending?type=tv');
};
