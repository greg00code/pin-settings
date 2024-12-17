(function() {
    class BubblePinProtection {
        constructor(options = {}) {
             this.containerId = options.containerId || 'settings-gate';
            this.container = document.getElementById(this.containerId) || document.createElement('div');
            this.password = options.password || '1234';
            this.onUnlock = options.onUnlock || function(){};
            this.onFailure = options.onFailure || function(){};
            this.initialize();
        }

        initialize() {
             // Création du HTML pour le PIN uniquement
             this.pinElement = document.createElement('div')
            this.pinElement.innerHTML = `
                <div style="padding: 20px; max-width: 300px; margin: auto; text-align: center;">
                    <h3 style="margin-bottom: 20px;">Accès Protégé</h3>
                    <div>
                        <input type="password" 
                               id="pin-input"
                               placeholder="Entrez le code PIN"
                               style="padding: 10px; margin-bottom: 10px; width: 200px; text-align: center;"
                               maxlength="4">
                    </div>
                    <button id="unlock-btn" 
                            style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Déverrouiller
                    </button>
                    <div id="error-msg" style="color: red; margin-top: 10px; display: none;"></div>
                </div>
            `;
             this.container.appendChild(this.pinElement)

            // Ajout des événements
            const button = this.pinElement.querySelector('#unlock-btn');
            const input = this.pinElement.querySelector('#pin-input');
            const errorMsg = this.pinElement.querySelector('#error-msg');

            const tryUnlock = () => {
                if (input.value === this.password) {
                    errorMsg.style.color = 'green';
                    errorMsg.textContent = 'Accès autorisé !';
                    errorMsg.style.display = 'block';
                      // Appel du callback onUnlock()
                    this.onUnlock();

                } else {
                   input.value = '';
                   errorMsg.style.color = 'red';
                   errorMsg.textContent = 'Code PIN incorrect';
                    errorMsg.style.display = 'block';
                      // Appel du callback onFailure()
                    this.onFailure();

                }
            };

            button.addEventListener('click', tryUnlock);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    tryUnlock();
                }
            });
        }
    }

    window.BubblePinProtection = BubblePinProtection;
})();
