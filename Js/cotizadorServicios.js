
const montoDeObraHM = [36, 54, 182, 638, 910];
const honorarioMinimoHM = [2.52, 3.51, 10.92, 35.09, 52.04];
const valorHM = (350000);
const valorKW = parseFloat(valorHM * 0.967);
let presupuestoFinalCadista = 0;
let presupuestoFinalInstalacionesElectricas = 0;
let total = 0;

const menuOpciones = document.getElementById('menuOpciones');

const input = document.getElementById('inputCotizador')

menuOpciones.addEventListener('change', () => {

         document.querySelectorAll('.contenido').forEach(div => {
         div.style.display = 'none';
     });
   const opcSelected = document.querySelector(`.contenido#${menuOpciones.value}`)
   const inputAndButton = document.getElementById('inputAndButton');
   if (menuOpciones.value) {
         inputAndButton.style.display = 'block';
   }

   opcSelected.style.display = 'block';
   document.getElementById('inputCotizador').value = '';

});

function getData(form) {
  var formData = new FormData(form);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  return(Object.fromEntries(formData));
}

document.getElementById("formularioCotizador").addEventListener("submit", function (e) {
  e.preventDefault();
  const { opcionesCotizador, inputCotizador} = getData(e.target) || {};
  switch (opcionesCotizador) {
    // case 'maquinarias':
    //     calculoRelevamientoDeMaquinarias();
    //     break;
    case 'electricas':
        calculoPresupuestoInstalacionElectrica(inputCotizador);
        break;
    case 'planos':
        calculoDigitalizacionDePlanos(inputCotizador);
        break;
    case 'piping':
        calculoPiping(inputCotizador);
        break;
    case 'basica':
        calculoIngenieriaBasicaDeProyecto(inputCotizador);
        break;
    default:
      console.log('No hay opciones');
  }
});


const calculoDigitalizacionDePlanos = (inputCotizador) => {
    let valorHoraCadista = valorHM * 0.035;
    let presupuestoFinalCadista = (inputCotizador * valorHoraCadista);
    console.log(presupuestoFinalCadista);
    setTotalOf ( 'finalCad', presupuestoFinalCadista);
}


const setTotalOf = (valueId , total) => {
    document.getElementById(valueId).textContent = total;
}

const calculoPresupuestoInstalacionElectrica = (inputCotizador) => {
    let potenciaInstalada = inputCotizador;

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

    let final = (auxHonorarioMinimo + resto) * valorHM;
    setTotalOf('finalElectrica', final);
}



const calculoIngenieriaBasicaDeProyecto = (inputValue) => {
    const  presuCad = Number(document.getElementById('finalCad').textContent);
    const presuObraElectrica = Number(document.getElementById('finalElectrica').textContent);
    if ( (presuCad || presuObraElectrica) <= 0){
        // alert('se debe calcular primero presupuesto cad y presupuesto obra electrica')
        Swal.fire({
            title: 'Error!',
            text: 'se debe calcular primero presupuesto Digitalizacion de planos y presupuesto obra electrica',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        return
    }else{
        let montoDeObraCivil = inputValue;

        let calculoObraCivil = montoDeObraCivil * 0.01;
        let presuIngenieriaBasica = presuCad + presuObraElectrica + calculoObraCivil;
        setTotalOf( 'finalBasica' , presuIngenieriaBasica);
        }
    }




const calculoPiping = (inputValue) => {
    const horaCad = Number(document.getElementById('finalCad').textContent);
    const obraElectrica = Number(document.getElementById('finalCad').textContent);
    const valorMetroPiping = valorHM * 0.15;
    const metrosLinealesPiping = inputValue;
    const presupuestoPiping = (obraElectrica + horaCad) + (metrosLinealesPiping * valorMetroPiping);

    setTotalOf('finalPiping', presupuestoPiping);
}

