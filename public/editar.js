
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;  
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;

    const response = await fetch(`/veiculos/${id}`, {  
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({marca, modelo, ano}),
    });

    const data = await response.json();
    console.log('veículo editado:', data);
});
