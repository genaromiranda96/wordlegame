class Game {
    constructor(answer){
        this.answer = answer;
        this.attemps = 6;
        this.lenghtWord = 5;
        this.row = 0; 
        this.col = 0; 
        this.gameOver = false;
    }

        //create the game board
        _createBoard(){
            for(let r = 0; r < this.attemps; r++){
                for( let c = 0; c < this.lenghtWord; c++){
                    //create the letter space
                    let letter = document.createElement('span');
                    letter.id = r.toString() + '-' + c.toString();
                    letter.classList.add('title');
                    letter.innerText = '';
                    document.getElementById('game').appendChild(letter);
                }
            }
        }

    //assign control board
    _assignControlsBoard(){
        document.addEventListener('keyup', (e) => {
            //keyboard control letter A-Z
            if("KeyA" <= e.code && e.code <= "KeyZ"){
                if(this.col < this.lenghtWord){
                    let letter = document.getElementById(this.row.toString() + '-' + this.col.toString())
                    if(letter.innerText == ''){
                        letter.classList.add('title-selected')
                        letter.innerText = e.code[3];
                        this.col += 1;
                    } 
                }
            }

            //delete control space
            else if (e.code == "Backspace"){
                if( 0 < this.col && this.col <= this.lenghtWord){
                    //back the column 
                    this.col -= 1;
                }
                //and clean the space of the letter 
                let letter = document.getElementById(this.row.toString() + '-' + this.col.toString())
                letter.classList.remove('title-selected')
                letter.innerText = "";
            }

            else if (e.code == 'Enter'){
                if(this._verificationLetterEmpy() !== false ){
                    this._updateRow();
                    this.row += 1 //to the next row or next attemps
                    this.col = 0; //start in index 0 columm
                }
            }

            //GAME OVER
            if(this.gameOver == false && this.row == this.attemps){
                let answer = document.getElementById('Answer')
                let correctAnswer = document.createElement('div');
                correctAnswer.innerHTML = `
                <p>You lost, the answer is: </p>
                <span class="lost" >${this.answer}</span>
                `
                this._resetGame()
                answer.prepend(correctAnswer);
                answer.classList.add('active')
            }
        })
    }
    


    // Create the key board
    _creatKeyBoard(){
        let keyboard = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
            ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
        ]

        for (let i = 0; i < keyboard.length; i++) {
            let currRow = keyboard[i];
            let keyboardRow = document.createElement("div");
            keyboardRow.classList.add("keyboard-row");

            for (let j = 0; j < currRow.length; j++) {
                let keyTile = document.createElement("div");
                let key = currRow[j];

                keyTile.innerText = key;

                if (key == "Enter") {
                    keyTile.id = "Enter";
                }  else if (key == "⌫") {
                    keyTile.id = "Backspace";
                } else if ("A" <= key && key <= "Z") {
                    keyTile.id = "Key" + key; // 
                } 

                //same verification to the function Assign control board
                keyTile.addEventListener("click", (e) => {
                    if("KeyA" <= e.target.id && e.target.id <= "KeyZ"){
                        if(this.col < this.lenghtWord){
                            let letter = document.getElementById(this.row.toString() + '-' + this.col.toString())
                            if(letter.innerText == ''){
                                letter.classList.add('title-selected')
                                letter.innerText = e.target.id[3];
                                this.col += 1;
                            } 
                        }
                    }

                    //delete button, same to the assing control boards
                    else if (e.target.id == "Backspace"){
                        if( 0 < this.col && this.col <= this.lenghtWord){
                            //back the column 
                            this.col -= 1;
                        }
                        //and clean the space of the letter 
                        let letter = document.getElementById(this.row.toString() + '-' + this.col.toString())
                        letter.classList.remove('title-selected')
                        letter.innerText = "";
                    }

                    else if (e.target.id == 'Enter'){
                        if(this._verificationLetterEmpy() !== false ){
                            this._updateRow();
                            this.row += 1 //to the next row or next attemps
                            this.col = 0; //start in index 0 columm
                        }
                    }

                    if(this.gameOver == false && this.row == this.attemps){
                        let answer = document.getElementById('Answer')
                        let correctAnswer = document.createElement('div');
                        correctAnswer.innerHTML = `
                        <p>You lost, the answer is: </p>
                        <span class="lost" >${this.answer}</span>
                        `
                        this._resetGame()
                        answer.prepend(correctAnswer);
                        answer.classList.add('active')
                    }
                });

                if (key == "Enter") {
                    keyTile.classList.add("enter-key-tile");
                } else {
                    keyTile.classList.add("key-tile");
                }
                keyboardRow.appendChild(keyTile);
            }
            document.body.appendChild(keyboardRow);
        }
            
    }
        

    _updateRow(){
        let correct = 0;
        let correctAnswer = document.createElement('div');
        correctAnswer.id = 'correctAnswer';
        let letterCount = {}; // FEELS  -> { F:1, E:2, L:1, S:1 }
        for( let i = 0; i < this.answer.length; i++){
            let letter = this.answer[i]
            if(letterCount[letter]){
                letterCount[letter] += 1;
            } else {
                letterCount[letter] = 1;
            }
        }
        
        //check correct letter
        for(let c = 0; c < this.lenghtWord; c++){ //lenghtword same width 5
            let answer = document.getElementById('Answer')
            let correctLetter = this.answer[c];
            let currLetter = document.getElementById(this.row.toString() + '-' + c.toString())
            let letter = currLetter.innerText.toLowerCase();
            if(correctLetter == letter){
                currLetter.classList.add('correct');
                correct += 1;
                letterCount[letter] -= 1;
            }
            
            if(correct == this.lenghtWord){
                this.gameOver = true;
                correctAnswer.innerHTML = `
                    <p>You win, the answer is:</p> 
                    <span class="win">${this.answer}</span>
                `
                answer.prepend(correctAnswer);
                answer.classList.add('active')
                this. _resetGame()
            }
        }


        //letter in wrong position
        for(let c = 0; c < this.lenghtWord; c++){ //lenghtword same width 5
            let currLetter = document.getElementById(this.row.toString() + '-' + c.toString())
            let letter = currLetter.innerText.toLowerCase();
            if(!currLetter.classList.contains('correct')){
                if(this.answer.includes(letter) && letterCount[letter] > 0){
                    currLetter.classList.add('elsewhere');
                    letterCount[letter] -= 1;

                }  else{
                    currLetter.classList.add('absent');
                }
            }
        }
    }

    _verificationLetterEmpy(){
        let alert = document.querySelector('.alert')
        for(let c = 0; c < this.lenghtWord; c++){ //lenghtword same width 5
            let currLetter = document.getElementById(this.row.toString() + '-' + c.toString())
            let letter = currLetter.innerText.toLowerCase();
            if(letter == ''){
                alert.classList.add('active')
                alert.innerText = 'Too short word :('
                setTimeout( () => {
                    alert.classList.remove('active');
                    alert.innerText = ''
                }, 1000)
                return false;
            } 
        }
    }

    _resetGame(){
        let buttonPlay = document.querySelector('.playAgain')
        let preScreem = document.querySelector('.preScreem')
        preScreem.classList.add('active')
        buttonPlay.addEventListener('click', () => {
            document.location.reload(true)
        })
    }

    //start the game
    _start(){
        this._createBoard();
        this._creatKeyBoard()
        this._assignControlsBoard();        
    }
}

export {Game};




