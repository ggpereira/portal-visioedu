/*
    Interface para a manipulação de dados relacionados a estatísticas
*/

export interface IEstatisticas {
    codigo: number;
    estado: string;
    uf: string;
    qt_escolas: number;
    porcentagemAguaFiltrada: number;
    porcentagemAguaInexistente: number;
    porcentagemEsgotoInexistente: number;
    porcentagemEnergiaInexistente: number;
    porcentagemLixoRecicla: number;
    porcentagemLixoColetaPeriodica: number;
    porcentagemLaboratorioInformatica: number;
    porcentagemSalaAtendimentoEspecial: number;
    porcentagemLaboratorioCiencias: number;
    porcentagemBiblioteca: number;
    porcentagemSalaLeitura: number;
    porcentagemInternet: number;
    porcentagemBandaLarga: number;
}


// tslint:disable-next-line: no-empty-interface
export interface IEstatisticasEstado extends IEstatisticas {}

export interface IEstatisticasCidade extends IEstatisticas {
    municipio: string;
}

/*
    Interface da resposta retornada pelo backend
*/
export interface IResponseEstatistica {
    data: IEstatisticasEstado[] | IEstatisticasCidade[];
}



