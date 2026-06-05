import { Button } from "./Button";

type ApplyToSpeakButtonProps = {
  variant?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

export function ApplyToSpeakButton({
  variant = "light",
  className,
  onClick,
}: ApplyToSpeakButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} className={className}>
      Apply to speak
    </Button>
  );
}
