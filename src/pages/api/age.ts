// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { calcAge } from "../../utils/calc";
type Data = {
  message?: string;
  age?: number;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    return res.status(404).json({
      error: "Essa rota não aceita esse método de requisição",
    });
  }
  const { date } = req.body;
  if (!date || Array.isArray(date)) {
    return res.status(400).send({
      error: "Ausência da query: date",
      message: "ex: date:12/02/2012",
    });
  }
  const age = calcAge(date.split("/").reverse().join("/"));
  if (Number.isNaN(age)) {
    return res.status(400).json({
      error: "Tem certeza que informou um tipo válido de data?",
      message: "ex: 12/02/2012",
    });
  }
  return res.status(200).json({ age });
}
