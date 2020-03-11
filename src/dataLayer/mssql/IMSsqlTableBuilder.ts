import { MSsqlConfig } from './../../types/MSsqlConfig';
import { Table } from 'mssql';

export interface IMSsqlTableBuilder {
    buildMssqlTable(config: MSsqlConfig): Table;
}
