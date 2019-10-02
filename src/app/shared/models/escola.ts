/*
    Interface para a manipulação de dados relacionados a escolas
*/
export interface IEscola {
    co_entidade: number;
    no_entidade: string;
    tp_situacao_funcionamento: number;
    co_regiao: number;
    co_uf: number;
    co_municipio: number;
    tp_dependencia: number;
    tp_localizacao: number;
    in_agua_filtrada: number;
    in_agua_inexistente: number;
    in_esgoto_inexistente: number;
    in_energia_inexistente: number;
    in_lixo_recicla: number;
    in_lixo_coleta_periodica: number;
    in_laboratorio_informatica: number;
    in_sala_atendimento_especial: number;
    in_laboratorio_ciencia: number;
    in_sala_leitura: number;
    in_biblioteca_sala_leitura: number;
    qt_salas_existentes: number;
    qt_salas_utilizadas: number;
    in_equip_retroprojetor: number;
    in_equip_multimidia: number;
    qt_comp_aluno: number;
    in_internet: number;
    in_bandalarga: number;
    qt_funcionarios: number;
    tp_aee: number;
    tp_localizacao_diferenciada: number;
}

export interface IResponseEscola {
    data: Array<IEscola>;
    maxPages: number;
    per_page: number;
}
