import React from 'react';

//Header recebendo um objeto como parâmetro
//pode ser trata pelos atribudos nomeados
//props.title
//ou pelas propriedades de DOM - herança
//props.cheldren

//ao invés de passar o objeto todo [Header(props)]
//pode ser passado apenas a propriedade q interssa
function Header({children}) {
    return (
      <header>
            <h2>{children}</h2>
      </header>
    );
  }
  
export default Header;
  