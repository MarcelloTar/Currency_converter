
const button = document.getElementById('convert');
const number = document.getElementById('number');
const translate = document.getElementById('translate');
let selectElement1 = document.getElementById('select1');
let selectElement2 = document.getElementById('select2');

function start() {    
    fetch(`https://open.er-api.com/v6/latest`)
        .then(response => response.json())
        .then(data => {
            console.log(data.rates);
            for(let key in data.rates){
                selectElement1.innerHTML +=`
                <option value="${key}">${key}</option>
                `
                selectElement2.innerHTML +=`
                <option value="${key}">${key}</option>
                `
            }
            document.getElementById('select1').style.cssText = `
            background: url('https://flagcdn.com/h20/us.png') 5% 50% no-repeat;
            `;
            document.getElementById('select2').style.cssText = `
            background: url('https://flagcdn.com/h20/us.png') 5% 50% no-repeat;
            `;
        });

}
start()

button.addEventListener('click', function(){
    let output1 = selectElement1.value;
    
    let output2 = selectElement2.value;
    // console.log(output2);
    
    fetch(`https://open.er-api.com/v6/latest/${output1}`)
    .then(response => response.json())
    .then(data =>{
        let currency = data.rates[output2];
        let value = number.value * currency;
        translate.textContent =  number.value + output1 + ' = ' + value + output2
    })
})

selectElement1.addEventListener('change', function(){
   
    let imgcurrency = massifStrigt(selectElement1)
        document.getElementById('select1').style.cssText = `
        background: url('https://flagcdn.com/h20/${imgcurrency}.png') 5% 50% no-repeat;
        `;
})
selectElement2.addEventListener('change', function(){
    let imgcurrency = massifStrigt(selectElement2)
        document.getElementById('select2').style.cssText = `
        background: url('https://flagcdn.com/h20/${imgcurrency}.png') 5% 50% no-repeat;
    `;
    
})

function massifStrigt(selectElement){
    let output = selectElement.value;
    let strigt = output.slice(0,2).toLowerCase();
    return strigt;
}


