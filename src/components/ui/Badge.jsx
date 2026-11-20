export default function Badge({ children }) {
  return (
    <span className="text-xs font-semibold tracking-wide text-muted dark:text-zinc-400">
      {children}
    </span>
  )
}
