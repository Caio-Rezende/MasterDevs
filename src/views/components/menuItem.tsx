import { useLocation } from "../hooks";

type MenuItemProps = {
  anchor: string;
  onClick: () => void;
  display: boolean;
};

export function MenuItem({ anchor, onClick, display }: MenuItemProps) {
  const locationHash = useLocation();
  const fullHash = `#${anchor}`;

  const isSelected = fullHash === locationHash;

  if (!display && !isSelected) {
    return null;
  }

  return (
    <a
      href={fullHash}
      onClick={onClick}
      className={`p-3 border-b xl:border-b-0 xl:border-l border-solid hover:border-dashed border-yellow-400 text-center min-w-fit ${
        isSelected && "border-r xl:border-r-0 xl:border-t"
      }`}
    >
      {anchor}
    </a>
  );
}
