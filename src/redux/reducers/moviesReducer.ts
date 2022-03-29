import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import { MoviePayload } from '../actions';

export interface MovivesState {
  lstMovies: Array<MovieType>
}

const initialState: MovivesState = {
  lstMovies: [],
}

export const moviesReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    
    setData: (state, action: PayloadAction<Array<MovieType>>) => {
      state.lstMovies = action.payload
    },
  },
});

export type MovieType = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: Array<Number>,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
};

export const { setData } = moviesReducer.actions

export default moviesReducer.reducer