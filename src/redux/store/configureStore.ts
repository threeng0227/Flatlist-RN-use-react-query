import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../reducers/moviesReducer';
const store = configureStore({
  reducer: {
    movies: moviesReducer
  },
})


export {store};
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
