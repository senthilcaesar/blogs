import {
  Box,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Code2,
  Database,
  Globe,
  HeartPulse,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
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

// Colours come from the site's CSS variables so the sidebar follows the day/night toggle.
const muiTheme = createTheme({
  palette: { primary: { main: '#ff8a3d' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Plus Jakarta Sans', var(--font-body)" },
});

const accentTint = (percent) => `color-mix(in srgb, var(--accent) ${percent}%, transparent)`;
const accentText = 'color-mix(in srgb, var(--accent) 72%, var(--text))';

const MOBILE = '@media (max-width: 820px)';

const iconButtonSx = {
  width: 32,
  height: 32,
  borderRadius: '8px',
  color: 'var(--text-soft)',
  '&:hover': { bgcolor: 'color-mix(in srgb, var(--text) 5%, transparent)', color: 'var(--text)' },
  '&.Mui-focusVisible': { outline: '2px solid var(--accent)', outlineOffset: -2 },
};

function CountBadge({ count, selected }) {
  return (
    <Box
      component="span"
      sx={{
        minWidth: 22,
        height: 20,
        px: 0.625,
        display: 'inline-grid',
        placeItems: 'center',
        borderRadius: '6px',
        fontSize: '0.72rem',
        fontWeight: selected ? 700 : 500,
        fontVariantNumeric: 'tabular-nums',
        color: selected ? 'var(--text-soft)' : 'var(--text-muted)',
        bgcolor: 'var(--sidebar-badge-bg)',
      }}
    >
      {count}
    </Box>
  );
}

export function CategoryFilters({
  categories,
  activeCategory,
  onSelect,
  counts = {},
  collapsed: collapsedPreference = false,
  onToggleCollapsed,
}) {
  // Phones always get the full panel; minimising is a desktop affordance.
  const isMobile = useMediaQuery('(max-width: 820px)');
  const collapsed = collapsedPreference && !isMobile;

  const toggleLabel = collapsed ? 'Expand sidebar' : 'Minimise sidebar';

  return (
    <ThemeProvider theme={muiTheme}>
      <Stack component="nav" aria-label="Post categories" spacing={1}>
        {!isMobile && onToggleCollapsed && (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ justifyContent: collapsed ? 'center' : 'space-between', pl: collapsed ? 0 : 1.5 }}
          >
            {!collapsed && (
              <Typography
                component="span"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Categories
              </Typography>
            )}
            <Tooltip title={toggleLabel} placement={collapsed ? 'right' : 'bottom'}>
              <IconButton aria-label={toggleLabel} onClick={onToggleCollapsed} sx={iconButtonSx}>
                {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {/* Desktop: vertical list */}
        <List
          disablePadding
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, [MOBILE]: { display: 'none' } }}
        >
          {categories.map((category) => {
            const Icon = iconByCategory[category] ?? LayoutGrid;
            const selected = activeCategory === category;
            const item = (
              <ListItemButton
                key={category}
                selected={selected}
                aria-label={collapsed ? category : undefined}
                aria-pressed={selected}
                onClick={() => onSelect(category)}
                sx={{
                  px: collapsed ? 0 : 1.25,
                  py: 0.75,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: '10px',
                  border: '1px solid transparent',
                  color: 'var(--text-soft)',
                  transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
                  '&:hover': { bgcolor: 'color-mix(in srgb, var(--text) 4%, transparent)', color: 'var(--text)' },
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: accentTint(12),
                    borderColor: accentTint(35),
                    color: accentText,
                  },
                  '&.Mui-focusVisible': { outline: '2px solid var(--accent)', outlineOffset: -2 },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 1.25,
                    color: selected ? 'var(--accent)' : 'var(--text-soft)',
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </ListItemIcon>
                {!collapsed && (
                  <>
                    <ListItemText
                      primary={category}
                      slotProps={{
                        primary: { sx: { fontSize: '0.88rem', fontWeight: selected ? 600 : 500 } },
                      }}
                    />
                    {counts[category] != null && (
                      <CountBadge count={counts[category]} selected={selected} />
                    )}
                  </>
                )}
              </ListItemButton>
            );
            if (!collapsed) return item;
            const tip = counts[category] != null ? `${category} · ${counts[category]}` : category;
            return (
              <Tooltip key={category} title={tip} placement="right">
                {item}
              </Tooltip>
            );
          })}
        </List>

        {/* Mobile: one row of chips that scrolls sideways */}
        <Box
          sx={{
            display: 'none',
            gap: 1,
            overflowX: 'auto',
            pb: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            [MOBILE]: { display: 'flex' },
          }}
        >
          {categories.map((category) => {
            const Icon = iconByCategory[category] ?? LayoutGrid;
            const selected = activeCategory === category;
            return (
              <Chip
                key={category}
                icon={<Icon size={14} />}
                label={category}
                clickable
                onClick={() => onSelect(category)}
                variant={selected ? 'filled' : 'outlined'}
                sx={{
                  flexShrink: 0,
                  fontWeight: selected ? 600 : 500,
                  color: selected ? accentText : 'var(--text-soft)',
                  bgcolor: selected ? accentTint(12) : 'transparent',
                  borderColor: 'var(--border)',
                  '& .MuiChip-icon': { color: selected ? 'var(--accent)' : 'var(--text-muted)' },
                }}
              />
            );
          })}
        </Box>

      </Stack>
    </ThemeProvider>
  );
}
