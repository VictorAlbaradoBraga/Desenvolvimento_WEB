import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx';
import Funcionarios from './pages/Funcionarios.jsx';
import Produtos from './pages/Produtos.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/funcionarios", element: <Funcionarios /> },
      { path: "/produtos", element: <Produtos /> },

    ],
  },
  { path: '*', element: <div>Erro: Página não encontrada</div> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
