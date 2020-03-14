import { Helper } from './../../utils/Helper';
import { FakeDataGenerator } from './../../utils/FakeDataGenerator';
import { IFakeDataGenerator } from './../../utils/IFakeDataGenerator';
import { Table } from 'mssql';
import { IMSsqlTableBuilder } from './IMSsqlTableBuilder';
import { TableColumn } from './../../types/MSsqlConfig';

export class MSsqlTableBuilder implements IMSsqlTableBuilder {
    public buildMssqlTable(tableName: string, amountOfRecords: number, tableColumns: TableColumn[]): Table {
        try {
            // Create Table:
            console.log('preparing table');
            const table: Table = new Table(tableName);
            table.create = true;
            console.log('setting up table columns');
            tableColumns.forEach((column) => {
                table.columns.add(column.columnName, column.columnType, column.option);
            });

            // Add records to table:
            console.log('adding fake data to table');
            for (let index = 0; index < amountOfRecords; index++) {
                const fakeData: IFakeDataGenerator = new FakeDataGenerator();
                const vars: any[] = [];
                tableColumns.forEach((element) => {
                    vars.push(fakeData.generateFakeValue(element));
                });
                table.rows.add(...vars);
                const progress: number = (index * 100) / amountOfRecords;
                Helper.consoleWriteLine(`Progress ${progress}% ...`);
            }
            console.log('table is ready');
            return table;
        } catch (error) {
            console.log('Error building MSSQL table', error);
            throw new Error(error);
        }
    }
}
