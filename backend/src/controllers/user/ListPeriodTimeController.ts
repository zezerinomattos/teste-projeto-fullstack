import { Request, Response } from "express"

import { ListPeriodTimeService } from '../../services/user/ListPeriodTimeService';

class ListPeriodTimeController{
    async handle(req: Request, res: Response){
        const { initialDate, finalDate } = req.body;

        const periodTimeService = new ListPeriodTimeService();

        //Verificando se os campos estao vazios.
        if(!initialDate || !finalDate){
            throw new Error('Dados Invalidos, Informe os dados obrigatórios');
        }

        // Convertendo as strings para objetos Date
        const initial = new Date(initialDate);
        const Final = new Date(finalDate);
        
        const users = await periodTimeService.execute({
            initialDate: initial, 
            finalDate: Final,
        });

        return res.json(users);
    }
}

export { ListPeriodTimeController }