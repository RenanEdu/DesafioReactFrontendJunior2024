const apiUrl = 'https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos';

async function fetchApiData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erro ao fazer a solicitação');
    }
    const data = await response.json();
    console.log('Dados da API:', data);
    return data;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
   
  }
}

fetchApiData();