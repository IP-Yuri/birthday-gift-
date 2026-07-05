document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    const deleteBtn = document.querySelector('.delete-key');
    const unlockBtn = document.querySelector('.unlock-btn');
    const dots = document.querySelectorAll('.dot');
    
    let passcode = '';
    const CORRECT_PASSCODE = '0707';

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index < passcode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function triggerError() {
        dots.forEach(dot => {
            dot.classList.add('error');
            setTimeout(() => {
                dot.classList.remove('error');
            }, 400);
        });
        passcode = '';
        updateDots();
    }

    function checkPasscode() {
        if (passcode === CORRECT_PASSCODE) {
            // Success animation
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'celebration.html';
            }, 1000);
        } else {
            triggerError();
        }
    }

    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (passcode.length < 4) {
                passcode += key.dataset.key;
                updateDots();
                
                // Optional: Auto-check when 4 digits are entered
                // if (passcode.length === 4) {
                //     setTimeout(checkPasscode, 300);
                // }
            }
        });
    });

    deleteBtn.addEventListener('click', () => {
        if (passcode.length > 0) {
            passcode = passcode.slice(0, -1);
            updateDots();
        }
    });

    unlockBtn.addEventListener('click', () => {
        if (passcode.length === 4) {
            checkPasscode();
        } else {
            triggerError();
        }
    });
});
