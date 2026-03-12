import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  success,
  helperText,
  icon,
  fullWidth = true,
  className,
  type = 'text',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            'w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg',
            'text-white placeholder:text-gray-500',
            'focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {error && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}

        {success && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle2 size={18} />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {success && !error && helperText && (
        <p className="text-xs text-green-400">{helperText}</p>
      )}

      {!error && !success && helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  rows?: number;
}

export function Textarea({
  label,
  error,
  success,
  helperText,
  fullWidth = true,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={cn(
          'w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg',
          'text-white placeholder:text-gray-500',
          'focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-y transition-all duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {success && !error && helperText && (
        <p className="text-xs text-green-400">{helperText}</p>
      )}

      {!error && !success && helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
