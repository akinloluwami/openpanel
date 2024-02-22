import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('text-xl font-medium flex gap-2 items-center', className)}
    >
      <Image
        src="/logo.svg"
        className="max-h-8 rounded-md"
        alt="Openpanel logo"
        width={32}
        height={32}
      />
      openpanel.dev
    </Link>
  );
}
