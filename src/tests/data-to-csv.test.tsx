import { describe, expect, it, vi } from 'vitest';
import { dataToCsv } from '../utility/data-to-csv';
import { MockArray } from './__tests__/products-mock';
import { setBlobUrl } from '../utility/set-blob-url';

describe('Test data to csv', () => {
  const result = `id,title,brand,price,category,stock\n1,Some Title,hueta,69,shit,1\n2,Some Title2,chepuha,96,sameshit,3`;
  it('Should Return String in CSV format', () => {
    const regex = /id|title|brand|price|category|stock/g;

    expect(dataToCsv(MockArray, regex)).toBe(result);
  });

  it('Should return blob url', () => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'testURL123'),
    });

    expect(setBlobUrl(result)).toBe('testURL123');
  });
});
