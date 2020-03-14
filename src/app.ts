import { MSsqlTableSender } from './MSsqlTableSender';
import { IMSsqlTableSender } from './dataLayer/mssql/IMSsqlTableSender';
import { Helper } from './utils/Helper';
import { MSsqlTableBuilder } from './dataLayer/mssql/MSsqlTableBuilder';
import { IMSsqlTableBuilder } from './dataLayer/mssql/IMSsqlTableBuilder';
import 'reflect-metadata';
import { ConnectionPool, Table } from 'mssql';
import { MSsqlConfig } from './types/MSsqlConfig';
import ProgressBar from 'progress';

(async () => {
    // Load Configuration:
    const fileName = process.env.DB_CONFIG_FILE_NAME;
    const dbConfig: MSsqlConfig = await require(`./configs/${fileName}`).dbConfig;
    let pool: ConnectionPool | any = null;

    if (Helper.stringToBoolean(process.env.SEND)) {
        // Connect to DB:
        pool = new ConnectionPool(dbConfig.connectionPoolConfig);
        await pool.connect().catch((err) => {
            console.log('connection error', err);
            return;
        });
        console.log('Connected to database');

        pool.on('error', (err) => {
            console.log('error event', err);
        });

        process.on('beforeExit', async () => {
            if (pool.connected) {
                await pool.close().catch((err) => {
                    console.log(err);
                });
                console.log('Disconnected database');
            }
        });
    }

    const tableBuilder: IMSsqlTableBuilder = new MSsqlTableBuilder();
    // disable ts:
    const tableSender: IMSsqlTableSender = new MSsqlTableSender(pool);
    // tslint:disable-next-line: no-console
    console.time('app start');
    const numOfBulkInserts: number[] = Helper.splitToCuncks(dbConfig.amountOfRecords, Number(process.env.BULK_SIZE));
    for (let index = 0; index < numOfBulkInserts.length; index++) {
        const table: Table = tableBuilder.buildMssqlTable(dbConfig.tableName, numOfBulkInserts[index], dbConfig.tableColumns);
        await tableSender.sendTable(table);
    }
    // tslint:disable-next-line: no-console
    console.timeEnd('app start');
})();
