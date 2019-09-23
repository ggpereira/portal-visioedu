export interface IEstadoStatistics {
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