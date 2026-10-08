import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import EstadoVacio from '../components/EstadoVacio';
import useResponsive from '../hooks/useResponsive';
import { useReservas } from '../contexts/ReservasContext';
import { clases, niveles } from '../data/clases';
import { colors, spacing, typography, radius } from '../theme';

export default function ClassesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { obtenerCupos } = useReservas();

  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const { isTablet, columnas, anchoCard, paddingHorizontal } =
    useResponsive();

  const clasesActualizadas = useMemo(
    () =>
      clases.map((clase) => ({
        ...clase,
        cupos: obtenerCupos(clase.id),
      })),
    [obtenerCupos]
  );

  const clasesFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return clasesActualizadas.filter((clase) => {
      const coincideNivel =
        filtroNivel === 'Todos' || clase.nivel === filtroNivel;

      const coincideBusqueda =
        termino === '' ||
        clase.titulo.toLowerCase().includes(termino) ||
        clase.descripcion.toLowerCase().includes(termino) ||
        clase.profesor.nombre.toLowerCase().includes(termino);

      return coincideNivel && coincideBusqueda;
    });
  }, [clasesActualizadas, filtroNivel, busqueda]);

  const limpiarBusqueda = () => {
    setBusqueda('');
  };

  const renderClase = ({ item }) => (
    <View
      style={[
        styles.item,
        {
          width: isTablet ? anchoCard : '100%',
        },
      ]}
    >
      <Card
        clase={item}
        onPress={() =>
          navigation.navigate('DetalleClase', { clase: item })
        }
      />
    </View>
  );

  return (
    <View
      style={[
        styles.pantalla,
        {
          paddingTop: insets.top + spacing.md,
        },
      ]}
    >
      <View
        style={[
          styles.encabezado,
          {
            paddingHorizontal,
          },
        ]}
      >
        <Text style={styles.saludo}>Aprende inglés a tu ritmo</Text>

        <Text style={typography.titulo}>Clases de inglés</Text>

        <View style={styles.buscador}>
          <Ionicons
            name="search-outline"
            size={19}
            color={colors.textoSuave}
          />

          <TextInput
            style={styles.input}
            placeholder="Buscar por clase o profesor"
            placeholderTextColor={colors.textoSuave}
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {busqueda.length > 0 && (
            <Pressable
              style={styles.botonLimpiar}
              onPress={limpiarBusqueda}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Borrar búsqueda"
            >
              <Ionicons
                name="close"
                size={17}
                color={colors.textoSuave}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View>
        <NivelFiltro
          niveles={niveles}
          nivelSeleccionado={filtroNivel}
          onSeleccionarNivel={setFiltroNivel}
        />
      </View>

      <Text
        style={[
          styles.contador,
          {
            paddingHorizontal,
          },
        ]}
      >
        {clasesFiltradas.length}{' '}
        {clasesFiltradas.length === 1
          ? 'clase disponible'
          : 'clases disponibles'}
      </Text>

      <FlatList
        data={clasesFiltradas}
        key={columnas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderClase}
        numColumns={columnas}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.lista,
          {
            paddingHorizontal,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
        columnWrapperStyle={
          columnas > 1 ? styles.filaColumnas : undefined
        }
        ListEmptyComponent={
          <EstadoVacio
            mensaje="No se encontraron clases"
            submensaje="Intenta con otro nivel o término de búsqueda"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  encabezado: {
    gap: spacing.xs,
  },
  saludo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primario,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 50,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.texto,
    paddingVertical: 0,
  },
  botonLimpiar: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fondo,
  },
  contador: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textoSuave,
    marginBottom: spacing.sm,
  },
  lista: {
    paddingTop: spacing.xs,
  },
  filaColumnas: {
    justifyContent: 'space-between',
  },
  item: {
    marginBottom: spacing.lg,
  },
});