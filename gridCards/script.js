const grid = document.getElementById('grid');

const usernames = [
    'zCaio79', // Exemplo de usuário
    'Felipesargi', // Exemplo de usuário
    'PauloSvieira', // Exemplo de usuário
    ];

async function fetchUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
    }
    return await response.json();
}

async function displayUsers() {
    try {
        const userPromises = usernames.map(username => fetchUserData(username));
        const users = await Promise.all(userPromises);

        users.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.name}">
                <h2>${user.name || user.login}</h2>
                <a href="${user.html_url}" target="_blank">Ver perfil no GitHub</a>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

displayUsers();
