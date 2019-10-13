/*
    Interface para a manipulação de dados relacionados a escolas
*/

export interface IEscola {
    co_entidade: number;
    no_entidade: string;
    situacao_funcionamento: string;
    co_regiao: number;
    co_uf: number;
    co_municipio: number;
    dependencia: string;
    tp_localizacao: string;
    agua_filtrada: string;
    agua: string;
    energia: string;
    reciclagem: string;
    esgoto: string;
    coletaDeLixo: string;
    laboratorioDeInformatica: string;
    salaAtendimentoEspecial: string;
    laboratorioCiencias: string;
    salaLeitura: string;
    qtSalas: number;
    qtSalasUtilizadas: number;
    retroprojetor: string;
    equipamentoMultimidia: string;
    biblioteca: string;
    bibliotecaSalaLeitura: string;
    qtCompAluno: number;
    internet: string;
    bandaLarga: string;
    qtFuncionarios: number;
    tp_aee: string;
    tp_localizacao_diferenciada: string;
}

export interface IResponseEscola {
    data: Array<IEscola>;
    maxPages: number;
    per_page: number;
}
