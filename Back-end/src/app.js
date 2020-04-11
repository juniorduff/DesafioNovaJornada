const express = require("express");
const cors = require("cors");
 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => 
{
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const {title,url,techs,likes } = request.body;
 
  const repositorie = {id: uuid(), title,url,techs,likes:0};
  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const {title,url,techs} =  request.body;
  const { id } = request.params;

  const RepositoriesIndex  = repositories.findIndex(repostorie => repostorie.id == id);
  // TODO
  if(RepositoriesIndex<0){
    return response.status(400).json({error: 'Repositorie  not found'})
  }


  const repositorie = {
    id,
    url,
    title,
    techs,
  };
  repositories[RepositoriesIndex] = repositorie;
  return response.json(repositorie)
  

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const RepositoriesIndex  = repositories.findIndex(repostorie => repostorie.id == id);

  if(RepositoriesIndex<0){
    return response.status(400).json({error: 'Repositorie  not found'})
  }
  repositories.splice(RepositoriesIndex,1);
  return response.status(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const RepositoriesIndex  = repositories.findIndex(repostorie => repostorie.id == id);

  if(RepositoriesIndex<0){
    return response.status(400).json({error: 'Repositorie  not found'})
  }



   
 
  repositories[RepositoriesIndex].likes +=1;


  return response.json(RepositoriesIndex);

});

module.exports = app;
