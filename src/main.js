import getRandomWord from "./services/getRandomWord.js";
import {Game} from './game.js';

document.addEventListener('DOMContentLoaded', async () => {
        let randonWord = await getRandomWord();
        const game = new Game(randonWord);
        game._start();
        console.log('the answer is: ' , game.answer)

        //MENU INSTRUCTIONS
        let settingsButton = document.querySelector('.settings-button');
        let settingsClose = document.querySelector('.close-settings')
        let settingsContent = document.querySelector('.settings_info')
        let preeScreem = document.querySelector('.preScreem')

        settingsButton.addEventListener('click', () => {
            settingsContent.classList.add('visibile')
            preeScreem.classList.add('active')
        })

        settingsClose.addEventListener('click', () => {
            settingsContent.classList.remove('visibile')
            preeScreem.classList.remove('active')

        })

    });



