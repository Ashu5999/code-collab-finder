
import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@/lib/utils"

export type MultiSelectProps = {
  value?: string[]
  onValueChange?: (value: string[]) => void
  options?: { label: string; value: string }[]
  placeholder?: string
  children?: React.ReactNode
}

export const MultiSelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
MultiSelectTrigger.displayName = "MultiSelectTrigger"

export const MultiSelectValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { placeholder?: string }
>(({ className, placeholder, ...props }, ref) => {
  const { value, onValueChange } = useMultiSelect()
  return (
    <div
      ref={ref}
      className={cn("flex gap-1 flex-wrap", className)}
      {...props}
    >
      {value.length === 0 && placeholder ? (
        <span className="text-muted-foreground">{placeholder}</span>
      ) : null}
      {value.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="rounded-sm text-xs"
        >
          {item}
          <button
            className="ml-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                e.stopPropagation()
                onValueChange(value.filter((v) => v !== item))
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onClick={() => onValueChange(value.filter((v) => v !== item))}
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
          </button>
        </Badge>
      ))}
    </div>
  )
})
MultiSelectValue.displayName = "MultiSelectValue"

export const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
  const { value, onValueChange } = useMultiSelect()

  return (
    <Command
      ref={ref}
      className={cn("w-full overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className)}
      {...props}
    />
  )
})
MultiSelectContent.displayName = "MultiSelectContent"

const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    value: string
    onSelect?: (value: string) => void
  }
>(({ className, onSelect, value: itemValue, ...props }, ref) => {
  const { value, onValueChange } = useMultiSelect()
  const isSelected = value.includes(itemValue)

  return (
    <CommandItem
      ref={ref}
      onSelect={() => {
        if (isSelected) {
          onValueChange(value.filter((value) => value !== itemValue))
        } else {
          onValueChange([...value, itemValue])
        }
      }}
      className={cn(
        "cursor-pointer",
        isSelected ? "bg-primary text-primary-foreground" : "",
        className
      )}
      {...props}
    />
  )
})
MultiSelectItem.displayName = "MultiSelectItem"

interface MultiSelectContextValue {
  value: string[]
  onValueChange: (value: string[]) => void
}

const MultiSelectContext = React.createContext<MultiSelectContextValue>({
  value: [],
  onValueChange: () => {},
})

export function useMultiSelect() {
  const context = React.useContext(MultiSelectContext)
  if (!context) {
    throw new Error("useMultiSelect must be used within a MultiSelect")
  }
  return context
}

const MultiSelect = ({ 
  value = [], 
  onValueChange = () => {}, 
  children 
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <MultiSelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setOpen(false)
            }
          }}
        >
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="Select..." />
          </MultiSelectTrigger>
        </div>
        {open && (
          <div className="absolute z-50 w-full mt-1">
            {children}
          </div>
        )}
      </div>
    </MultiSelectContext.Provider>
  )
}

export { MultiSelect, MultiSelectItem }
