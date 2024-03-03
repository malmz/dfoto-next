'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { upload } from '@/lib/data/upload';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' aria-disabled={pending}>
      {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>}
      {children}
    </Button>
  );
}

export function UploadForm() {
  return (
    <form action={upload}>
      <Input
        type='file'
        name='file'
        accept='image/png'
        multiple
        required
      ></Input>
      <SubmitButton>Upload</SubmitButton>
    </form>
  );
}
