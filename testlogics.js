let city = document.getElementById('city').value;
let N_room = document.getElementById('Number-of-room').value;
let N_balcony = document.getElementById('Number-of-balcony').value;

document.getElementById('suggest').addEventListener('click', showSuggestion);
function showSuggestion(){
    document.getElementById('suggested_home_container').style.display = 'block';
}