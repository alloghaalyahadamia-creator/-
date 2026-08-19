/**
 * PNG Metadata Engine for Yah'adamiya Cipher
 * Embeds and Extracts lossless metadata (tEXt chunks) in PNG files for seamless Scan & Decode.
 */

// CRC32 Lookup Table
const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function calculateCRC32(buf: Uint8Array, offset: number, length: number): number {
  let crc = 0xffffffff;
  for (let i = 0; i < length; i++) {
    crc = CRC_TABLE[(crc ^ buf[offset + i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Creates a PNG tEXt chunk with key and value
 */
function createTextChunk(keyword: string, text: string): Uint8Array {
  const encoder = new TextEncoder();
  const keywordBytes = encoder.encode(keyword);
  const textBytes = encoder.encode(text);

  const chunkDataLength = keywordBytes.length + 1 + textBytes.length;
  // 4 bytes length + 4 bytes type ('tEXt') + chunkDataLength + 4 bytes CRC
  const chunkBuffer = new Uint8Array(12 + chunkDataLength);
  const view = new DataView(chunkBuffer.buffer);

  // 1. Length (4 bytes big-endian)
  view.setUint32(0, chunkDataLength, false);

  // 2. Chunk Type 'tEXt' (ASCII: 116, 69, 88, 116)
  chunkBuffer[4] = 0x74; // 't'
  chunkBuffer[5] = 0x45; // 'E'
  chunkBuffer[6] = 0x58; // 'X'
  chunkBuffer[7] = 0x74; // 't'

  // 3. Keyword + Null byte
  chunkBuffer.set(keywordBytes, 8);
  chunkBuffer[8 + keywordBytes.length] = 0x00;

  // 4. Text data
  chunkBuffer.set(textBytes, 9 + keywordBytes.length);

  // 5. CRC32 (computed over Type + Data, starting at index 4 for length: 4 + chunkDataLength)
  const crc = calculateCRC32(chunkBuffer, 4, 4 + chunkDataLength);
  view.setUint32(8 + chunkDataLength, crc, false);

  return chunkBuffer;
}

/**
 * Converts DataURL to Uint8Array
 */
function dataURLToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Converts Uint8Array to DataURL (image/png)
 */
function uint8ArrayToDataURL(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  const chunkSize = 0x8000; // 32KB chunking to avoid stack overflow
  for (let i = 0; i < len; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, Math.min(i + chunkSize, len)) as unknown as number[]
    );
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

/**
 * Embeds Yah'adamiya metadata into PNG dataUrl or bytes.
 * Places tEXt chunk immediately after IHDR chunk for maximum compatibility.
 */
export function embedPngMetadata(
  pngDataUrl: string,
  arabicText: string,
  extraMeta: Record<string, string> = {}
): string {
  try {
    const pngBytes = dataURLToUint8Array(pngDataUrl);

    // Verify PNG Signature: 89 50 4E 47 0D 0A 1A 0A
    if (
      pngBytes[0] !== 0x89 ||
      pngBytes[1] !== 0x50 ||
      pngBytes[2] !== 0x4e ||
      pngBytes[3] !== 0x47
    ) {
      return pngDataUrl; // Not a PNG, return untouched
    }

    const payload = JSON.stringify({
      app: 'yahadamiya-cipher',
      version: '2.0',
      text: arabicText,
      timestamp: Date.now(),
      ...extraMeta,
    });

    // Create chunks
    const chunk1 = createTextChunk('YahadamiyaPayload', payload);
    const chunk2 = createTextChunk('Description', arabicText);
    const chunk3 = createTextChunk('Comment', encodeURIComponent(arabicText));

    const totalChunkBytes = chunk1.length + chunk2.length + chunk3.length;

    // Find position right after IHDR chunk
    // PNG Header = 8 bytes.
    // IHDR length = 4 bytes (always 13) + 4 bytes ('IHDR') + 13 bytes data + 4 bytes CRC = 25 bytes.
    // So insertion offset is 8 + 25 = 33.
    const insertionOffset = 33;

    const newBytes = new Uint8Array(pngBytes.length + totalChunkBytes);
    // 1. Copy header + IHDR
    newBytes.set(pngBytes.subarray(0, insertionOffset), 0);

    // 2. Insert tEXt chunks
    let currentOffset = insertionOffset;
    newBytes.set(chunk1, currentOffset);
    currentOffset += chunk1.length;
    newBytes.set(chunk2, currentOffset);
    currentOffset += chunk2.length;
    newBytes.set(chunk3, currentOffset);
    currentOffset += chunk3.length;

    // 3. Copy remainder of PNG (IDAT, IEND, etc.)
    newBytes.set(pngBytes.subarray(insertionOffset), currentOffset);

    return uint8ArrayToDataURL(newBytes);
  } catch (err) {
    console.error('Error embedding PNG metadata:', err);
    return pngDataUrl;
  }
}

/**
 * Extracts and decodes Yah'adamiya metadata from a PNG ArrayBuffer / File / Blob / DataURL
 */
export async function extractPngMetadata(
  source: ArrayBuffer | Blob | File | string
): Promise<{ text: string; details?: any } | null> {
  try {
    let buffer: ArrayBuffer;
    if (typeof source === 'string') {
      const bytes = dataURLToUint8Array(source);
      buffer = bytes.buffer;
    } else if (source instanceof Blob || source instanceof File) {
      buffer = await source.arrayBuffer();
    } else {
      buffer = source;
    }

    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);

    // Check PNG signature
    if (
      bytes[0] !== 0x89 ||
      bytes[1] !== 0x50 ||
      bytes[2] !== 0x4e ||
      bytes[3] !== 0x47
    ) {
      return null;
    }

    const decoder = new TextDecoder('utf-8');
    let offset = 8; // skip 8-byte PNG signature
    const metadataFound: Record<string, string> = {};

    while (offset < bytes.length - 8) {
      const chunkLength = view.getUint32(offset, false);
      const chunkType = String.fromCharCode(
        bytes[offset + 4],
        bytes[offset + 5],
        bytes[offset + 6],
        bytes[offset + 7]
      );

      const chunkDataStart = offset + 8;
      const chunkDataEnd = chunkDataStart + chunkLength;

      if (chunkType === 'tEXt' || chunkType === 'iTXt' || chunkType === 'zTXt') {
        const chunkData = bytes.subarray(chunkDataStart, chunkDataEnd);

        // Find null byte separating keyword from text
        let nullPos = -1;
        for (let i = 0; i < chunkData.length; i++) {
          if (chunkData[i] === 0x00) {
            nullPos = i;
            break;
          }
        }

        if (nullPos !== -1) {
          const keyword = decoder.decode(chunkData.subarray(0, nullPos)).trim();
          const valueBytes = chunkData.subarray(nullPos + 1);
          const rawValue = decoder.decode(valueBytes).trim();
          metadataFound[keyword] = rawValue;
        }
      }

      if (chunkType === 'IEND') {
        break;
      }

      // Next chunk: length (4) + type (4) + data (chunkLength) + CRC (4) = chunkLength + 12
      offset += chunkLength + 12;
    }

    // 1. Check YahadamiyaPayload JSON
    if (metadataFound['YahadamiyaPayload']) {
      try {
        const parsed = JSON.parse(metadataFound['YahadamiyaPayload']);
        if (parsed && typeof parsed.text === 'string' && parsed.text.trim()) {
          return { text: parsed.text.trim(), details: parsed };
        }
      } catch {
        // Continue fallback
      }
    }

    // 2. Check Description
    if (metadataFound['Description']) {
      return { text: metadataFound['Description'].trim() };
    }

    // 3. Check Comment (may be URI-encoded)
    if (metadataFound['Comment']) {
      try {
        const decoded = decodeURIComponent(metadataFound['Comment']);
        if (decoded) return { text: decoded.trim() };
      } catch {
        return { text: metadataFound['Comment'].trim() };
      }
    }

    // 4. Check any keyword in metadataFound
    for (const key of Object.keys(metadataFound)) {
      const val = metadataFound[key];
      if (val && val.length > 0) {
        try {
          const parsed = JSON.parse(val);
          if (parsed && parsed.text) return { text: parsed.text };
        } catch {
          // not json
        }
      }
    }

    return null;
  } catch (err) {
    console.error('Error parsing PNG metadata:', err);
    return null;
  }
}
