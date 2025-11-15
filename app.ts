import { Actions } from "./Actions/Actions.ts";


interface InterfaceAccount {
  accountId: string;
  account: number;
  type: "deposit" | "withdraw";
}

async function BankFunction({ params }: { params: InterfaceAccount }) {
  try {
  
    const new_Actions = new Actions({ params: { ...params } });

    if (params.type === "deposit") {
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
}

const account: InterfaceAccount = {
  accountId: "12345",
  account: 500, 
  type: "withdraw",
};


BankFunction({ params: account });
