
 import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
 import { Provider } from 'react-redux';
 import { store } from './src/redux/store/configureStore';
import MoviesScreen from './src/screen/Movies';

 const App = () => {
  const queryClient = new QueryClient();
   return (
     <Provider store={store}>
       <QueryClientProvider client={queryClient}>
       <MoviesScreen />
     </QueryClientProvider>
        
     </Provider>
   );
 };

 export default App;