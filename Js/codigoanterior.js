document.getElementById('botonHorasCad').addEventListener('click', () => {

    const horasCadista = parseFloat(document.getElementById('horasCadista').value);
    let valorHoraCadista = valorHM * 0.035;
    presupuestoFinalCadista = (horasCadista * valorHoraCadista);
    document.getElementById('resultadoCad').textContent = 'El presupuesto de digitalización de planos es de ' + conversorNumeroPesos(presupuestoFinalCadista);
    obtenerResultadoFinalCad();
});


const obtenerResultadoFinalCad =() => {
    document.getElementById('finalCad').textContent = 'El presupuesto de Digitalizacion de Planos es de ' + conversorNumeroPesos(presupuestoFinalCadista);
    actualizartotal(presupuestoFinalCadista);
    return presupuestoFinalCadista;
};

document.getElementById('botonElectricas').addEventListener('click', () => {
    const potenciaInstalada = parseFloat(document.getElementById('potenciaInstalada').value);

    let valorInstalacionElectrica = potenciaInstalada * valorKW;
    let valorDeInstalacionElectricaHM = valorInstalacionElectrica / valorHM;
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

    presupuestoFinalInstalacionesElectricas = (auxHonorarioMinimo + resto) * valorHM;


    document.getElementById('resultadoElectrica').textContent = 'El presupuesto de instalaciones eléctricas es de ' + conversorNumeroPesos(presupuestoFinalInstalacionesElectricas);
    obtenerResultadoFinalElectricas();
});


const conversorNumeroPesos = (numero) => {
    let conversion = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
    return conversion;
};


const obtenerResultadoFinalElectricas =() => {
    document.getElementById('finalElectrica').textContent = 'El presupuesto de instalaciones electricas es de ' + conversorNumeroPesos(presupuestoFinalInstalacionesElectricas);
    actualizartotal(presupuestoFinalInstalacionesElectricas);
    return presupuestoFinalInstalacionesElectricas;
};




const actualizartotal = (valor)=>{
    total = valor + total;
    document.getElementById('total').textContent = 'El total de los servicios es de ' + conversorNumeroPesos(total);
}


// Vamos a usar localStorage para guardar los presupuestos

const guardarPresupuestos = () => {
    const presupuestos = {
        cadista: presupuestoFinalCadista,
        electricas: presupuestoFinalInstalacionesElectricas,
        total: total
    };
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
};


const cargarPresupuestos = () => {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos'));
    if (presupuestos) {
        presupuestoFinalCadista = presupuestos.cadista;
        presupuestoFinalInstalacionesElectricas = presupuestos.electricas;
        total = presupuestos.total;

        document.getElementById('finalCad').textContent = 'El presupuesto de Digitalizacion de Planos es de ' + conversorNumeroPesos(presupuestoFinalCadista);
        document.getElementById('finalElectrica').textContent = 'El presupuesto de instalaciones electricas es de ' + conversorNumeroPesos(presupuestoFinalInstalacionesElectricas);
        document.getElementById('total').textContent = 'El total de los servicios es de ' + conversorNumeroPesos(total);
    }
};

document.getElementById('botonHorasCad').addEventListener('click', () => {
    guardarPresupuestos();
});

document.getElementById('botonElectricas').addEventListener('click', () => {
    guardarPresupuestos();
});


window.addEventListener('load', () => {
    cargarPresupuestos();
});

document.getElementById('botonLimpiar').addEventListener('click', () => {
    localStorage.removeItem('presupuestos');
    presupuestoFinalCadista = 0;
    presupuestoFinalInstalacionesElectricas = 0;
    total = 0;

    document.getElementById('finalCad').textContent = 'El presupuesto de Digitalizacion de Planos es de ' + conversorNumeroPesos(presupuestoFinalCadista);
    document.getElementById('finalElectrica').textContent = 'El presupuesto de instalaciones electricas es de ' + conversorNumeroPesos(presupuestoFinalInstalacionesElectricas);
    document.getElementById('total').textContent = 'El total de los servicios es de ' + conversorNumeroPesos(total);
});
