import { Table } from 'mssql';

export interface IMSsqlTableSender {
    sendTable(table: Table): Promise<void>;
}
