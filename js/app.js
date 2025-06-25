/**
 * HealthFlow - Health Reminder Web App
 * Main Application JavaScript
 */

const HealthFlowApp = {
    // DOM Elements
    elements: {},
    
    // Timer variables
    timer: null,
    timeLeft: 0,
    totalTime: 50 * 60, // Default 50 minute work session
    phaseMarkers: [],
    nextPhaseIndex: 0,
    isRunning: false,
    
    // Reminder variables
    waterTime: 120 * 60,
    moveTime: 50 * 60,
    eyeTime: 20 * 60,
    waterEnabled: true,
    moveEnabled: true,
    eyeEnabled: true,
    
    // Notification sound
    notificationSound: null,
    
    init() {
        this.initElements();
        this.initEventListeners();
        this.initTheme();
        this.loadSettings();
        this.initNotificationSound();
    },
    
    initElements() {
        this.elements = {
            themeToggle: document.getElementById('themeToggle'),
            timerSection: document.getElementById('timerSection'),
            timerDisplay: document.getElementById('timerDisplay'),
            timerLabel: document.getElementById('timerLabel'),
            timerRing: document.getElementById('timerRing'),
            statusBar: document.getElementById('statusBar'),
            statusMessage: document.getElementById('statusMessage'),
            dismissBtn: document.getElementById('dismissBtn'),
            configureBtn: document.getElementById('configureBtn'),
            configModal: document.getElementById('configModal'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            cancelConfigBtn: document.getElementById('cancelConfigBtn'),
            saveConfigBtn: document.getElementById('saveConfigBtn'),
            customModal: document.getElementById('customModal'),
            closeCustomModalBtn: document.getElementById('closeCustomModalBtn'),
            cancelCustomBtn: document.getElementById('cancelCustomBtn'),
            saveCustomBtn: document.getElementById('saveCustomBtn'),
            
            // Work buttons
            startWorkBtn: document.getElementById('startWorkBtn'),
            stopWorkBtn: document.getElementById('stopWorkBtn'),
            startBtnText: document.getElementById('startBtnText'),
            
            // Reminder toggles and intervals
            waterToggle: document.getElementById('waterToggle'),
            moveToggle: document.getElementById('moveToggle'),
            eyeToggle: document.getElementById('eyeToggle'),
            waterInterval: document.getElementById('waterInterval'),
            moveInterval: document.getElementById('moveInterval'),
            eyeInterval: document.getElementById('eyeInterval'),
            
            // Configuration inputs
            waterConfigToggle: document.getElementById('waterConfigToggle'),
            moveConfigToggle: document.getElementById('moveConfigToggle'),
            eyeConfigToggle: document.getElementById('eyeConfigToggle'),
            waterConfig: document.getElementById('waterConfig'),
            moveConfig: document.getElementById('moveConfig'),
            eyeConfig: document.getElementById('eyeConfig'),
            waterConfigValue: document.getElementById('waterConfigValue'),
            moveConfigValue: document.getElementById('moveConfigValue'),
            eyeConfigValue: document.getElementById('eyeConfigValue'),
            
            // Custom timer inputs
            customMinutes: document.getElementById('customMinutes'),
            customLabel: document.getElementById('customLabel')
        };
    },
    
    initEventListeners() {
        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
        
        // Start work button
        this.elements.startWorkBtn.addEventListener('click', () => {
            this.startTimer(this.totalTime, 'Work Session');
            this.calculatePhaseMarkers();
            this.elements.stopWorkBtn.classList.remove('hidden');
        });

        // Stop work button
        this.elements.stopWorkBtn.addEventListener('click', () => {
            this.stopTimer();
            this.elements.stopWorkBtn.classList.add('hidden');
            this.elements.startBtnText.textContent = 'Start Working';
        });
        
        // Show configuration modal
        this.elements.configureBtn.addEventListener('click', () => {
            this.showConfigModal();
        });
        
        // Close modals
        this.elements.closeModalBtn.addEventListener('click', () => this.hideModal(this.elements.configModal));
        this.elements.cancelConfigBtn.addEventListener('click', () => this.hideModal(this.elements.configModal));
        
        if (this.elements.closeCustomModalBtn) {
            this.elements.closeCustomModalBtn.addEventListener('click', () => this.hideModal(this.elements.customModal));
        }
        if (this.elements.cancelCustomBtn) {
            this.elements.cancelCustomBtn.addEventListener('click', () => this.hideModal(this.elements.customModal));
        }
        
        // Save configuration
        this.elements.saveConfigBtn.addEventListener('click', () => {
            this.saveConfiguration();
        });
        
        // Save custom timer
        if (this.elements.saveCustomBtn) {
            this.elements.saveCustomBtn.addEventListener('click', () => {
                this.saveCustomTimer();
            });
        }
        
        // Dismiss notification
        this.elements.dismissBtn.addEventListener('click', () => {
            this.elements.statusBar.classList.add('translate-y-full');
        });
        
        // Update range value displays
        this.elements.waterConfig.addEventListener('input', () => {
            this.elements.waterConfigValue.textContent = this.elements.waterConfig.value;
        });
        
        this.elements.moveConfig.addEventListener('input', () => {
            this.elements.moveConfigValue.textContent = this.elements.moveConfig.value;
        });
        
        this.elements.eyeConfig.addEventListener('input', () => {
            this.elements.eyeConfigValue.textContent = this.elements.eyeConfig.value;
        });
    },
    
    initTheme() {
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    
    initNotificationSound() {
        this.notificationSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    },
    
    showConfigModal() {
        // Set current values in modal
        this.elements.waterConfigToggle.checked = this.waterEnabled;
        this.elements.moveConfigToggle.checked = this.moveEnabled;
        this.elements.eyeConfigToggle.checked = this.eyeEnabled;
        this.elements.waterConfig.value = this.waterTime / 60;
        this.elements.moveConfig.value = this.moveTime / 60;
        this.elements.eyeConfig.value = this.eyeTime / 60;
        this.elements.waterConfigValue.textContent = this.waterTime / 60;
        this.elements.moveConfigValue.textContent = this.moveTime / 60;
        this.elements.eyeConfigValue.textContent = this.eyeTime / 60;
        
        this.showModal(this.elements.configModal);
    },
    
    saveConfiguration() {
        this.waterEnabled = this.elements.waterConfigToggle.checked;
        this.moveEnabled = this.elements.moveConfigToggle.checked;
        this.eyeEnabled = this.elements.eyeConfigToggle.checked;
        this.waterTime = this.elements.waterConfig.value * 60;
        this.moveTime = this.elements.moveConfig.value * 60;
        this.eyeTime = this.elements.eyeConfig.value * 60;
        
        // Update UI
        this.elements.waterToggle.checked = this.waterEnabled;
        this.elements.moveToggle.checked = this.moveEnabled;
        this.elements.eyeToggle.checked = this.eyeEnabled;
        this.elements.waterInterval.textContent = this.waterTime / 60;
        this.elements.moveInterval.textContent = this.moveTime / 60;
        this.elements.eyeInterval.textContent = this.eyeTime / 60;
        
        // Save to localStorage
        this.saveSettings();
        
        this.hideModal(this.elements.configModal);
    },
    
    saveCustomTimer() {
        const minutes = parseInt(this.elements.customMinutes.value);
        if (minutes < 1 || minutes > 240) {
            alert('Please enter a value between 1 and 240 minutes');
            return;
        }

        const label = this.elements.customLabel.value || 'Custom Timer';
        this.startTimer(minutes * 60, label);
        this.hideModal(this.elements.customModal);
    },

    // Timer functions
    startTimer(seconds, label) {
        // Clear any existing timer
        clearInterval(this.timer);

        // Set up new timer
        this.totalTime = seconds;
        this.timeLeft = seconds;
        this.nextPhaseIndex = 0;
        this.isRunning = true;

        this.calculatePhaseMarkers();
        this.updateNextPhaseLabel();
        // Show time until first phase or total time if no phases
        const initialTimeToShow = this.phaseMarkers.length > 0 ? this.phaseMarkers[0].time : this.totalTime;
        this.updateTimerDisplay(initialTimeToShow);
        this.updateRing();

        // Update button text
        this.elements.startBtnText.textContent = 'Restart';

        // Start the timer
        this.timer = setInterval(() => this.updateTimer(), 1000);

        // Show timer section if hidden
        this.elements.timerSection.classList.remove('hidden');
    },

    stopTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
        this.elements.stopWorkBtn.classList.add('hidden');
        this.elements.startBtnText.textContent = 'Start Working';
    },

    updateTimer() {
        this.timeLeft--;

        // Calculate time until next phase
        const elapsed = this.totalTime - this.timeLeft;
        let nextPhaseTime = this.phaseMarkers[this.nextPhaseIndex]?.time || this.totalTime;
        let timeUntilNextPhase = nextPhaseTime - elapsed;

        // Update display with time until next phase
        this.updateTimerDisplay(timeUntilNextPhase > 0 ? timeUntilNextPhase : this.timeLeft);
        this.updateRing();

        // Check for phase changes
        this.checkPhases();

        if (this.timeLeft <= 0) {
            this.stopTimer();
            this.showNotification('Work session completed! Take a break!');
            if (this.notificationSound) {
                this.notificationSound.play();
            }
        }
    },

    updateTimerDisplay(timeToShow = this.timeLeft) {
        const minutes = Math.floor(timeToShow / 60);
        const seconds = timeToShow % 60;
        this.elements.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    updateRing() {
        const circumference = 283;
        const offset = circumference - (this.timeLeft / this.totalTime) * circumference;
        this.elements.timerRing.style.strokeDashoffset = offset;

        // Update progress dot position
        const progress = 1 - (this.timeLeft / this.totalTime);
        const angle = progress * 360;
        document.getElementById('progressDot').setAttribute('transform', `rotate(${angle} 50 50)`);
    },

    calculatePhaseMarkers() {
        // Clear previous markers
        this.phaseMarkers = [];
        document.getElementById('waterMarker').classList.remove('hidden');
        document.getElementById('moveMarker').classList.remove('hidden');
        document.getElementById('eyeMarker').classList.remove('hidden');

        if (this.waterEnabled) {
            const waterAngle = (this.waterTime / this.totalTime) * 360;
            this.phaseMarkers.push({time: this.waterTime, angle: waterAngle, element: 'waterMarker', type: 'water'});
        }
        if (this.moveEnabled) {
            const moveAngle = (this.moveTime / this.totalTime) * 360;
            this.phaseMarkers.push({time: this.moveTime, angle: moveAngle, element: 'moveMarker', type: 'move'});
        }
        if (this.eyeEnabled) {
            const eyeAngle = (this.eyeTime / this.totalTime) * 360;
            this.phaseMarkers.push({time: this.eyeTime, angle: eyeAngle, element: 'eyeMarker', type: 'eye'});
        }

        // Sort by time and update marker positions
        this.phaseMarkers.sort((a, b) => a.time - b.time);
        this.phaseMarkers.forEach(marker => {
            const element = document.getElementById(marker.element);
            element.setAttribute('transform', `rotate(${marker.angle} 50 50)`);
            element.classList.remove('hidden');
        });
    },

    updateNextPhaseLabel() {
        if (this.phaseMarkers.length === 0) {
            this.elements.timerLabel.textContent = "Working...";
            return;
        }

        if (this.nextPhaseIndex >= this.phaseMarkers.length) {
            this.elements.timerLabel.textContent = "Session Complete!";
            return;
        }

        const nextPhase = this.phaseMarkers[this.nextPhaseIndex];
        let label = "";
        switch(nextPhase.type) {
            case 'water':
                label = "Next: Drink Water in";
                break;
            case 'move':
                label = "Next: Move Around in";
                break;
            case 'eye':
                label = "Next: Rest Eyes in";
                break;
        }
        this.elements.timerLabel.textContent = label;
    },

    checkPhases() {
        const elapsed = this.totalTime - this.timeLeft;

        if (this.nextPhaseIndex < this.phaseMarkers.length && elapsed >= this.phaseMarkers[this.nextPhaseIndex].time) {
            this.triggerPhaseNotification(this.phaseMarkers[this.nextPhaseIndex].type);
            this.nextPhaseIndex++;
            this.updateNextPhaseLabel();
        }
    },

    triggerPhaseNotification(type) {
        let message = '';
        let markerId = '';

        switch(type) {
            case 'water':
                message = 'Time to drink some water! 💧';
                markerId = 'waterMarker';
                break;
            case 'move':
                message = 'Time to stand up and move! 🏃‍♂️';
                markerId = 'moveMarker';
                break;
            case 'eye':
                message = 'Give your eyes a 20-second break! 👀';
                markerId = 'eyeMarker';
                break;
        }

        // Animate the marker
        const marker = document.getElementById(markerId);
        marker.classList.add('animate-ping');
        setTimeout(() => {
            marker.classList.remove('animate-ping');
        }, 1000);

        this.showNotification(message);
        if (this.notificationSound) {
            this.notificationSound.play();
        }
    },

    showNotification(message) {
        this.elements.statusMessage.textContent = message;
        this.elements.statusBar.classList.remove('hidden', 'translate-y-full');
        this.elements.statusBar.classList.add('translate-y-0');

        // Auto-hide after 10 seconds
        setTimeout(() => {
            this.elements.statusBar.classList.add('translate-y-full');
        }, 10000);
    },

    // Modal functions
    showModal(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').classList.remove('opacity-0', 'scale-95');
            modal.querySelector('div').classList.add('opacity-100', 'scale-100');
        }, 10);
    },

    hideModal(modal) {
        modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
        modal.querySelector('div').classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.classList.add('hidden');
        }, 200);
    },

    // Settings persistence
    saveSettings() {
        const settings = {
            waterEnabled: this.waterEnabled,
            moveEnabled: this.moveEnabled,
            eyeEnabled: this.eyeEnabled,
            waterTime: this.waterTime,
            moveTime: this.moveTime,
            eyeTime: this.eyeTime
        };
        localStorage.setItem('healthFlowSettings', JSON.stringify(settings));
    },

    loadSettings() {
        const savedSettings = localStorage.getItem('healthFlowSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.waterEnabled = settings.waterEnabled;
            this.moveEnabled = settings.moveEnabled;
            this.eyeEnabled = settings.eyeEnabled;
            this.waterTime = settings.waterTime;
            this.moveTime = settings.moveTime;
            this.eyeTime = settings.eyeTime;

            // Update UI
            this.elements.waterToggle.checked = this.waterEnabled;
            this.elements.moveToggle.checked = this.moveEnabled;
            this.elements.eyeToggle.checked = this.eyeEnabled;
            this.elements.waterInterval.textContent = this.waterTime / 60;
            this.elements.moveInterval.textContent = this.moveTime / 60;
            this.elements.eyeInterval.textContent = this.eyeTime / 60;
        }
    }
};
