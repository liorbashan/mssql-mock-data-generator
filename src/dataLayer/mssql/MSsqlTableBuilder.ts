import { FakeDataGenerator } from './../../utils/FakeDataGenerator';
import { IFakeDataGenerator } from './../../utils/IFakeDataGenerator';
import { Table } from 'mssql';
import { MSsqlConfig } from './../../types/MSsqlConfig';
import { IMSsqlTableBuilder } from './IMSsqlTableBuilder';

export class MSsqlTableBuilder implements IMSsqlTableBuilder {
    public buildMssqlTable(config: MSsqlConfig): Table {
        try {
            // Create Table:
            console.log('preparing table');
            const table: Table = new Table(config.tableName);
            table.create = true;
            console.log('setting up table columns');
            config.tableColumns.forEach((column) => {
                table.columns.add(column.columnName, column.columnType, column.option);
            });

            // Add records to table:
            console.log('adding fake data to table');
            for (let index = 0; index < config.amountOfRecords; index++) {
                const fakeData: IFakeDataGenerator = new FakeDataGenerator();
                const vars: any[] = [];
                config.tableColumns.forEach((element) => {
                    vars.push(fakeData.generateFakeValue(element));
                });
                table.rows.add(...vars);
                const progress: number = (index * 100) / config.amountOfRecords;
                console.log(`${progress}%...`);
            }
            console.log('table is ready');
            return table;
        } catch (error) {
            console.log('Error building MSSQL table', error);
            throw new Error(error);
        }
    }
}
