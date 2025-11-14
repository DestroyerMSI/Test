interface InterfaceAccount_Params {
    accountId: string;
    account: number;
    type: "deposit" | "withdraw";
}
export declare class Actions {
    params: InterfaceAccount_Params;
    constructor({ params }: {
        params: InterfaceAccount_Params;
    });
    Recharge: () => void;
    Withdrawal: () => void;
}
export {};
//# sourceMappingURL=Actions.d.ts.map