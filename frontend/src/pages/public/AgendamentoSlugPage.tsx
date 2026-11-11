import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarEmpresaPorSlug } from '../../services/api';
import type { EmpresaPublica, ServicoPublico } from '../../types/empresas.ts';

export default function AgendamentoSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const [empresa, setEmpresa] = useState<EmpresaPublica | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoPublico | null>(null);

  useEffect(() => {
    async function carregarEmpresa() {
      if (!slug) return;
      setLoading(true);
      setErro(null);
      const ignore = false;

      try {
        const dados = await buscarEmpresaPorSlug(slug);
        if (!ignore) {
          setEmpresa(dados);
        }
      } catch (err) {
        if (!ignore) {
          setErro('Erro ao buscar empresa.');
          console.log(err)
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

  carregarEmpresa();
  }, [slug]);

  // Formatador de Real Brasileiro
  const formatarPreco = (valor: number | string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));
  };

  // 1. Estado de Carregamento (Skeleton)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-4 animate-pulse">
          <div className="h-20 bg-slate-200 rounded-2xl w-full"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-3/4"></div>
          <div className="h-24 bg-slate-200 rounded-2xl w-full"></div>
          <div className="h-24 bg-slate-200 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  // 2. Estado de Erro / Não Encontrado (404)
  if (erro || !empresa) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✕
          </div>
          <h2 className="text-xl font-bold text-slate-800">Estabelecimento não encontrado</h2>
          <p className="text-slate-500 text-sm">
            O link de agendamento que você acessou não existe ou foi desativado.
          </p>
        </div>
      </div>
    );
  }

  // 3. Tela Principal de Serviços
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Cabeçalho da Empresa */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              Agendamento Online
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
              {empresa.nome}
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
            {empresa.nome.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Selecione um serviço</h2>
          <p className="text-sm text-slate-500">Escolha o que deseja agendar hoje</p>
        </div>

        {/* Lista de Serviços */}
        <div className="space-y-3">
          {empresa.servicos.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center text-slate-500 text-sm">
              Nenhum serviço disponível para agendamento no momento.
            </div>
          ) : (
            empresa.servicos.map((servico) => {
              const isSelected = servicoSelecionado?.id === servico.id;

              return (
                <div
                  key={servico.id}
                  onClick={() => setServicoSelecionado(servico)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/60 border-blue-600 shadow-sm shadow-blue-500/10'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-800 text-base">
                      {servico.nome}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        ⏱ {servico.duracaoMinutos} min
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-base">
                      {formatarPreco(servico.preco)}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Botão de Avançar (Ativo quando um serviço é selecionado) */}
        {servicoSelecionado && (
          <div className="pt-4 sticky bottom-4">
            <button
              onClick={() => alert(`Serviço selecionado: ${servicoSelecionado.nome}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-between"
            >
              <span>Continuar para data e hora</span>
              <span>➔</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}