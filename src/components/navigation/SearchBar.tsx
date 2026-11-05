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

  useEffect(() => {
    setQuery(params.get('q') ?? '');
  }, [params]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onSearch?.();
  }

  return (
    <form role="search" onSubmit={submit} className={`flex h-11 w-full min-w-0 items-center overflow-hidden rounded-full border border-[#cfe1de] bg-white shadow-[0_6px_22px_rgba(15,45,49,0.07)] transition-colors focus-within:border-[#FF4F18] ${className}`}>
      <label htmlFor={id} className="sr-only">Search hospital equipment</label>
      <Search size={18} aria-hidden="true" className="ml-4 shrink-0 text-[#66817d]" />
      <input
        id={id}
        ref={inputRef}
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        maxLength={160}
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#142b33] outline-none placeholder:text-[#849a9a]"
      />
      {query && (
        <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#78908d] transition hover:bg-[#e8f5f1]" aria-label="Clear search">
          <X size={16}/>
        </button>
      )}
      <button type="submit" disabled={!query.trim()} className="mx-1 inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#07546B] px-4 text-xs font-bold text-white transition hover:bg-[#053F52] disabled:cursor-not-allowed disabled:opacity-50">
        Search
      </button>
    </form>
  );
}
