import { forwardRef, type FormEventHandler, type InputHTMLAttributes } from 'react'
import styles from './Field.module.scss'

type FieldProps = {
  className?: string
  id: string
  label: string
  value: string
  error?: string
  onInput?: FormEventHandler<HTMLInputElement>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onInput'>

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className = '', id, label, type = 'text', value, error, onInput, ...rest }, ref) => {
    return (
      <div className={`${styles.field} ${className}`}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={`${styles.input} ${error ? styles.isInvalid : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onInput={onInput}
          ref={ref}
          {...rest}
        />
        {error && (
          <span className={styles.error} title={error}>
            {error}
          </span>
        )}
      </div>
    )
  },
)

Field.displayName = 'Field'

export default Field
