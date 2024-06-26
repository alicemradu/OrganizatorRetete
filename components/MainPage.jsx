import React from 'react';

function NavLink({ to, children }) {
  return <a href={to} className={`mx-4`}>
    {children}
  </a>
}

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <h1 className="main-title">Coltul tau de Retete</h1>
        <p className="main-description">"Descoperă savoarea autentică a bucătăriei la Colțul tău de rețete – locul unde pasiunea pentru gătit întâlnește inspirația culinară!</p>
      </div>
    </div>
  );
}

export default MainPage;
