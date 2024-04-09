import { eq } from 'drizzle-orm';
import { db } from '../db';
import { image } from '../schema';
import { ImageStorage } from '.';

export class LegacyStorage implements ImageStorage {
  async getImage(id: number) {
    const data = await db.query.image.findFirst({
      where: eq(image.id, id),
      columns: { legacy_id: true },
    });
    if (!data) return null;
    const res = await fetch(
      `https://dfoto.se/v1/image/${data.legacy_id}/fullSize`,
      {
        cache: 'no-store',
      },
    );
    return res.body;
  }
}
