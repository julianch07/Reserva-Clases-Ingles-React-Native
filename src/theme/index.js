export const colors = {
  fondo: '#F9FAFB',
  superficie: '#FFFFFF',

  primario: '#4F46E5',
  primarioSuave: '#EEF2FF',

  texto: '#111827',
  textoSuave: '#6B7280',
  textoSecundario: '#6B7280',

  borde: '#E5E7EB',

  exito: '#16A34A',
  error: '#EF4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const typography = {
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.texto,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.texto,
  },
  cuerpo: {
    fontSize: 14,
    color: colors.texto,
  },
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  pill: 50,
};

export default {
  colors,
  spacing,
  typography,
  radius,
};