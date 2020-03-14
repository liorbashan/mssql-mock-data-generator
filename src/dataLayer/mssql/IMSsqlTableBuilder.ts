import { TableColumn } from './../../types/MSsqlConfig';
import { Table } from 'mssql';

export interface IMSsqlTableBuilder {
    buildMssqlTable(tableName: string, amountOfRecords: number, tableColumns: TableColumn[]): Table;
}
