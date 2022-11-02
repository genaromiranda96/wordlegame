const API_URL = 'https://random-word-api.herokuapp.com/word?length=5';

export default function getRandomWord() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        return data[0]
    });
}