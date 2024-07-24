const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value; 

    const response = await fetch(`/veiculos/${id}`, {  
        method: 'DELETE',  
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log('veículo excluído:', data);
});
