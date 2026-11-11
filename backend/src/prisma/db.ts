import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import * as fs from 'fs';
import * as path from 'path';

function loadContractJson() {
  const localPath = path.join(__dirname, 'contract.json');
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, 'utf8'));
  }
  const rootSrcPath = path.join(process.cwd(), 'src', 'prisma', 'contract.json');
  if (fs.existsSync(rootSrcPath)) {
    return JSON.parse(fs.readFileSync(rootSrcPath, 'utf8'));
  }
  throw new Error('contract.json nao encontrado!');
}

export const contract = contractFromJson<Contract>(loadContractJson());

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});
