import { Actions } from "./Actions/Actions.js";
async function BankFunction({ params }) {
    try {
        const new_Actions = new Actions({ params: { ...params } });
        if (params.type === "deposit") {
            await new_Actions.RechargeConcurrent(params.accountId, params.account);
            console.log("\n Deposito realizado con exito");
        }
        else {
            await new_Actions.WithdrawConcurrent(params.accountId, params.account);
            console.log("\n Retiro realizado con exito");
        }
        console.log("\n Fin del programa");
    }
    catch (error) {
        console.error(error);
        throw new Error(`Lo sentimos, ha ocurrido un error por favor intente de nuevo. ${error}`);
    }
}
const account = {
    accountId: "12345",
    account: 500,
    type: "withdraw",
};
BankFunction({ params: account });
//# sourceMappingURL=app.js.map