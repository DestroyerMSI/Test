import { Actions } from "./Actions/Actions.ts";

interface InterfaceAccount {
  accountId: string;
  account: number;
  type: "deposit" | "withdraw";
}
// Trabaje con una funcion async para poder tener un control total de la funcion a traves de try catch, manejando asi de forma correcta los errores evitando caidas del programa
async function BankFunction({ params }: { params: InterfaceAccount }) {
  try {
    // Aqui creo una nueva clase basada en Action pero con los parametros ya efinidos esto es necesario a las que tienen constructor
    const new_Actions = new Actions({ params: { ...params } });
    if (params.type === "deposit") {
      // Decidi refactorizar el codigo ya que es mas limpio y facil de entender
      // Aqui llamo a la nueva instancia y de ahi llamo como funcion a su propiedad
      new_Actions.Recharge();
      console.log("\n Fin del programa");
      return;
    } else {
      new_Actions.Withdrawal();
      console.log("\n Fin del programa");
      return;
    }
  } catch (error) {
    console.error(error);
    // Esto es para que muestre un error en caso de que lo halla pero en un caso real esto no puedo llegar al usuario ya que es muy agresivo por ejemplo en una api seria return res.status(500).send("Lo sentimos ha ocurrido un error") y el throw Error detiene el servidor algo que nunca deberia ocurrir
    throw new Error(`Lo sentimos, ha ocurrido un error del servidor. ${error}`);
  }
  // No hay nececidad de poner un finally ya que no quiero devolver el estado de la funcion ni detener algun proceso
}

// Creo un objecto para pasarlo por argumento del mismo tipo que el parametro de la funcion
const account: InterfaceAccount = {
  accountId: "12345", //Identificar unico de usuario este es inmutable en la base de datos ya q se coloca con la condicion de PRIMARY KEY
  account: 1000, // Cantidad de dinero 
  type: "withdraw", // tipo de accion
};

BankFunction({ params: account });

/*
 Para evitar las deudas tecnicas yo desarrollaria programas escalables y legibles con aquitectura como la MVC (model view controller)
con validaciones en los servidores con zod y json web token y la implementacion del metodo https para que los datos viejen de forma encriptada desde el cliente a servidor,
manejando correctamente los estados para evitar quiebres o caida de servidores, en el frontend utilizando el next js utilizaria el enrutado de carpeta que es muy facil de entender,
usaria el 'use cache' para guardar en chache los resultados fetch mejorando significativamente el rendimiento de la web y aprevecharia el SSR con componente asincronos.A la vez me mantendria actualizado con las ultimas versiones de las tecnologias  

Para dar solucion a este problema en vida real crearia un servidor con node y express el cual lo haria con una aquitectura de microservicios con diferentes enpoint en para que pueda realizarse varias acciones a la vez 
como /retirar, /recargar, /perfil_state todo esto con un codigo limpio y escalable

Para correr el codigo haga un npm install y npm run dev

*/
