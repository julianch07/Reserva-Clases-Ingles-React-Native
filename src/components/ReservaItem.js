import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius } from '../theme';

export default function ReservaItem({ reserva, onCancelar }) {
  const estaAceptada = reserva.estado === 'aceptada';

  return (
    <View style={styles.tarjeta}>
      <View style={styles.cabecera}>
        <EtiquetaNivel nivel={reserva.nivel} />

        <Text style={styles.precio}>
          ${reserva.precio} USD
        </Text>
      </View>

      <Text style={styles.titulo}>{reserva.titulo}</Text>

      <View style={styles.filaInfo}>
        <Ionicons
          name="person-outline"
          size={16}
          color={colors.textoSuave}
        />
        <Text style={styles.textoInfo}>
          Prof. {reserva.profesor?.nombre || reserva.profesor}
        </Text>
      </View>

      <View style={styles.filaInfo}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color={colors.textoSuave}
        />
        <Text style={styles.textoInfo}>{reserva.dia}</Text>
      </View>

      <View style={styles.filaInfo}>
        <Ionicons
          name="time-outline"
          size={16}
          color={colors.textoSuave}
        />
        <Text style={styles.textoInfo}>{reserva.hora}</Text>
      </View>

      <View
        style={[
          styles.estado,
          estaAceptada ? styles.estadoAceptado : styles.estadoRechazado,
        ]}
      >
        <Text
          style={[
            styles.textoEstado,
            estaAceptada
              ? styles.textoEstadoAceptado
              : styles.textoEstadoRechazado,
          ]}
        >
          {estaAceptada ? 'Reserva aceptada' : 'Reserva rechazada'}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botonCancelar,
          pressed && styles.pressed,
        ]}
        onPress={onCancelar}
        accessibilityRole="button"
        accessibilityLabel={`Cancelar reserva de ${reserva.titulo}`}
      >
        <Ionicons
          name="trash-outline"
          size={16}
          color={colors.error}
        />
        <Text style={styles.textoBotonCancelar}>
          Eliminar reserva
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
    marginBottom: spacing.md,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  precio: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primario,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
    marginBottom: spacing.sm,
  },
  filaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  textoInfo: {
    flex: 1,
    fontSize: 13,
    color: colors.textoSuave,
    marginLeft: spacing.xs,
  },
  estado: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  estadoAceptado: {
    backgroundColor: '#DCFCE7',
  },
  estadoRechazado: {
    backgroundColor: '#FEE2E2',
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '600',
  },
  textoEstadoAceptado: {
    color: '#166534',
  },
  textoEstadoRechazado: {
    color: '#991B1B',
  },
  botonCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
  },
  textoBotonCancelar: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.error,
    marginLeft: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});
