export class AstroEngine {
        constructor(canvasId) {
                    this.canvas = document.getElementById(canvasId);
                            this.ctx = this.canvas.getContext('2d', { alpha: false });
                                    this.celestialBodies = [];
                                            this.animationFrameId = null;
                                            
                                                    this._resize();
                                                            window.addEventListener('resize', () => this._resize());
        }
        
            _resize() {
                        this.canvas.width = window.innerWidth;
                                this.canvas.height = window.innerHeight;
                                        this.centerX = this.canvas.width / 2;
                                                this.centerY = this.canvas.height / 2;
            }
            
                              loadGalaxy(bodiesData) {
                                        this.celestialBodies = bodiesData.map((data, index) => {
                                                                    const orbitRadius = 60 + (index * 12);
                                                                                            const initialAngle = Math.random() * Math.PI * 2;
                                                                                                                                            const direction = index % 2 === 0 ? 1 : -1;
                                                                                                                                                        const angularVelocity = (Math.random() * 0.004 + 0.001) * direction;
                                                                                                                                                        
                                                                                                                                                                    return {
                                                                                                                                                                                        ...data,
                                                                                                                                                                                                                                                                                                                                                                                                                radius: Math.min(Math.max(data.mass * 0.3, 2), 12),
                                                                                                                                                                                                                        orbitRadius: orbitRadius,
                                                                                                                                                                                                                                        angle: initialAngle,
                                                                                                                                                                                                                                                        velocity: angularVelocity,
                                                                                                                                                                                                                                                                        color: this._getLanguageColor(data.language)
                                                                                                                                                                    };
                                        });
                              }

                                                _getLanguageColor(lang) {
                                                            const colors = {
                                                                            'JavaScript': '#f1e05a',
                                                                                        'Python': '#3572A5',
                                                                                                    'Java': '#b07219',
                                                                                                                'TypeScript': '#3178c6',
                                                                                                                            'C++': '#f34b7d',
                                                                                                                                        'HTML': '#e34c26',
                                                                                                                                                    'CSS': '#563d7c'
                                                            };
                                                                                                                                        return colors[lang] || '#8b949e';
                                                }

                                                                  startRenderLoop() {
                                                                                    if (this.animationFrameId) {
                                                                                                    cancelAnimationFrame(this.animationFrameId);
                                                                                    }
                                                                                            
                                                                                                    const loop = () => {
                                                                                                                    this._clearScreen();
                                                                                                                                                                                                                                                                this._updatePhysics();
                                                                                                                                                                                                                                                                                        this._drawBodies();
                                                                                                                                                        this.animationFrameId = requestAnimationFrame(loop);
                                                                                                    };
                                                                                                            
                                                                                                                    loop();
                                                                  }

                                                                      _clearScreen() {
                                                                                                                                                                this.ctx.fillStyle = '#03040b';
                                                                                        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                                                                      }

                                                                          _updatePhysics() {
                                                                                    for (const body of this.celestialBodies) {
                                                                                                                body.angle += body.velocity;

                                                                                                                                                    body.x = this.centerX + Math.cos(body.angle) * body.orbitRadius;
                                                                                                                                                                body.y = this.centerY + Math.sin(body.angle) * body.orbitRadius;
                                                                                    }
                                                                          }

                                                                              _drawBodies() {
                                                                                        for (const body of this.celestialBodies) {
                                                                                                        this.ctx.beginPath();
                                                                                                                    this.ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
                                                                                                                                this.ctx.fillStyle = body.color;
                                                                                                                                            this.ctx.fill();
                                                                                                                                                        this.ctx.closePath();
                                                                                        }
                                                                              }

                                                                                                destroy() {
                                                                                                            if (this.animationFrameId) {
                                                                                                                            cancelAnimationFrame(this.animationFrameId);
                                                                                                            }
                                                                                                                    this.celestialBodies = [];
                                                                                                                            this._clearScreen();
                                                                                                }
}
