// theme.js
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#106E11', // md_theme_light_primary color
    onMain: '#FFFFFF', // md_theme_light_onPrimary color
    container: '#9DF88B', // md_theme_light_primaryContainer color
    onContainer: '#002201', // md_theme_light_onPrimaryContainer color
  },
  secondary: {
    main: '#53634E', // md_theme_light_secondary color
    onMain: '#FFFFFF', // md_theme_light_onSecondary color
    container: '#D7E8CD', // md_theme_light_secondaryContainer color
    onContainer: '#121F0F', // md_theme_light_onSecondaryContainer color
  },
  tertiary: {
    main: '#9e4300', // md_theme_light_tertiary color
    onMain: '#ffffff', // md_theme_light_onTertiary color
    container: '#ffdbcb', // md_theme_light_tertiaryContainer color
    onContainer: '#341100', // md_theme_light_onTertiaryContainer color
  },
  error: {
    main: '#BA1A1A', // md_theme_light_error color
    onMain: '#FFFFFF', // md_theme_light_onError color
    container: '#FFDAD6', // md_theme_light_errorContainer color
    onContainer: '#410002', // md_theme_light_onErrorContainer color
  },
  background: {
    main: '#FCFDF6', // md_theme_light_background color
    onMain: '#1A1C18', // md_theme_light_onBackground color
  },
  surface: {
    main: '#FCFDF6', // md_theme_light_surface color
    onMain: '#1A1C18', // md_theme_light_onSurface color
    variant: '#DFE4D8', // md_theme_light_surfaceVariant color
    onVariant: '#43493F', // md_theme_light_onSurfaceVariant color
  },
  outline: {
    main: '#73796E', // md_theme_light_outline color
    variant: '#C2C8BC', // md_theme_light_outlineVariant color
  },
  inverse: {
    onSurface: '#F1F1EB', // md_theme_light_inverseOnSurface color
    surface: '#2F312D', // md_theme_light_inverseSurface color
    primary: '#81DB72', // md_theme_light_inversePrimary color
  },
  shadow: '#000000', // md_theme_light_shadow color
  surfaceTint: '#106E11', // md_theme_light_surfaceTint color
  scrim: '#000000', // md_theme_light_scrim color
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#81DB72', // md_theme_dark_primary color
    onMain: '#003A02', // md_theme_dark_onPrimary color
    container: '#005305', // md_theme_dark_primaryContainer color
    onContainer: '#9DF88B', // md_theme_dark_onPrimaryContainer color
  },
  secondary: {
    main: '#BBCBB2', // md_theme_dark_secondary color
    onMain: '#263422', // md_theme_dark_onSecondary color
    container: '#3C4B37', // md_theme_dark_secondaryContainer color
    onContainer: '#D7E8CD', // md_theme_dark_onSecondaryContainer color
  },
  tertiary: {
    main: '#ffb691', // md_theme_dark_tertiary color
    onMain: '#552100', // md_theme_dark_onTertiary color
    container: '#783100', // md_theme_dark_tertiaryContainer color
    onContainer: '#ffdbcb', // md_theme_dark_onTertiaryContainer color
  },
  error: {
    main: '#FFB4AB', // md_theme_dark_error color
    onMain: '#690005', // md_theme_dark_onError color
    container: '#93000A', // md_theme_dark_errorContainer color
    onContainer: '#FFDAD6', // md_theme_dark_onErrorContainer color
  },
  background: {
    main: '#1A1C18', // md_theme_dark_background color
    onMain: '#E2E3DD', // md_theme_dark_onBackground color
  },
  surface: {
    main: '#1A1C18', // md_theme_dark_surface color
    onMain: '#E2E3DD', // md_theme_dark_onSurface color
    variant: '#43493f', // md_theme_dark_surfaceVariant color
    onVariant: '#C2C8BC', // md_theme_dark_onSurfaceVariant color
  },
  outline: {
    main: '#8D9387', // md_theme_dark_outline color
    variant: '#43493F', // md_theme_dark_outlineVariant color
  },
  inverse: {
    onSurface: '#1A1C18', // md_theme_dark_inverseOnSurface color
    surface: '#E2E3DD', // md_theme_dark_inverseSurface color
    primary: '#106E11', // md_theme_dark_inversePrimary color
  },
  shadow: '#000000', // md_theme_dark_shadow color
  surfaceTint: '#81DB72', // md_theme_dark_surfaceTint color
  scrim: '#000000', // md_theme_dark_scrim color
};

const lightTheme = createTheme({
  palette: lightPalette,
});

const darkTheme = createTheme({
  palette: darkPalette,
});

export { lightTheme, darkTheme };