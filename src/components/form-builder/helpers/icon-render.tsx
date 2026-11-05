import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import { icons, type LucideIcon } from 'lucide-react'
import { memo } from 'react'

export type IconProps = {
  name: keyof typeof icons | string
  className?: string
  strokeWidth?: number
}

// Saved forms and templates may store icon names that lucide-react has since
// renamed (e.g. "AlignLeft" -> "TextAlignStart"). The `icons` map only has the
// current names, so fall back to the module's deprecated alias exports.
export function getLucideIcon(name: string): LucideIcon | undefined {
  return (
    icons[name as keyof typeof icons] ??
    (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name]
  )
}

export const Icon = memo(({ name, className, strokeWidth }: IconProps) => {
  const IconComponent = getLucideIcon(name)

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={cn('w-4 h-4', className)} strokeWidth={strokeWidth || 2.5} />
})

Icon.displayName = 'Icon'
