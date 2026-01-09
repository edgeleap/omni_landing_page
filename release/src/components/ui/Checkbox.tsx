interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="checkbox-wrap" onClick={onChange}>
      <div className="checkbox" data-checked={checked ? 'true' : 'false'}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="checkbox-label">{label}</span>
    </label>
  )
}
