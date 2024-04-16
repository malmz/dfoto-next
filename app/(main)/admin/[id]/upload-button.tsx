'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { upload } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useId, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

// Alright, this component is a bit cursed but im tired and it works

interface Props extends ButtonProps {
  albumId: number;
}
export function UploadButton({ children, albumId, ...props }: Props) {
  const id = useId();
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action={async (formData) => {
        try {
          await upload(formData);
          toast('Bilder uppladdade');
        } catch (error) {
          console.error(error);
          toast.error('De där va inge bra bild...');
        }
        inputRef.current!.files = null;
      }}
    >
      <Button asChild {...props} disabled={pending}>
        <label htmlFor={id}>
          {pending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>
          ) : null}
          {children}
        </label>
      </Button>
      <input
        ref={inputRef}
        onChange={(event) => {
          const files = event.target.files;
          if (!files) {
            return;
          }
          event.target.form?.requestSubmit();
        }}
        id={id}
        type='file'
        name='file'
        multiple
        accept='image/jpeg,image/png'
        hidden
      />
      <input type='text' name='album' defaultValue={albumId} hidden />
    </form>
  );
}
