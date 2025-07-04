import Image from "next/image";

import { Button } from "./ui/button";

interface Props {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
export default function SubmitButton({
  isLoading,
  className,
  children,
}: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
