import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ReservaItem from '../components/ReservaItem';
import EstadoVacio from '../components/EstadoVacio';
import { useReservas } from '../contexts/ReservasContext';
import { colors, spacing, typography } from '../theme';

export default function MisReservasScreen() {
  const { reservas, cancelarReserva } = useReservas();

  const handleCancelarReserva = (reserva) => {
    Alert.alert(
      'Cancelar reserva',
      `¿Deseas cancelar tu reserva de "${reserva.titulo}"?`,
      [
        {
          text: 'Conservar',
          style: 'cancel',
        },
        {
          text: 'Cancelar reserva',
          style: 'destructive',
          onPress: () => cancelarReserva(reserva.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={typography.titulo}>Mis Reservas</Text>

        <Text style={styles.subtitulo}>
          Administra tus clases agendadas
        </Text>

        <Text style={styles.contador}>
          {reservas.length}{' '}
          {reservas.length === 1
            ? 'reserva registrada'
            : 'reservas registradas'}
        </Text>
      </View>

      <FlatList
        data={reservas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ReservaItem
            reserva={item}
            onCancelar={() => handleCancelarReserva(item)}
          />
        )}
        ListEmptyComponent={
          <EstadoVacio
            mensaje="Aún no tienes clases reservadas"
            submensaje="Explora el catálogo y agenda tu próxima clase."
          />
        }
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.textoSuave,
    marginTop: spacing.xs,
  },
  contador: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primario,
    marginTop: spacing.md,
  },
  listaContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
});