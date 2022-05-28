//Variable de entrada - edad y ahorro
let input = [
    [0.3,0.4],
    [0.4,0.3],
    [0.3,0.2],
    [0.4,0.1],
    [0.5,0.2],
    [0.2,0.5],
    [0.3,0.6],
    [0.6,0.2],
    [0.7,0.7],
    [0.3,0.7],
    [0.2,0.6],
    [0.3,0.5],
    [0.4,0.8],
    [0.6,0.8],
    [0.5,0.8],
    [0.7,0.8],
    [0.3,0.8],
    [0.2,0.8],
    [0.2,0.9],
    [0.3,0.9],
    [0.4,0.9],
    [0.5,0.9],
    [0.6,0.9],
    [0.7,0.9]
]
//Variable de salida
  let output = [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1];
let neurona = {
    pesos: [],
    sesgo: null,
    lr: 0.001,
    //función de inicicación de neurona
    init: function(numpPesos){
        for (let i = 0; i < numpPesos; i++) {
            //Iniciar los pesos de forma aleatoria - tienen que se pequeños y cercanos a cero
            this.pesos[i] = Math.random() * (0.5 + 0.5) - 0.5; 
        }
        //Iniciación de sesgo
        this.sesgo = Math.random() * (0.5 + 0.5) - 0.5;
    },
    //Salida es la suma ponterada de cada entrada por el peso que se selecciono y sumando el sesgo
    salida(input){
        let salida = 0;
        // sumar los pesos por entrada
        for (let index = 0; index < input.length ; index++) {
            salida += this.pesos[index] * input[index];
            
        }
        // suma del sesgo
        salida += this.sesgo;
        // para dejar el 1 o 0 
        if(salida < 1){
            salida = 0
        }else {
            salida = 1;
        }
        return salida
    },
    //Entrenamiento va las epocas, datos de entrada y datos de salida
    train(epochs, dataInput, dataOutput){
        for (let index = 0; index < epochs; index++) {
            // variable para ver el error medio en cada epoca
            let errorEpoch = 0;
            for (let j = 0; j < dataInput.length; j++) {
                let currentInput = dataInput[j];
                let currentOutput = dataOutput[j];
                let salida = this.salida(currentInput);
                //Error muestra lo que yo espero optener a lo que obtengo
                let error = currentOutput - salida;
                // El error se pone en absolutos para sumarlo y hacer el ajuste de los pesos
                errorEpoch += Math.abs(error);
                // Se inicializa el ajuste de los pesos
                this.ajustePesos(error, currentInput);
            }
            console.log(errorEpoch / dataInput.length);
        }
    }, 
    ajustePesos(error, currentInput){
        for (let index = 0; index < this.pesos.length; index++) {
            // Ajueste, error por radio de entrenamiento por la entrada del peso 
            let ajuste = error * this.lr * currentInput[index];
            this.pesos[index] += ajuste;
        }
        // ajuste para el segos, error por tasa de parendizaje por 1
        let ajuste = error * this.lr *1;
        this.sesgo +=ajuste;
    }
};
// antes del entrenamiento 
console.log("**************** Antes del entrenamiento *********************");
for (let index = 0; index < input.length; index++) {
    console.log("****************")
    console.log("Resultado del reglon: ", index+2)
    console.log("Entrada: ")
    console.log(input[index])
    console.log("Salida de la neurona: ")
    console.log(neurona.salida(input[index]));
    console.log("Salida esperada: ")
    console.log(output[index]);

}
//Iniciación de la naurona con dos entradas
neurona.init(2);
// Se envián las epocas, entre más epocas mas aprendizaje, entrada y salida
neurona.train(2000, input, output);

console.log("**************** Después del entrenamiento *********************");
// Despues del entrenamiento 
for (let index = 0; index < input.length; index++) {
    console.log("****************")
    console.log("Resultado del reglon: ", index+2)
    console.log("Entrada: ")
    console.log(input[index])
    console.log("Salida de la neurona: ")
    console.log(neurona.salida(input[index]));
    console.log("Salida esperada: ")
    console.log(output[index]);

}

document.getElementById('ingresar').addEventListener("click",function(){
        let edad = document.getElementById('edad').value;
        if(edad<20 || edad>100){
            Swal.fire({
                title: 'Denegado!',
                text: 'Ingrese una edad mayor a 20 años y menor a 70',
                icon: 'error',
                confirmButtonText: 'Gracias'
              })
        }else{
            let ahorro = document.getElementById('ahorro').value;
            if(ahorro<1000 || ahorro>9999){
                Swal.fire({
                    title: 'Denegado!',
                    text: 'Ingrese un monto de ahorro de 1000 a 9000 para validar',
                    icon: 'error',
                    confirmButtonText: 'Gracias'
                  })
            }else{
                let edadNueva = "0."+edad;
                let ahorroNuevo = "0."+ahorro; 
                let ahoroNew = parseFloat(ahorroNuevo);
                let edadNew = parseFloat(edadNueva);
                console.log(ahoroNew, edadNew)
            
                console.log(ahoroNew.toFixed(1) , edadNew.toFixed(1)); 
                let verificacion = neurona.salida([edadNew.toFixed(1),ahoroNew.toFixed(1)])
        
                if(verificacion == 1){
                    Swal.fire({
                        title: 'Aprobado!',
                        text: 'Credito aprobado',
                        icon: 'success',
                        confirmButtonText: 'Gracias'
                      })
                }else{
                    Swal.fire({
                        title: 'Denegado!',
                        text: 'Credito denegado',
                        icon: 'error',
                        confirmButtonText: 'Gracias'
                      })
                }
            }
   
        }

});

