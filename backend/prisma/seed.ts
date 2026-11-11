import { db } from '../src/prisma/db'; // Ajuste o caminho conforme a pasta do seed

async function main() {
  console.log('🌱 Populando banco de dados com dados de teste...');

  // 1. Busca ou cria o usuário dono
  let usuario = await db.orm.public.Usuario.where({
    email: 'ze@barbearia.com',
  }).first();

  if (!usuario) {
    usuario = await db.orm.public.Usuario.create({
      email: 'ze@barbearia.com',
      senhaHash: '$2b$10$abcdefghijklmnopqrstuv', // Hash fictício para teste
    });
  }

  // 2. Busca ou cria a empresa
  let empresa = await db.orm.public.Empresa.where({
    slug: 'barbearia-do-ze',
  }).first();

  if (!empresa) {
    empresa = await db.orm.public.Empresa.create({
      usuarioId: usuario.id,
      nome: 'Barbearia do Zé',
      slug: 'barbearia-do-ze',
      whatsappContato: '11999998888',
    });
  }

  // 3. Remove serviços antigos e cria os exemplos
  await db.orm.public.Servico.where({ empresaId: empresa.id }).deleteAll();

  // .toArray() consome o AsyncIterableResult e garante a inserção de todos os itens
  await db.orm.public.Servico.createAll([
    {
      empresaId: empresa.id,
      nome: 'Corte Tradicional',
      duracaoMinutos: 30,
      preco: '45.00',
    },
    {
      empresaId: empresa.id,
      nome: 'Barba Terapia com Toalha Quente',
      duracaoMinutos: 30,
      preco: '35.00',
    },
    {
      empresaId: empresa.id,
      nome: 'Combo: Cabelo + Barba',
      duracaoMinutos: 60,
      preco: '70.00',
    },
  ]).toArray();

  console.log(
    '✅ Banco populado com sucesso: Barbearia do Zé criada com 3 serviços!',
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
