import { Helper } from './utils/Helper';
import { Table, IBulkResult, Request, ConnectionPool } from 'mssql';
import { IMSsqlTableSender } from './dataLayer/mssql/IMSsqlTableSender';
export class MSsqlTableSender implements IMSsqlTableSender {
    private _pool: ConnectionPool;
    constructor(pool: ConnectionPool) {
        this._pool = pool;
    }
    public async sendTable(table: Table): Promise<void> {
        if (Helper.stringToBoolean(process.env.SEND)) {
            const tableCreationRequest = new Request(this._pool);
            const tableCreationResponse: IBulkResult | void = await tableCreationRequest.bulk(table).catch((err) => {
                console.log('Table Creation Error', err);
            });
            if (tableCreationResponse) {
                console.log(`fake data inserrted successfully. amount of records: ${tableCreationResponse.rowsAffected}`);
            }
        } else {
            console.log(`fake data inserrted successfully. amount of records: ${table.rows.length}`);
        }
    }
}
