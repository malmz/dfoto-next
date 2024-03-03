'use server';

import { createWriteStream } from 'fs';
import { Writable } from 'stream';

function createWriteWebStream(...args: Parameters<typeof createWriteStream>) {
  return Writable.toWeb(createWriteStream(...args));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function upload(formData: FormData) {
  'use server';

  await sleep(2000);

  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file');
  }
  const dest = createWriteWebStream('./uploads/' + file.name);

  await file.stream().pipeTo(dest);
}
