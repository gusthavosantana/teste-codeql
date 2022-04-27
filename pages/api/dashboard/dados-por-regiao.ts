// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

export type FilterResponse = {
  data: any;
  casos: any;
  testagem: any;
  obito: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilterResponse>
) {
  let params = req.query || {};

  const { data: vacinas } = await api.get('/vacinas/dados-por-regiao', { params });
  const { data: casos } = await api.get('/casos-covid/dados-por-regiao', { params });
  const { data: testagem } = await api.get('/testagem/dados-por-regiao', { params });
  const { data: obito } = await api.get('/obito/dados-por-regiao', { params });

  //TODO padronizar o formato do retorno dos dados
  res.status(200).json({
    data: vacinas,
    casos,
    testagem,
    obito,
  });
}
