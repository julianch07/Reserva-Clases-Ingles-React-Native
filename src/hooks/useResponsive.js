import { useWindowDimensions } from 'react-native';

/**
 * Custom Hook para detectar dimensiones de pantalla y adaptar el maquetado
 * diferenciando entre celulares y tablets.
 */
export default function useResponsive() {
  // Obtiene ancho y alto en tiempo real desde la API nativa de React Native
  const { width, height } = useWindowDimensions();

  // Condicionales para determinar si el dispositivo es una tablet o está en horizontal
  const isTablet = width >= 700;
  const isHorizontal = width > height;

  // Asignación dinámica de columnas y espaciados según el tipo de pantalla
  const columnas = isTablet ? 2 : 1;
  const anchoCard = isTablet ? Math.min(width * 0.72, 320) : 320;
  const paddingHorizontal = isTablet ? 32 : 16;

  return {
    width,
    height,
    isTablet,
    isHorizontal,
    columnas,
    anchoCard,
    paddingHorizontal,
  };
}