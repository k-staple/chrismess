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

function makeInputtedText(event){
    event.preventDefault();  //should be first line
    const f= event.target;
    const stone= f.stone.value;
    headingToChange.textContent = stone;
    //create list
    const item = document.createElement('li');
    item.textContent = stone;
    const list = document.querySelector('#trove');
    list.appendChild(item);
    //reveal hidden message if doesn't send a stone
    const regex= /.*space.*|.*mind.*|.*time.*|.*reality.*|.*power.*|.*soul.*/i;
    if (!(regex.test(stone))){
        headingToggleDisappear.classList.remove('hid');
    }

    f.reset();
}

button.addEventListener('click', changeHeadingText);
form.addEventListener('submit', makeInputtedText);