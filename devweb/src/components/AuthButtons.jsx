import React, { useState } from 'react';
import Button from './Button.Jsx';

const AuthButtons = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Button text="Login" onClick={handleAuth} type="secondary" />
          <Button text="Cadastro" onClick={handleAuth} type="primary" />
        </>
      ) : (
        <Button text="Logout" onClick={handleAuth} type="primary" />
      )}
    </div>
  );
};

export default AuthButtons;
