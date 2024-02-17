import React, { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleInputChange = (event) => {
    setNovaTarefa(event.target.value);
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([{ id: Date.now(), titulo: novaTarefa, concluida: false }, ...tarefas]);
      setNovaTarefa('');
    }
  };

  return (
    <div className="lista-de-tarefas">
      <h2>Lista de Tarefas</h2>
      <input type="text" value={novaTarefa} onChange={handleInputChange} placeholder="Digite o título da tarefa" />
      <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTarefas;
