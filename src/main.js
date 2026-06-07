import { AstroEngine } from './engine/AstroEngine.js';

class AppController {
    constructor(astroEngine) {
        this.engine = astroEngine;
        this.initEventListeners();
    }

    initEventListeners() {
        const btn = document.getElementById('explore-btn');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSearchMock();
        });
    }

    handleSearchMock() {
        const statusEl = document.getElementById('status-message');
        statusEl.textContent = 'Iniciando simulação orbital isolada...';

        try {
            const mockData = this._generateMockData();

            statusEl.textContent = `Simulação ativa: ${mockData.length} sistemas estelares em órbita.`;

            this.engine.loadGalaxy(mockData);
            this.engine.startRenderLoop();
        } catch (error) {
            statusEl.textContent = 'Falha crítica na renderização da simulação.';
            this.engine.destroy();
            console.error(error);
        }
    }

    _generateMockData() {
        return [
            { id: 101, name: 'core-api', language: 'TypeScript', mass: 45, url: '#' },
            { id: 102, name: 'web-client', language: 'JavaScript', mass: 30, url: '#' },
            { id: 103, name: 'data-pipeline', language: 'Python', mass: 25, url: '#' },
            { id: 104, name: 'infra-tools', language: 'Go', mass: 20, url: '#' },
            { id: 105, name: 'design-system', language: 'CSS', mass: 15, url: '#' },
        ];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const graphicsEngine = new AstroEngine('universe-canvas');
    new AppController(graphicsEngine);
});
