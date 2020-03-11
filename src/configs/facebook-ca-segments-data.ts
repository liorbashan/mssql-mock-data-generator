import { MSsqlConfig } from '../types/MSsqlConfig';
import * as sql from 'mssql';

/**
 *
 * IMPORTANT: Always state if property is nullable or not.
 *
 */

export const dbConfig: MSsqlConfig = {
    connectionPoolConfig: {
        database: 'facebook_ca',
        password: 'facebook_ca_password',
        server: 'bi-utils-il.888holdings.corp',
        user: 'facebook_ca_user',
        options: {
            encrypt: false,
            enableArithAbort: true,
        },
    },
    tableName: 'MOCK_BI_Data_Segments',
    amountOfRecords: 80000,
    tableColumns: [
        {
            columnName: 'CID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: 'random.number(100000000)',
        },
        {
            columnName: 'First name',
            columnType: sql.NVarChar(500),
            option: { nullable: false, primary: false },
            fakerType: 'name.firstName',
        },
        {
            columnName: 'Last name',
            columnType: sql.NVarChar(500),
            option: { nullable: false, primary: false },
            fakerType: 'name.lastName',
        },
        {
            columnName: 'Birth Day',
            columnType: sql.DateTime,
            option: { nullable: false, primary: false },
            fakerType: 'date.between("01-01-1950", "01-01-2005")',
        },
        {
            columnName: 'Email',
            columnType: sql.NVarChar(600),
            option: { nullable: false, primary: false },
            fakerType: 'internet.email',
        },
        {
            columnName: 'Phone number',
            columnType: sql.NVarChar(100),
            option: { nullable: true, primary: false },
            fakerType: 'random.number(100000000000)',
        },
        {
            columnName: 'Reg. country',
            columnType: sql.NVarChar(100),
            option: { nullable: false, primary: false },
            fakerType: 'address.country',
        },
        {
            columnName: 'SubBrand id',
            columnType: sql.NVarChar(50),
            option: { nullable: false, primary: false },
            fakerType: ['888casino', '888games', '777'],
        },
        {
            columnName: 'Market',
            columnType: sql.NVarChar(500),
            option: { nullable: false, primary: false },
            fakerType: 'address.country',
        },
        {
            columnName: 'AppsFlyer ID',
            columnType: sql.NVarChar(500),
            option: { nullable: true, primary: false },
            fakerType: 'random.uuid',
        },
        {
            columnName: 'Mobile device ID',
            columnType: sql.NVarChar(500),
            option: { nullable: true, primary: false },
            fakerType: 'random.uuid',
        },
        {
            columnName: 'SegementID',
            columnType: sql.Int,
            option: { nullable: false, primary: false },
            fakerType: [1, 2, 3, 4, 5],
        },
        {
            columnName: 'Activity last bet',
            columnType: sql.DateTime,
            option: { nullable: true, primary: false },
            fakerType: 'date.between("01-01-2010", "01-01-2020")',
        },
        {
            columnName: 'last login',
            columnType: sql.DateTime,
            option: { nullable: false, primary: false },
            fakerType: 'date.between("01-01-2000", "01-01-2023")',
        },
        {
            columnName: 'Account status group',
            columnType: sql.NVarChar(10),
            option: { nullable: false, primary: false },
            fakerType: ['norm', 'vip'],
        },
        {
            columnName: 'Event Datetime',
            columnType: sql.DateTime,
            option: { nullable: false, primary: false },
            fakerType: 'date.between("2020-03-09", "2020-03-14")',
        },
        {
            columnName: 'Sum of bets',
            columnType: sql.Float,
            option: { nullable: false, primary: false },
            fakerType: 'random.number({min: 0, max: 5000, precision: 0.1})',
        },
    ],
};
