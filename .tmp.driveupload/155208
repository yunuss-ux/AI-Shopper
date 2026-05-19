// lib/embeddings.ts
import { pipeline } from '@xenova/transformers';

/**
 * Bu dosya yerel olarak (kendi bilgisayarında) metinleri 
 * 384 boyutlu vektörlere çevirir.
 */

let embedder: any = null;

async function getEmbedder() {
  if (!embedder) {
    try {
      // Model ilk seferde indirilir (~90MB)
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        quantized: true,
      });
    } catch (err) {
      console.error("Model yükleme hatası:", err);
      throw new Error("Yapay zeka modeli yüklenemedi.");
    }
  }
  return embedder;
}

// Tekli metin çevirme (recommend için)
export async function embedText(text: string): Promise<number[]> {
  const instance = await getEmbedder();
  const output = await instance(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data) as number[];
}

// Toplu metin çevirme (embed için)
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const instance = await getEmbedder();
  const results: number[][] = [];

  for (const text of texts) {
    const output = await instance(text, { pooling: 'mean', normalize: true });
    results.push(Array.from(output.data) as number[]);
  }

  return results;
}