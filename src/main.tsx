import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './shared/styles/main.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './app/appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { store } from "./app/appStore";
import { Provider } from 'react-redux';
import { CartProvider } from './app/providers/CartProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CartProvider>
          <RouterProvider router={appRouter} />
        </CartProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
