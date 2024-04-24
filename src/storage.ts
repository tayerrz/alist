export interface StorageAccount {
    id: string;
    availableSpace: number; // in bytes
    totalSpace: number; // in bytes
}

export class StoragePool {
    private accounts: StorageAccount[];

    constructor() {
        this.accounts = [];
    }

    addAccount(account: StorageAccount): void {
        this.accounts.push(account);
    }

    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    uploadFile(fileSize: number): StorageAccount {
        const account = this.findAccountForFile(fileSize);
        if (account) {
            console.log(`Uploading file to account ${account.id}`);
            account.availableSpace -= fileSize; // Update available space
            return account;
        } else {
            throw new Error('No sufficient space available');
        }
    }

    private findAccountForFile(fileSize: number): StorageAccount | undefined {
        return this.accounts.reduce((acc, curr) => {
            if (curr.availableSpace >= fileSize && (!acc || curr.availableSpace < acc.availableSpace)) {
                return curr;
            }
            return acc;
        }, undefined);
    }
}
