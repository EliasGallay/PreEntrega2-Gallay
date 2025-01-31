const montoDeObraHM = [36, 54, 182, 638, 910];
const honorarioMinimoHM = [2.52, 3.51, 10.92, 35.09, 52.04];
const valorHM = (350000);
const valorKW = parseFloat(valorHM * 0.967);
let presupuestoCadista = 0;
let presupuestoFinalInstalacionesElectricas = 0;



document.getElementById('btnPiping').addEventListener('click', () => {
    presupuestoFinalInstalacionesElectricas = (calculoPresupuestoInstalacionElectrica(valorHM, valorKW));
    presupuestoCadista = calculoDigitalizacionDePlanos();
    let presupuestoFinalPiping = calculoPiping(presupuestoCadista, presupuestoFinalInstalacionesElectricas);
    mostrarResultado(`El cálculo de Piping es: ${conversorNumeroPesos(presupuestoFinalPiping)}`);
});


document.getElementById('btnRelevamiento').addEventListener('click', () => {
    calculoRelevamientoDeMaquinarias();
    mostrarResultado('El cálculo de relevamiento de maquinarias está en proceso.');
});

document.getElementById('btnInstalaciones').addEventListener('click', () => {
    presupuestoFinalInstalacionesElectricas = (calculoPresupuestoInstalacionElectrica(valorHM, valorKW));
    mostrarResultado(`El cálculo de instalaciones eléctricas es: ${conversorNumeroPesos(presupuestoFinalInstalacionesElectricas)}`);
});

document.getElementById('btnDigitalizacion').addEventListener('click', () => {
    let presupuestoCadista = calculoDigitalizacionDePlanos();
    mostrarResultado(`El cálculo de digitalización de planos es: ${conversorNumeroPesos(presupuestoCadista)}`);
});

document.getElementById('btnIngenieria').addEventListener('click', () => {
    presupuestoFinalInstalacionesElectricas = (calculoPresupuestoInstalacionElectrica(valorHM, valorKW));
    presupuestoCadista = calculoDigitalizacionDePlanos();
    let presupuestoFinalIngenieriaBasica = calculoIngenieriaBasicaDeProyecto(presupuestoCadista, presupuestoFinalInstalacionesElectricas);
    mostrarResultado(`El cálculo de ingeniería básica de proyecto es: ${conversorNumeroPesos(presupuestoFinalIngenieriaBasica)}`);
});

const mostrarResultado = (mensaje) => {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = mensaje;
    resultDiv.style.display = 'block';
}


const calculoPiping = (horaCad, obraElectrica) => {
    let HoraCad = parseFloat(horaCad);
    let ObraElectrica = parseFloat(obraElectrica);
    let valorMetroPiping = valorHM * 0.15;
    let metrosLinealesPiping = parseFloat(prompt("Ingrese los metros lineales de Piping:"));

    if (isNaN(metrosLinealesPiping) || metrosLinealesPiping <= 0) {
        alert("Por favor, ingrese un valor válido para los metros lineales de Piping.");
        return;
    }

    let presupuestoPiping = (ObraElectrica + HoraCad) + (metrosLinealesPiping * valorMetroPiping);

    return presupuestoPiping;
}

const calculoRelevamientoDeMaquinarias = ( ) => {
    alert("se esta realizando calculo de relevamiento de maquinarias")
}

const calculoPresupuestoInstalacionElectrica = (ValHM, ValKW) => {
    let potenciaInstalada = parseFloat(prompt('Ingrese la potencia instalada en su obra:'));
    if (isNaN(potenciaInstalada) || potenciaInstalada <= 0) {
        alert('Por favor, ingrese un valor numérico válido para la potencia.');
        return;
    }

    let valorInstalacionElectrica = potenciaInstalada * ValKW;
    let valorDeInstalacionElectricaHM = valorInstalacionElectrica / ValHM;
    let auxValor = valorDeInstalacionElectricaHM;
    let contador = 0;

    while (contador < montoDeObraHM.length && auxValor > montoDeObraHM[contador]) {
        auxValor -= montoDeObraHM[contador];
        contador++;
    }

    let resto = auxValor * 0.05;
    let auxHonorarioMinimo = 0;
    for (let i = 0; i < contador; i++) {
        auxHonorarioMinimo += honorarioMinimoHM[i];
    }

    let final = (auxHonorarioMinimo + resto) * ValHM;
    return final;
}//ya

const calculoDigitalizacionDePlanos = () => {
    let horasCadista = parseFloat(prompt('se esta realizando calculo de digitalizacion de planos \n' + 'ingrese la cantidad de horas cadista aproximadas'));
    if (isNaN(horasCadista) || horasCadista <= 0) {
        alert("ingrese un numero valido para las horas");
        return;
    }
    let valorHoraCadista = valorHM * 0.035;
    let presupuestoFinalCadista = (horasCadista * valorHoraCadista);
    return presupuestoFinalCadista;

} //ya

const calculoIngenieriaBasicaDeProyecto = (presuCad, presuObraElectrica) => {
    presuCad = parseFloat(presuCad);
    presuObraElectrica = parseFloat(presuObraElectrica);

    let montoDeObraCivil = parseFloat(prompt("Ingrese monto de obra civil en pesos:"));
    if (isNaN(montoDeObraCivil) || montoDeObraCivil <= 0) {
        alert('Por favor, ingrese un valor numérico válido.');
        return;
    }

    let calculoObraCivil = montoDeObraCivil * 0.01;
    let presuIngenieriaBasica = presuCad + presuObraElectrica + calculoObraCivil;
    return presuIngenieriaBasica;
}//ya


const conversorNumeroPesos = (numero) => {
    let conversion = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
    return conversion;
}











const calculoPiping = (inputValue) => {
    const horaCad = Number(document.getElementById('finalCad').textContent);
    const obraElectrica = Number(document.getElementById('finalCad').textContent);
    const valorMetroPiping = valorHM * 0.15;
    const metrosLinealesPiping = inputValue;

    const presupuestoPiping = (obraElectrica + horaCad) + (metrosLinealesPiping * valorMetroPiping);

    setTotalOf('finalPiping', presupuestoPiping);
}