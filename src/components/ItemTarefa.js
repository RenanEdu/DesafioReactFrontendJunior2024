import React from 'react';
function ItemTarefa({ tarefa }) {
  return (
    <div className="item-tarefa">
      <input type="checkbox" checked={tarefa.concluida} onChange={() => {}} />
      <span>{tarefa.titulo}</span>
      <button onClick={() => {}}>Remover</button>
    </div>
  );
}

export default ItemTarefa;