import { dbConfig } from './configs/sa360-bi-fl-data';
import { MSsqlTableBuilder } from './dataLayer/mssql/MSsqlTableBuilder';
import { IMSsqlTableBuilder } from './dataLayer/mssql/IMSsqlTableBuilder';
import 'reflect-metadata';
import { Request, ConnectionPool, Table, IBulkResult } from 'mssql';
import { MSsqlConfig } from './types/MSsqlConfig';

(async () => {
    // let dbConfig: MSsqlConfig;
    // Load Configuration:
    const fileName = process.env.DB_CONFIG_FILE_NAME;
    const dbConfig: MSsqlConfig = await require(`./configs/${fileName}`).dbConfig;

    // Connect to DB:
    const pool: ConnectionPool = new ConnectionPool(dbConfig.connectionPoolConfig);
    await pool.connect().catch((err) => {
        console.log('connection error', err);
        return;
    });
    console.log('Connected to database');

    pool.on('error', (err) => {
        console.log('error event', err);
    });

    try {
        const tableBuilder: IMSsqlTableBuilder = new MSsqlTableBuilder();
        const table: Table = tableBuilder.buildMssqlTable(dbConfig);

        // Execute:
        console.log('insert table into database');
        const tableCreationRequest = new Request(pool);
        const tableCreationReSponse: IBulkResult | void = await tableCreationRequest.bulk(table).catch((err) => {
            console.log('Table Creation Error', err);
        });
        if (tableCreationReSponse) {
            console.log(`fake data inserrted successfully. amount of records: ${tableCreationReSponse.rowsAffected}`);
        }
    } catch (error) {
        console.log(error);
    }

    process.on('beforeExit', async () => {
        if (pool.connected) {
            await pool.close().catch((err) => {
                console.log(err);
            });
            console.log('Disconnected database');
        }
    });
})();
