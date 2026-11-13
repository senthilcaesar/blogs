import { IconButton, InputAdornment, OutlinedInput, ThemeProvider, createTheme } from '@mui/material';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Colours come from the site's CSS variables so the field follows the day/night toggle.
const muiTheme = createTheme({
  palette: { primary: { main: '#ff8a3d' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'var(--font-body)' },
});

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
          height: 44,
          pl: 0.5,
          fontSize: '0.95rem',
          color: 'var(--text)',
          bgcolor: 'transparent',
          // The surrounding .header-search bar draws the border, shadow and focus ring.
          '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
          '& input::placeholder': { color: 'var(--text-muted)', opacity: 1 },
          '& input::-webkit-search-cancel-button': { display: 'none' },
          '& .MuiIconButton-root': { color: 'var(--text-soft)' },
        }}
      />
    </ThemeProvider>
  );
}
