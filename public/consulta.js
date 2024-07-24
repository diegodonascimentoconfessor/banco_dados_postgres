document.addEventListener('DOMContentLoaded', () => {
carregarVeiculos();
const  form = document.getElementById('formConsulta');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    carregarVeiculos();

});

});

async function carregarVeiculos(){

    try {
        const response = await fetch('/veiculos');
        const data = await response.json();

        const tabelaVeiculos = document.getElementById('tabelaVeiculos');
        tabelaVeiculos.innerHTML= '' ;

        data.forEach(veiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${veiculo.id}<td>
            <td>${veiculo.marca}<td>
            <td>${veiculo.modelo}<td>
            <td>${veiculo.ano}<td>
            `
            ;
           tabelaVeiculos.appendChild(row);
                
            });
                
            } catch (error){
                console.error('erro ao carregar veiculos', error);
            }

        }
 