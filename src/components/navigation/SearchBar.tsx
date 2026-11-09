
import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  autoFocus?: boolean;
  className?: string;
  onSearch?: () => void;
  placeholder?: string;
};

export default function SearchBar({
  autoFocus = false,
  className = '',
  onSearch,
  placeholder = 'Search product name or catalogue number...',
}: SearchBarProps) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');

  const navigate = useNavigate();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    setQuery(params.get('q') ?? '');
  }, [params]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const term = query.trim();
    if (!term) return;

    navigate(`/search?q=${encodeURIComponent(term)}`);
    onSearch?.();
  }

  function clearSearch() {
    setQuery('');
    inputRef.current?.focus();
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex h-11 w-full min-w-0 items-center overflow-hidden rounded-full border border-[#E1E8EB] bg-white shadow-[0_6px_22px_rgba(15,45,49,0.07)] transition-colors focus-within:border-[#D84312] ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Search hospital equipment
      </label>

      <Search
        size={18}
        aria-hidden="true"
        className="ml-4 shrink-0 text-[#043C50]"
      />

      <input
        id={id}
        ref={inputRef}
        name="q"
        type="text"
        inputMode="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        maxLength={160}
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#043C50] outline-none placeholder:text-[#849a9a]"
      />

      {query.length > 0 && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          title="Clear search"
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent transition-colors hover:bg-[#FFF0E8]"
          style={{
            color: '#D84312',
          }}
        >
          <X size={17} strokeWidth={2.2} />
        </button>
      )}

      
<button
  type="submit"
  disabled={!hasQuery}
  className="
    mx-1 inline-flex h-9 shrink-0
    items-center justify-center
    rounded-full border-0 px-5
    text-xs font-bold text-white
    cursor-pointer
    !bg-[#D84312]
    hover:!bg-[#043C50]
    focus-visible:!bg-[#043C50]
    transition-colors duration-300 ease-in-out
    disabled:cursor-not-allowed
  "
  style={{
    color: '#FFFFFF',
    opacity: 1,
    boxShadow: 'none',
  }}
>
  Search
</button>

    </form>
  );
}
