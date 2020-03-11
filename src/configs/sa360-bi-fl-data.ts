import { MSsqlConfig } from '../types/MSsqlConfig';
import * as sql from 'mssql';

/**
 *
 * IMPORTANT: Always state if property is nullable or not.
 *
 */

export const dbConfig: MSsqlConfig = {
    connectionPoolConfig: {
        database: 'SA_360_DB',
        password: 'dev_9985n!@#$fvsfg43435',
        server: 'DWH_DEV.888holdings.corp',
        user: 'sa_360',
        options: {
            encrypt: false,
            enableArithAbort: true,
        },
    },
    tableName: 'MOCK_BI_Floodlight_Data',
    amountOfRecords: 10,
    tableColumns: [
        {
            columnName: 'Floodlight',
            columnType: sql.NVarChar(50),
            option: { nullable: false, primary: false },
            fakerType: ['Reg – All', 'Reg – Blocked', 'FTD – All', 'FTD – Blocked'],
        },
        {
            columnName: 'CID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(10000000)',
        },
        {
            columnName: 'Campaign ID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(10000)',
        },
        {
            columnName: 'Serial ID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(1000000000)',
        },
        {
            columnName: 'GCLID',
            columnType: sql.NVarChar(2000),
            option: { nullable: false, primary: false },
            fakerType: 'random.uuid',
        },
        {
            columnName: 'Publisher ID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(10000)',
        },
        {
            columnName: 'Brand',
            columnType: sql.NVarChar(15),
            option: { nullable: false, primary: false },
            fakerType: 'lorem.word({min:1,max:1})',
        },
        {
            columnName: 'Brand ID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(100)',
        },
        {
            columnName: 'Is Blocked',
            columnType: sql.Bit,
            option: { nullable: false, primary: false },
            fakerType: 'random.boolean',
        },
        {
            columnName: 'Amount USD',
            columnType: sql.Decimal(19, 2),
            option: { nullable: true, primary: false },
            fakerType: 'finance.amount',
        },
        {
            columnName: 'Amount GBP',
            columnType: sql.Decimal(19, 2),
            option: { nullable: true, primary: false },
            fakerType: 'finance.amount',
        },
        {
            columnName: 'Transaction Timestamp',
            columnType: sql.DateTime,
            option: { nullable: false, primary: false },
            fakerType: 'date.between("2019-01-01", "2023-01-01")',
        },
        {
            columnName: 'LTV',
            columnType: sql.Float,
            option: { nullable: true, primary: false },
            fakerType: 'random.number({min: 1, max: 5000, precision: 0.1})',
        },
    ],
};
