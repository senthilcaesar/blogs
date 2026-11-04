import { IconButton, InputAdornment, OutlinedInput, ThemeProvider, createTheme } from '@mui/material';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Colours come from the site's CSS variables so the field follows the day/night toggle.
const muiTheme = createTheme({
  palette: { primary: { main: '#ff8a3d' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'var(--font-body)' },
});

const accentTint = (percent) => `color-mix(in srgb, var(--accent) ${percent}%, transparent)`;

export function HeaderSearch({ value, onChange, onClear }) {
  const inputRef = useRef(null);

  // ⌘K / Ctrl+K jumps to the search box from anywhere on the page.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        window.scrollTo?.({ top: 0, behavior: 'smooth' });
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <OutlinedInput
        fullWidth
        size="small"
        type="search"
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        placeholder="Search posts by title, tag or topic"
        inputProps={{ 'aria-label': 'Search posts' }}
        startAdornment={
          <InputAdornment position="start">
            <Search size={17} color="var(--text-muted)" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {value ? (
              <IconButton size="small" aria-label="Clear search" onClick={onClear} edge="end">
                <X size={15} />
              </IconButton>
            ) : (
              <kbd className="header-search__kbd" aria-hidden="true">
                ⌘K
              </kbd>
            )}
          </InputAdornment>
        }
        sx={{
          height: 42,
          fontSize: '0.95rem',
          color: 'var(--text)',
          bgcolor: 'var(--surface-strong)',
          borderRadius: '12px',
          transition: 'box-shadow 180ms ease',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-strong)' },
          '&.Mui-focused': { boxShadow: `0 0 0 4px ${accentTint(14)}` },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent)',
            borderWidth: 1,
          },
          '& input::placeholder': { color: 'var(--text-muted)', opacity: 1 },
          '& input::-webkit-search-cancel-button': { display: 'none' },
          '& .MuiIconButton-root': { color: 'var(--text-soft)' },
        }}
      />
    </ThemeProvider>
  );
}
