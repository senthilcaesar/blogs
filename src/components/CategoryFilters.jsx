import {
  Box,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Database,
  Globe,
  HeartPulse,
  LayoutGrid,
  Ship,
  Users,
} from 'lucide-react';

const iconByCategory = {
  All: LayoutGrid,
  AI: Brain,
  Career: BriefcaseBusiness,
  Health: HeartPulse,
  Code: Code2,
  Statistics: BarChart3,
  Data: Database,
  Leadership: Users,
  'Web Dev': Globe,
  Export: Ship,
};

// Colours come from the site's CSS variables so the dropdown follows the day/night toggle.
const muiTheme = createTheme({
  palette: { primary: { main: '#ff8a3d' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'var(--font-body)' },
});

const accentTint = (percent) => `color-mix(in srgb, var(--accent) ${percent}%, transparent)`;
const accentText = 'color-mix(in srgb, var(--accent) 72%, var(--text))';

function IconBadge({ icon: Icon, active = false, size = 22 }) {
  return (
    <Box
      component="span"
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'inline-grid',
        placeItems: 'center',
        borderRadius: '7px',
        color: active ? 'var(--accent)' : 'var(--text-soft)',
        bgcolor: active ? accentTint(14) : 'color-mix(in srgb, var(--text) 6%, transparent)',
        transition: 'background-color 160ms ease, color 160ms ease',
      }}
    >
      <Icon size={13} strokeWidth={2} />
    </Box>
  );
}

function SelectChevron(props) {
  return <ChevronDown size={16} strokeWidth={2} {...props} />;
}

export function CategoryFilters({ categories, activeCategory, onSelect, counts = {} }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Select
        size="small"
        value={activeCategory}
        onChange={(event) => onSelect(event.target.value)}
        IconComponent={SelectChevron}
        inputProps={{ 'aria-label': 'Filter by category' }}
        renderValue={(value) => (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <IconBadge icon={iconByCategory[value] ?? LayoutGrid} active />
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {value === 'All' ? 'All categories' : value}
            </Box>
          </Box>
        )}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'right' },
          slotProps: {
            paper: {
              sx: {
                mt: 1.25,
                minWidth: 240,
                borderRadius: '16px',
                bgcolor: 'color-mix(in srgb, var(--surface-strong) 92%, transparent)',
                backdropFilter: 'blur(16px) saturate(1.4)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                boxShadow:
                  '0 1px 2px rgba(15, 15, 15, 0.06), 0 24px 48px -16px rgba(15, 15, 15, 0.28)',
              },
            },
            list: { sx: { p: 0.75 } },
          },
        }}
        sx={{
          height: 38,
          minWidth: 176,
          fontSize: '0.92rem',
          fontWeight: 550,
          color: 'var(--text)',
          bgcolor: 'transparent',
          borderRadius: '10px',
          // The surrounding .header-search bar draws the border, shadow and focus ring.
          '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
          '& .MuiSelect-select': { display: 'flex', alignItems: 'center', pl: 1, pr: '34px !important' },
          '& .MuiSelect-icon': {
            right: 10,
            top: 'calc(50% - 8px)',
            color: 'var(--text-muted)',
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          },
        }}
      >
        <ListSubheader
          sx={{
            px: 1.25,
            lineHeight: '30px',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            bgcolor: 'transparent',
          }}
        >
          Browse by category
        </ListSubheader>
        {categories.map((category) => {
          const selected = activeCategory === category;
          return (
            <MenuItem
              key={category}
              value={category}
              sx={{
                gap: 1.25,
                px: 1.25,
                py: 0.875,
                borderRadius: '10px',
                fontSize: '0.9rem',
                transition: 'background-color 120ms ease',
                '&:hover': { bgcolor: 'color-mix(in srgb, var(--text) 5%, transparent)' },
                '&.Mui-selected, &.Mui-selected:hover': { bgcolor: accentTint(10), color: accentText },
                '&.Mui-focusVisible': { bgcolor: 'color-mix(in srgb, var(--text) 7%, transparent)' },
              }}
            >
              <ListItemText
                primary={category === 'All' ? 'All categories' : category}
                slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: selected ? 600 : 500 } } }}
              />
              {counts[category] != null && (
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: selected ? 600 : 500,
                    fontVariantNumeric: 'tabular-nums',
                    color: selected ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  {counts[category]}
                </Box>
              )}
            </MenuItem>
          );
        })}
      </Select>
    </ThemeProvider>
  );
}
