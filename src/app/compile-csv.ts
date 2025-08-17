import { NextResponse } from 'next/server';
import type { ProductDetails } from '../components/details/details';
import { dataToCsv } from '../utility/data-to-csv';
import { setBlobUrl } from '../utility/set-blob-url';

export async function compileCSV(
  data: ProductDetails[],
  regex: RegExp,
): Promise<NextResponse<string>> {
  const csv = dataToCsv(data, regex);
  const url = setBlobUrl(csv);

  return new NextResponse(url, {
    status: 200,
  });
}
