import { z } from 'zod';

export const ServicoPublicoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  duracaoMinutos: z.number().int().positive(),
  preco: z.union([z.number(), z.string()]),
});

export const EmpresaPublicaSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  slug: z.string(),
  whatsappContato: z.string(),
  servicos: z.array(ServicoPublicoSchema),
});

export type ServicoPublicoDto = z.infer<typeof ServicoPublicoSchema>;
export type EmpresaPublicaDto = z.infer<typeof EmpresaPublicaSchema>;
