import { TableColumn } from '../types/MSsqlConfig';
import { IFakeDataGenerator } from './IFakeDataGenerator';
import * as faker from 'faker';

export class FakeDataGenerator implements IFakeDataGenerator {
    public generateFakeValue(tableColumn: TableColumn): any {
        if (tableColumn.option.nullable) {
            const random_boolean: boolean = Math.random() >= 0.5;
            if (!random_boolean) {
                return undefined;
            }
        }
        return this.getValueBySqlType(tableColumn);
    }

    private getValueBySqlType(tableColumn: TableColumn): string | number | boolean | Date {
        // tslint:disable-next-line: no-unused-expression
        faker;
        let data: any = null;
        const fakerConfig = tableColumn.fakerType;
        if (Array.isArray(fakerConfig)) {
            const numOfOptions: number = fakerConfig.length;
            const random: number = Math.floor(Math.random() * numOfOptions);
            data = fakerConfig[random];
        } else {
            let fakerCommand: string;
            if (fakerConfig.toString().includes('(')) {
                fakerCommand = `faker.${fakerConfig}`;
            } else {
                fakerCommand = `faker.${fakerConfig}()`;
            }
            // tslint:disable-next-line: no-eval
            data = eval(fakerCommand);
        }
        return data;
    }
}
