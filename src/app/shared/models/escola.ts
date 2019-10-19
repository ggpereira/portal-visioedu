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



interface EscolaViewItem {
    label: string;
    value: any;
    icon: string;
    color: string;
}
interface EscolaView {
    Internet: EscolaViewItem;
    BandaLarga: EscolaViewItem;
    AguaFiltrada: EscolaViewItem;
    Agua: EscolaViewItem;
    EnergiaEletrica: EscolaViewItem;
    Reciclagem: EscolaViewItem;
    Esgoto: EscolaViewItem;
    ColetaDeLixo: EscolaViewItem;
    LaboratorioDeCiencias: EscolaViewItem;
    Biblioteca: EscolaViewItem;
    EspacoDeLeituraBiblioteca: EscolaViewItem;
    SalaAtendimentoEspecial: EscolaViewItem;
    EquipamentoMultimidia: EscolaViewItem;
    SalaDeLeitura: EscolaViewItem;
}

interface EscolaViewInfo {
    SituacaoFuncionamento: EscolaViewItem;
    Dependencia: EscolaViewItem;
    TipoDeLocalizacao: EscolaViewItem;
    QuantidadeFuncionarios: EscolaViewItem;
    QuantidadeSalas: EscolaViewItem;
    QuantidadeDeSalasUtilizadas: EscolaViewItem;
    AtendimentoEducacionalEspecializado: EscolaViewItem;
}

export let EscolaInfoData: EscolaViewInfo = {
    SituacaoFuncionamento: {
        label: 'Situação Funcionamento',
        value: '',
        icon: 'info',
        color: '#9493EA'
    },
    Dependencia: {
        label: 'Dependência',
        value: '',
        icon: 'info',
        color: '#900C3F'
    },
    TipoDeLocalizacao: {
        label: 'Tipo de Localização', value: '',
        icon: 'terrain',
        color: '#D85426'
    },
    QuantidadeFuncionarios: {
        label: 'Quantidade de Funcionários',
        value: '',
        icon: 'person',
        color: '#6E16CB'
    },
    QuantidadeSalas: {
        label: 'Quantidade de Salas',
        value: '',
        icon: 'meeting_room',
        color: '#FFC300'
    },
    QuantidadeDeSalasUtilizadas: {
        label: 'Salas Utilizadas',
        value: '',
        icon: 'meeting_room',
        color: '#FF5733'
    },
    AtendimentoEducacionalEspecializado: {
        label: 'Atendimento Educacional Especializado',
        value: '',
        icon: 'supervisor_account',
        color: '#7BCAC7'
    }
};

export let EscolaViewData: EscolaView = {
    Internet: {
        label: 'Internet',
        value: '',
        icon: 'language',
        color: '#C65C86'
    },
    BandaLarga: {
        label: 'Banda Larga',
        value: '',
        icon: 'settings_input_antenna',
        color: '#7BCAC7'
    },
    AguaFiltrada: {
        label: 'Água Filtrada',
        value: '',
        icon: 'local_drink',
        color: '#900C3F'
    },
    Agua: {
        label: 'Água',
        value: '',
        icon: 'local_drink',
        color: '#2384FF'
    },
    EnergiaEletrica: {
        label: 'Energia Elétrica',
        value: '',
        icon: 'flash_on',
        color: '#EEE415'
    },
    Reciclagem: {
        label: 'Reciclagem',
        value: '',
        icon: 'info',
        color: '#FFC300'
    },
    Esgoto: {
        label: 'Esgoto',
        value: '',
        icon: 'info',
        color: '#567569'
    },
    ColetaDeLixo: {
        label: 'Coleta de Lixo',
        value: '',
        icon: 'info',
        color: '#7BCAC7'
    },
    LaboratorioDeCiencias: {
        label: 'Laboratório de Ciências',
        value: '',
        icon: 'toys',
        color: '#7BCAC7'
    },
    Biblioteca: {
        label: 'Biblioteca',
        value: '',
        icon: 'book',
        color: '#7BCAC7'
    },
    EspacoDeLeituraBiblioteca: {
        label: 'Espaço de Leitura na Biblioteca',
        value: '',
        icon: 'book',
        color: '#21D977'
    },
    SalaAtendimentoEspecial: {
        label: 'Sala para atendimento Especial',
        value: '', icon: 'supervisor_account',
        color: '#1A854C'
    },
    EquipamentoMultimidia: {
        label: 'Equipamento Multimídia', value: '',
        icon: 'devices',
        color: '#900C3F'
    },
    SalaDeLeitura: {
        label: 'Sala de leitura',
        value: '',
        icon: 'book',
        color: '#FF5733'
    }
};
