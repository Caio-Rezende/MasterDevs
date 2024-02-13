type MenuItemProps = {
  anchor: string;
};

export function MenuItem({ anchor }: MenuItemProps) {
  return (
    <a
      href={`#${anchor}`}
      className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black min-w-fit"
    >
      {anchor}
    </a>
  );
}
