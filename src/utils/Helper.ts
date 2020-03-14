import * as readline from 'readline';

export class Helper {
    public static splitToCuncks(origNumber: number, chunkSize: number): number[] {
        const result: number[] = [];
        if (origNumber <= chunkSize) {
            result.push(origNumber);
        } else {
            while (origNumber > 0) {
                if (origNumber - chunkSize >= 0) {
                    result.push(chunkSize);
                    origNumber = origNumber - chunkSize;
                } else {
                    result.push(origNumber);
                    break;
                }
            }
        }
        return result;
    }

    public static stringToBoolean(str: string | undefined): boolean {
        if (str === undefined) {
            return false;
        } else {
            switch (str.toLowerCase().trim()) {
                case 'true':
                case 'yes':
                case '1':
                    return true;
                case 'false':
                case 'no':
                case '0':
                case null:
                    return false;
                default:
                    return Boolean(str);
            }
        }
    }

    public static consoleWriteLine(str: string): void {
        console.clear();
        console.log(str);
    }
}
