import { TableColumn } from '../types/MSsqlConfig';

export interface IFakeDataGenerator {
    generateFakeValue(tableColumn: TableColumn): any;
}
