//Constante donde guardaremos las letreas del alfabeto
const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//Constantes para los elementos html definidos obtenidnas mediante su id definido
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

//Funcion shoftMmessage
const shifMessage = () => {
    //Obtener el input original y transformalo en un array de mayusculas
    const wordArray = [...inputOriginal.value.toUpperCase()];
    //llamada a la Funcion printChar
    printChar(0, wordArray);
}

//Funcion printChar (Recursiva)
//Argumentos: index actual de la palabra a encriptar y su array
//Se encriptará uno por uno los caracteres
const printChar = (currentLetterIndex, wordArray) => {
    //Caso base: finalizar la recursión para evitar una recursión infinita
    //Cuando el largo del array sea igual al index actual quiere decir que estamos en la ultima letra se debe cortar la recursión
    if(wordArray.length === currentLetterIndex) return;
    //Si no es la ultima letra del input original - sacamos el primer caracter con substring
    inputOriginal.value = inputOriginal.value.substring(1)
    //Span - Animar los caracteres del resultado
    const spanChar = document.createElement("span");
    //Agregarlos al resultado
    resultado.appendChild(spanChar);
    //Animamos el span
    animateChar(spanChar)
    //ejecutamos lo que sigue solo despues de que se cumplio la promesa
        .then( () => {
            //Constante que es el caracter en el que estamos actualmente en el array de palabras
            const charSinCodificar = wordArray[currentLetterIndex];
            //Le ponemos al span el caracter encriptado
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? 
            //Buscamos dentro del alfabeto el indice del caracter sin codificar y le sumamos el rango
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] :
                //Si el carcater no esta dentro del alfabeto lo devolvemos sin codificar 
                charSinCodificar
                //Volvemos a llamar a la función pero nos movemos un lugar en el array de la palabra
            printChar(currentLetterIndex + 1, wordArray);
        });
}

//Funcion para animar cada uno de los caracteres
const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    //Promesa - Valor que puede estar disponible en el futuro
    //Esperamos a que se anime el caracter para colocar la letra encriptada
    //Cuando se termina de animar la promesa esta cumplida
    return new Promise(resolve => {
        //Ejecuta un fragmento de codigo de manera repetitiva en un cierto intervalo de tiempo
        const intervalo = setInterval(() => {
            //modicar el contenido del span por una letra aleatoria varias veces seguidas
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            //Le sumamos uno al cambio de letra 
            cambiosDeLetra++;
            //La animacion se termina dependiendo de cuantas veces se movieron las letras 
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

//Cuando el ususario presione enter se llama a la función submit la cual recibe el evento
const submit = e => {
    e.preventDefault();
    //Borrar la encriptación anterior para hacer una nueva
    resultado.innerHTML = '';
    //llamada a la función
    shifMessage()
}

cifrador.onsubmit = submit;