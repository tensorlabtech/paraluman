type ArrowUpRightIconProps = {
  className?: string;
};

export function ArrowUpRightIcon({ className }: ArrowUpRightIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}
