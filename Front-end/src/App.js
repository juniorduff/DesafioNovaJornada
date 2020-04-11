import  React,{ useState, useEffect  }from 'react';

import api from './services/api';
import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);
  useEffect(() => {
    
      api.get('/repositories').then(respose => {
        setRepositorys(respose.data);

      })
   
  }, [])



  async function handleAddRepository() {
    // TODO
        const response  = await api.post('repositories',{
            "title": "Desafio Node2",		
            "url":"https://github.com/juniorduff/DesafioNovaJornada.git",
            "techs": ["Node.js", "..."],
            "likes": 0 

        });
        const repository = response.data;
        setRepositorys([...repositorys,repository]);

  }

  async function handleRemoveRepository(id) {


  await  api.delete(`repositories/${id}`)
  setRepositorys(repositorys.filter(repository =>repository.id !== id ));
 
    // TODO
  }
    
  return (
    <div>
      <ul>   
      {repositorys.map(repository =>
      <li key={repository.id}>
      {repository.title}     
                  
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li> )}       
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
