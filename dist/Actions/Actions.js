import * as readline from "readline-sync"; //Aqui tuve que cambiar en el tsconfig el a esnext porque me estaba reconociendo el proyecto basado en el commonjs
export class Actions {
    // Esto lo hago para declarar el params del constructor esto es obligatorio en ts en js no habria que ponerlo
    params;
    //Esto lo creo para que la clase Action pueda resivir un parametro al crear un nueva instancia con la clase
    constructor({ params }) {
        this.params = params;
    }
    Recharge = () => {
        let action = true;
        let quantity = this.params.account;
        console.log(`Saldo disponible es de ${quantity}`);
        while (action) {
            const quantity_add = readline.question("¿Cuanto deseas depositar? \n");
            const new_quantity_add = quantity_add.trim();
            if (Number(new_quantity_add)) {
                quantity += Number(new_quantity_add);
                console.log(`Cantidad depositada: ${new_quantity_add}\nTotal actual: ${quantity}\n`);
                const action_repeat = readline.question("Deseas seguir depositando teclee 1 o si deseas salir 0? \n");
                const new_action_repeat = action_repeat.trim();
                const parsed = Number(new_action_repeat);
                if (!isNaN(parsed)) {
                    switch (parsed) {
                        case 0:
                            action = false;
                            break;
                        case 1:
                            break;
                        default:
                            console.log("Por favor teclee una opción válida.\n");
                            break;
                    }
                }
                else {
                    console.log("Por favor teclee una opción válida.\n");
                }
            }
            else {
                console.log("Por favor teclee un número.\n");
            }
        }
    };
    Withdrawal = () => {
        let action = true;
        let quantity = this.params.account;
        console.log(`Saldo disponible es de ${quantity}`);
        while (action) {
            const entrance = readline.question("Por favor teclee la cantidad extraer. \n");
            const new_entrance = entrance.replace(" ", ""); // Elimine los espacios de las dos formas con el trim q es para eliminar los espacios y el remplace que remplaza un caracter por otro dado y en una cadena de string un espacio(' ') es un caracter
            const number_entrance = Number(new_entrance);
            if (number_entrance) {
                const verify = quantity - number_entrance >= 0;
                if (verify) {
                    quantity -= number_entrance;
                    console.log(`Saldo total es de ${quantity}`);
                    const action_repeat = readline.question("Deseas seguir retirando teclee 1 o si deseas salir 0? \n");
                    const new_action_repeat = action_repeat.replace(" ", "");
                    const parsed = Number(new_action_repeat);
                    if (!isNaN(parsed)) {
                        // Esto es para verificar que no es NAN q es una operacion matematica no valida
                        switch (parsed) {
                            case 0:
                                action = false; // aqui que termine de iterar el bucle while
                                break;
                            case 1:
                                break;
                            default:
                                console.log("Por favor teclee una opción válida.\n");
                                break;
                        }
                    }
                    else {
                        console.log("Por favor teclee una opción válida.\n");
                    }
                }
                else {
                    console.log("Lo sentimos no cuenta con esa cantidad de dinero disponible. \n Saldo actual: ", quantity);
                }
            }
            else {
                console.log("Por favor debes de ingresar un numero. \n");
            }
        }
    };
}
//# sourceMappingURL=Actions.js.map