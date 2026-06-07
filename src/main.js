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
        const mockData = [];
        const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Rust', 'Go', 'HTML', 'Ruby'];
        const prefixes = ['core', 'api', 'web', 'service', 'engine', 'data', 'auth', 'micro'];

        for (let i = 1; i <= 30; i++) {
            const lang = languages[Math.floor(Math.random() * languages.length)];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const mass = Math.floor(Math.random() * 80) + 5;

            mockData.push({
                id: 1000 + i,
                name: `${prefix}-system-${i}`,
                language: lang,
                mass: mass,
                url: `https://github.com/mock/${prefix}-system-${i}`,
            });
        }

        return mockData;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const graphicsEngine = new AstroEngine('universe-canvas');
    new AppController(graphicsEngine);
});
