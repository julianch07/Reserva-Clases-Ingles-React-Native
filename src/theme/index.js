import { Platform } from 'react-native';

// Constantes globales de la paleta de colores
export const colors = {
  fondo: '#F9FAFB',
  primario: '#4F46E5',
  texto: '#111827',
  border: '#E5E7EB',
};

// Constantes de espaciados basados en múltiplos de 4
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// Constantes de tipografía del sistema de diseño
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
};

// Exportación por defecto que agrupa todas las constantes
export default {
  colors,
  spacing,
  typography,
};
