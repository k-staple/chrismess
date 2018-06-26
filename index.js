const button = document.querySelector('button');
const headingToChange= document.querySelector('.whisper');
const form= document.querySelector('form');

let i=0;
function changeHeadingText (){
    console.log('i');
    headingToChange.textContent = i;
    i++;
}

function makeInputtedText(){
    console.log('hello;lkasjdf;laskjdf;OIJEF');
    headingToChange.textContent = input;
}

button.addEventListener('click', changeHeadingText);
form.addEventListener('submit', makeInputtedText);