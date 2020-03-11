import { config, IColumnOptions, Table } from 'mssql';

export type MSsqlConfig = {
    connectionPoolConfig: config;
    tableName: string;
    amountOfRecords: number;
    tableColumns: TableColumn[];
    dropExistingData?: boolean;
};

export type TableColumn = {
    fakerType: string | string[] | number | number[];
    columnName: string;
    columnType: any;
    option: IColumnOptions;
};

export type TableBuilderResponse = {
    nextIndex?: number;
    table: Table;
};
