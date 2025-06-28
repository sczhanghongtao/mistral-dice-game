class MistralDiceGame {
    constructor() {
        this.dice = document.getElementById('dice');
        this.promptValue = document.getElementById('promptValue');
        this.isRolling = false;
        
        // Map each dice face to its corresponding value and multiple prompts
        this.diceMapping = {
            1: {
                value: 'Are you audacious enough?',
                prompts: [
                    'Left quant finance to bet on the defining tech of our time',
                    'Took on an ambitious project using unfamiliar tech — and learned fast enough to ship it',
                    'Build zero-to-one products with no blueprint',
                    'Co-create and prototype with PMs before the roadmap exists',
                    'Explore bold ideas through side projects',
                ]
            },
            2: {
                value: 'Reason with rigor.',
                prompts: [
                    'Break complex ML/LLM systems into small, testable parts',
                    'Champion data-driven frameworks for project prioritization',
                    'Correlation <-> causality',
                    'Manage multi-billion dollar portoflio with high precision'
                ]
            },
            3: {
                value: 'Make our customer succeed.',
                prompts: [
                    'Join customer calls to surface real pain points',
                    'Understand the why behind customer asks',
                    'Advocate for customer needs in roadmap planning',
                ]
            },
            4: {
                value: 'Ship early and accelerate.',
                prompts: [
                    'Prototype fast to test and learn early',
                    'Ship with intentional trade-offs, then refine',
                    'Use open-source tools to build quickly'
                ]
            },
            5: {
                value: 'Leave your ego aside.',
                prompts: [
                    'Get hands-on with messy data and edge cases',
                    'Step outside my role when needed — PM, DS, QA, support',
                    'Create a culture of learning and experimentation'
                ]
            },
            6: {
                value: 'Life outside of work.',
                prompts: [
                    'Volunteering',
                    'Swing dance',
                    'Biking', 
                    'Reading',
                    'Tennis',
                    'More...'
                ]
            }
        };
        
        this.currentValue = 1;
        this.init();
    }
    
    init() {
        // Add click event to the dice itself
        this.dice.addEventListener('click', () => this.rollDice());
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isRolling) {
                e.preventDefault();
                this.rollDice();
            }
        });
        
        // Add touch support for mobile
        this.dice.addEventListener('touchstart', (e) => {
            if (!this.isRolling) {
                e.preventDefault();
                this.rollDice();
            }
        });
        
        // Initialize with first value
        this.updatePrompt(1);
    }
    
    rollDice() {
        if (this.isRolling) return;
        
        this.isRolling = true;
        
        // Add rolling animation
        this.dice.classList.add('rolling');
        
        // Generate a truly random face (1-6)
        const newValue = Math.floor(Math.random() * 6) + 1;
        
        // Ensure we don't get the same value twice in a row
        if (newValue === this.currentValue) {
            const alternativeValues = [1, 2, 3, 4, 5, 6].filter(v => v !== this.currentValue);
            this.currentValue = alternativeValues[Math.floor(Math.random() * alternativeValues.length)];
        } else {
            this.currentValue = newValue;
        }
        
        // Calculate rotation to show the correct face
        const rotation = this.getRotationForFace(this.currentValue);
        
        // Update prompt after animation
        setTimeout(() => {
            this.updatePrompt(this.currentValue);
            
            // Remove rolling animation and set final position
            this.dice.classList.remove('rolling');
            this.dice.style.transform = rotation;
            
            // Re-enable rolling
            setTimeout(() => {
                this.isRolling = false;
            }, 500);
        }, 1500);
    }
    
    getRotationForFace(face) {
        // Define rotations for each face to be visible
        // Fine-tuned based on actual CSS 3D positioning
        const rotations = {
            1: 'rotateX(-15deg) rotateY(-15deg)',      // Front face
            2: 'rotateX(-15deg) rotateY(165deg)',      // Back face  
            4: 'rotateX(75deg) rotateY(-15deg)',       // Top face (was 3)
            3: 'rotateX(-105deg) rotateY(-15deg)',     // Bottom face (was 4)
            6: 'rotateX(-15deg) rotateY(75deg)',       // Right face (was 5)
            5: 'rotateX(-15deg) rotateY(-105deg)'      // Left face (was 6)
        };
        
        return rotations[face] || rotations[1];
    }
    
    updatePrompt(diceValue) {
        if (this.diceMapping[diceValue]) {
            // Add fade out effect
            this.promptValue.style.opacity = '0';
            
            setTimeout(() => {
                // Create HTML list of all prompts
                const prompts = this.diceMapping[diceValue].prompts;
                const promptList = prompts.map((prompt, index) => 
                    `${index + 1}. ${prompt}`
                ).join('<br>');
                
                this.promptValue.innerHTML = promptList;
                this.promptValue.style.opacity = '1';
                console.log('Showing prompts for face', diceValue, ':', prompts);
            }, 150);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MistralDiceGame();
});

// Add some nice loading effects
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 