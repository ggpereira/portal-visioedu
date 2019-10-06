/*
    Interface para a manipulação de dados relacionados ao Enem
*/

export interface IDadosEnem {
    nu_inscricao: number;
    nu_idade: number;
    tp_sexo: string;
    tp_st_conclusao: number;
    tp_ano_concluiu: number;
    in_treineir: number;
    in_baixa_visao: number;
    in_cegueira: number;
    in_surdez: number;
    in_deficiencia_auditiva: number;
    in_surdo_cegueira: number;
    in_deficiencia_fisica: number;
    in_deficiencia_mental: number;
    in_deficit_atencao: number;
    in_dislexia: number;
    in_discalculia: number;
    in_autismo: number;
    in_visao_monocular: number;
    in_outra_def: number;
    tp_presenca_cn: number;
    tp_presenca_ch: number;
    tp_presenca_lc: number;
    tp_presenca_mt: number;
    nu_nota_cn: number;
    nu_nota_ch: number;
    nu_nota_lc: number;
    nu_nota_mt: number;
    tp_lingua: number;
    tp_status_redacao: number;
    nu_nota_redacao: number;
    co_escola: number;
}

export interface IMediasEnem {
    codigo: number;
    estado: string;
    uf: string;
    municipio?: string;
    mediaGeral: number;
    mediaCn: number;
    mediaCh: number;
    mediaMat: number;
    mediaLc: number;
    mediaRedacao: number;
}
export interface IResponseDadosEnem {
    data: Array<IDadosEnem>;
}

export interface IResponseMediasEnem {
    data: Array<IMediasEnem>;
}
