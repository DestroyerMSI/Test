//Defino el tipo de Account
interface Account {
  accountId: string;
  balance: number;
  version: number;
}
// Aqui creo un diccionario con el new Map y le digo q tendra una interfaz de string y como el interface de Account
const accounts = new Map<string, Account>();
//Guardos los valores en las distintas propiedades del objecto utilizando como clave el "12345" que es el id
accounts.set("12345", { accountId: "12345", balance: 1000, version: 0 });


export class Actions {
  // Aqui declaro el tipo del params que le va a llegar al constructor por el constructor
  params: { accountId: string; account: number; type: "deposit" | "withdraw" };
// El constructor sirve para a una clase se le pueda hacer llegar un argumento por parametro al crear una nueva instancia
  constructor({params}: {params: {accountId: string;account: number;type: "deposit" | "withdraw";};}) {
    this.params = params;
  }
   
  // Aqui creo el metodo RechargeConcurrent que es la funcion para poder Recargar le digo que el parametro sera una promesa ya que debe esperar ese valor antes de iniciar el Promese sirve para decir que la funcion debe esperar retornar un valor con este tipo de interface que puse Account
  async RechargeConcurrent(accountId: string,amount: number,maxRetries = 5): Promise<Account> {
    return this.updateAccountBalance(accountId, amount, "deposit", maxRetries);
  }
// Aqui creo el metodo WithdrawConcurrent que es la funcion para poder Retirar 
  async WithdrawConcurrent(accountId: string,amount: number,maxRetries = 5): Promise<Account> {
    return this.updateAccountBalance(accountId, amount, "withdraw", maxRetries);
  }
// Al poner privado el metodo esto significa que nada mas se podra usar dentro de la clase
private async updateAccountBalance(accountId: string,amount: number,type: "deposit" | "withdraw",maxRetries: number
): Promise<Account> {
  // Esto se utiliza para un un diccionario la propiedad get sirve para devolver la cuenta al ingresar el valor del id 
  const acc = accounts.get(accountId);

  if (!acc) throw new Error("Cuenta no encontrada");

  const values = type === "deposit" ? amount : -amount;
  const projected = acc.balance + values;

  // Aqui verifico si la cuenta no queda en negativo antes de actualizarla
  if (projected < 0) {
    throw new Error("Saldo insuficiente");
  }

  const expectedVersion = acc.version;

  acc.balance = projected;
  acc.version = expectedVersion + 1;
  accounts.set(accountId, acc);

  console.log(`Operación ${type} aplicada. Nuevo saldo: ${acc.balance}`);
  return acc;
}



}
