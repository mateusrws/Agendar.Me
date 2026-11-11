import type { EmpresaPublica } from '../types/empresas';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function buscarEmpresaPorSlug(slug: string): Promise<EmpresaPublica> {
  const response = await fetch(`${API_BASE_URL}/public/empresas/${slug}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Empresa não encontrada');
    }
    throw new Error('Erro ao carregar dados da empresa');
  }

  return response.json();
}