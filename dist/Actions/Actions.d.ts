interface Account {
    accountId: string;
    balance: number;
    version: number;
}
export declare class Actions {
    params: {
        accountId: string;
        account: number;
        type: "deposit" | "withdraw";
    };
    constructor({ params }: {
        params: {
            accountId: string;
            account: number;
            type: "deposit" | "withdraw";
        };
    });
    RechargeConcurrent(accountId: string, amount: number, maxRetries?: number): Promise<Account>;
    WithdrawConcurrent(accountId: string, amount: number, maxRetries?: number): Promise<Account>;
    private updateAccountBalance;
}
export {};
//# sourceMappingURL=Actions.d.ts.map