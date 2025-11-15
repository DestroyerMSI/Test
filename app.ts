import { Actions } from "./Actions/Actions.ts";

// declaro el interface que tendra el InterfaceAccount esta sera la del parametro de la funcion
interface InterfaceAccount {
  accountId: string;
  account: number;
  type: "deposit" | "withdraw";
}
// Utilizo una async function para tener un control total de error a travez del try catch 
async function BankFunction({ params }: { params: InterfaceAccount }) {
  try {
     //Esto lo que hace es crear una nueva instancia basada en Action pero con los argumentos ya recibidos por parametro
    const new_Actions = new Actions({ params: { ...params } });

    if (params.type === "deposit") {
      //Aqui llamo al metodo de la nueva instancia
      await new_Actions.RechargeConcurrent(params.accountId, params.account);
      console.log("\n Deposito realizado con exito");
    } else {
      await new_Actions.WithdrawConcurrent(params.accountId, params.account);
      console.log("\n Retiro realizado con exito");
    }

    console.log("\n Fin del programa");
  } catch (error) {
    console.error(error);
    throw new Error(`Lo sentimos, ha ocurrido un error por favor intente de nuevo. ${error}`);
  }
  // no es necesario poner un finally ya que no quiero terminar ningun proceso ni actualizar un estado
}

// parametro que recibira las funcion
const account: InterfaceAccount = {
  accountId: "12345",
  account: 500, 
  type: "withdraw",
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
