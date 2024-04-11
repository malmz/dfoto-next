import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

export function Timestamp() {
  const date = new Date();
  return (
    <time
      className='text-sm text-muted-foreground'
      dateTime={date.toISOString()}
    >
      {format(new Date(), 'pp', { locale: sv })}
    </time>
  );
}
