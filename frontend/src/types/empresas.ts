export interface ServicoPublico {
  id: string;
  nome: string;
  duracaoMinutos: number;
  preco: number | string;
}

export interface EmpresaPublica {
  id: string;
  nome: string;
  slug: string;
  whatsappContato: string;
  servicos: ServicoPublico[];
}