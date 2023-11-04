import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from'cors';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

//TRATAMENTO DE ERROS PARA NÃO PARAR NOSSA APLICACAO
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Error){
        //Se for uma instancia do tipo erro
        return res.status(400).json({
            erro: error.message
        });
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
})

app.listen(3333, () => {
    console.log('API ONLINE!');
})