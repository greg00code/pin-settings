// PIN Protection for Bubble.io
(function() {
    class BubblePinProtection {
        constructor(options = {}) {
            this.container = options.container || document.createElement('div');
            this.password = options.password || '1234';
            this.initialize();
        }

        initialize() {
            // Création du HTML pour le PIN uniquement
            this.container.innerHTML = `
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

            // Ajout des événements
            const button = this.container.querySelector('#unlock-btn');
            const input = this.container.querySelector('#pin-input');
            const errorMsg = this.container.querySelector('#error-msg');

            const tryUnlock = () => {
                if (input.value === this.password) {
                    errorMsg.style.color = 'green';
                    errorMsg.textContent = 'Accès autorisé !';
                    errorMsg.style.display = 'block';
                    
                    // Déclencher le workflow Bubble
                    if (window.bubble) {
                        bubble.triggerWorkflow('unlock_settings');
                        
                        // Manipulation directe des groupes avec les noms exacts
                        const settingsLock = document.querySelector('[bubble-element="Group Settings_Lock"]');
                        const settingsContent = document.querySelector('[bubble-element="Group Settings_Content"]');
                        
                        if (settingsLock) {
                            settingsLock.style.display = 'none';
                            console.log('Groupe verrouillage masqué');
                        }
                        if (settingsContent) {
                            settingsContent.style.display = 'block';
                            console.log('Groupe contenu affiché');
                        }
                    }
                } else {
                    input.value = '';
                    errorMsg.style.color = 'red';
                    errorMsg.textContent = 'Code PIN incorrect';
                    errorMsg.style.display = 'block';
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
