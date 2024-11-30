import dotenv from 'dotenv';

dotenv.config();

export const config: IConfig = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/matala1',
    PORT: parseInt(process.env.PORT || '5000'),
}
interface IConfig {

    MONGO_URI: string;
    PORT: number 
}