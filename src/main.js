import { GitHubService } from './services/GitHubService.js';
import { AstroEngine } from './engine/AstroEngine.js';

class AppController {
    constructor(gitHubService, astroEngine) {
        this.service = gitHubService;
        this.engine = astroEngine;
        this.initEventListeners();
    }

    initEventListeners() {
        const btn = document.getElementById('explore-btn');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
    }

    async handleSearch() {
        const input = document.getElementById('github-username');
        const statusEl = document.getElementById('status-message');
        const username = input.value.trim();

        if (!username) {
            statusEl.textContent = 'Digite um usuário do GitHub para continuar.';
            return;
        }

        statusEl.textContent = 'Buscando repositórios reais no GitHub...';

        try {
            const repoData = await this.service.fetchUserRepositories(username);

            statusEl.textContent = `${repoData.length} repositórios encontrados para ${username}.`;

            this.engine.loadGalaxy(repoData);
            this.engine.startRenderLoop();
        } catch (error) {
            statusEl.textContent = error.message;
            this.engine.destroy();
            console.error(error);
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const apiService = new GitHubService();
    const graphicsEngine = new AstroEngine('universe-canvas');
    new AppController(apiService, graphicsEngine);
});
