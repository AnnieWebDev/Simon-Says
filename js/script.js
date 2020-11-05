'use strict';

window.addEventListener("DOMContentLoaded", () => {

    const sounds = {
        'blue': '../sounds/1.ogg',
        'red': '../sounds/2.ogg',
        'yellow': '../sounds/3.ogg',
        'green': '../sounds/4.ogg',
        'win': '../sounds/win.mp3'
    };




    const startBtn = document.querySelector('.game__start'),
        btns = {
            'green': document.querySelector('.game__square_green'),
            'red': document.querySelector('.game__square_red'),
            'blue': document.querySelector('.game__square_blue'),
            'yellow': document.querySelector('.game__square_yellow')
        },
        field = document.querySelector('.game__field'),
        roundContainer = document.querySelector('.game__round'),
        messageContainer = document.querySelector('.game__message');

    let difficult = 1500,
        gamePull = [],
        isSimonTurn = false,
        step = 0,
        round = 1;



    field.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('game__square')) {

            if (event.target.hasAttribute('disabled')) {
                return false;
            }

            if (event.target.classList.contains('game__square_blue')) {

                onClickSquare('blue');

            }

            if (event.target.classList.contains('game__square_red')) {

                onClickSquare('red');
            }

            if (event.target.classList.contains('game__square_yellow')) {
                onClickSquare('yellow');
            }

            if (event.target.classList.contains('game__square_green')) {

                onClickSquare('green');

            }




        }



    });

    startBtn.addEventListener('click', () => {

        if (startBtn.hasAttribute('disabled')) {
            return false;
        }

        gamePull = [];

        const colors = ['blue', 'red', 'yellow', 'green'];

        for (let i = 0; i <= 9; i++) {

            gamePull.push(colors[getRandomInt(4)]);

        }

        console.log(gamePull);


        difficult = document.querySelector('.game__difficulty-input:checked').value;

        document.querySelector('.game__difficulty-container').style.display = 'none';

        startBtn.setAttribute("disabled", "disabled");

        simonTurn();



    });


    function onClickSquare(color) {

        btns[color].classList.add('game__square_active');

        const sound = new Audio(sounds[color]);
        sound.play();

        setTimeout(function () {
            btns[color].classList.remove('game__square_active');
        }, 300);

        if (!isSimonTurn) {
            if (gamePull[step] == color) {
                step++;

                if (step >= round) {

                    setTimeout(() => {
                        round++;


                        if (round < gamePull.length) {
                            roundContainer.innerText = round;

                            simonTurn();
                        } else {
                            win();
                        }


                    }, 1500);

                }

            } else {
                lose();

            }
        }

    }

    function simonTurn() {
        isSimonTurn = true;

        messageContainer.innerText = 'Simon Turn';

        for (var color in btns) {
            btns[color].setAttribute("disabled", "disabled");
        }

        step = 0;

        let interval = setInterval(() => {

            onClickSquare(gamePull[step]);

            step++;

            if (step >= round) {

                clearInterval(interval);

                setTimeout(function () {
                    isSimonTurn = false;

                    messageContainer.innerText = 'Your Turn';

                    step = 0;

                    for (var color in btns) {
                        btns[color].removeAttribute("disabled");
                    }
                }, 1000);
            }
        }, difficult);


    }

    function win() {
        messageContainer.innerText = 'You win!';

        const sound = new Audio(sounds.win);
        sound.play();

        restart();
    }

    function lose() {
        messageContainer.innerText = 'You Lose!';
        
        restart();


    }

    function restart() {
        round = 1;

        roundContainer.innerText = round;

        startBtn.removeAttribute('disabled');

        document.querySelector('.game__difficulty-container').style.display = 'block';
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }





});