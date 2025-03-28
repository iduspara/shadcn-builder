import * as Icons from "lucide-react";

export const ComponentIcon = ({
  icon,
}: {
  icon: keyof typeof Icons | undefined;
}) => {
  if (!icon) return null;
  const Icon = Icons[icon] as React.ElementType;
  return <Icon />;
};
