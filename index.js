const button = document.querySelector('button');
const headingToChange= document.querySelector('.whisper');
const form= document.querySelector('form');
const headingToggleDisappear = document.querySelector('.hid')


let i=10;
function changeHeadingText (){
    console.log('i');
    headingToChange.textContent = i;
    if(i > 0) i--;
}

function makeInputtedText(){
    const stone= document.querySelector('.stone1').value;
    headingToChange.textContent = stone;
    const regex= /.*space.*|.*mind.*|.*time.*|.*reality.*|.*power.*|.*soul.*/i
    event.preventDefault();
    if (!(regex.test(stone))){
        headingToggleDisappear.classList.remove('hid')
    }
}

button.addEventListener('click', changeHeadingText);
form.addEventListener('submit', makeInputtedText);