import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../homepage';
import StandardLayout from './standard-layout.component';

export const StandardLayoutRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StandardLayout />}>
          {/* Nested routes */}
          {/* Home route */}
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default StandardLayoutRouter;
