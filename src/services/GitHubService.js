export class GitHubService {
    constructor() {
        this.baseUrl = 'https://api.github.com/users';
    }

    async fetchUserRepositories(username) {
        if (!/^[a-zA-Z0-9-]+$/.test(username)) {
            throw new Error('Formato de usuário inválido.');
        }

        const response = await fetch(`${this.baseUrl}/${encodeURIComponent(username)}/repos?per_page=100`);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Cientista de dados não encontrado.');
            if (response.status === 403) throw new Error('Limite de varredura da API excedido.');
            throw new Error('Anomalia de comunicação com os servidores.');
        }

        const repos = await response.json();
        return repos.map((repo) => this._mapToCelestialBody(repo));
    }

    _mapToCelestialBody(repo) {
        return {
            id: repo.id,
            name: repo.name,
            language: repo.language || 'Unknown',
            mass: repo.stargazers_count + repo.forks_count + 1,
            url: repo.html_url,
        };
    }
}
