console.log('client file javascript file is loaded');

const weatherForm=document.querySelector('form');
const search = document.querySelector('input');
const messages = document.querySelectorAll('.info');

console.log(messages[0]);

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messages[0].textContent = 'Fetching weather info';
    messages[1].textContent = '';
    messages[2].textContent = '';
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messages[0].textContent=data.error;
                messages[1].textContent='';
                messages[2].textContent='';
            } else {
                messages[0].textContent=`Temperature: ${data.temperature}`;
                messages[1].textContent=`Humidity: ${data.humidity}`;
                messages[2].textContent=`Summary: ${data.summary}`;
            }
        });
    });
});