import { Button, ButtonProps } from '@/components/ui/button';
import { useRef } from 'react';

type Props = ButtonProps;
export function UploadButtom({ children, ...props }: Props) {
  return (
    <>
      <Button asChild {...props}>
        <label htmlFor='file-upload'>{children}</label>
      </Button>
      <input
        id='file-upload'
        type='file'
        multiple
        accept='image/jpeg,image/png'
        hidden
      ></input>
    </>
  );
}
