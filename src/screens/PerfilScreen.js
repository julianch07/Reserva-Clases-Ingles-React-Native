import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useReservas } from '../contexts/ReservasContext';
import { colors, spacing, typography, radius } from '../theme';

const perfilInicial = {
  nombre: '',
  correo: '',
  telefono: '',
};

export default function PerfilScreen() {
  const { reservas } = useReservas();

  const [perfil, setPerfil] = useState(perfilInicial);
  const [datosGuardados, setDatosGuardados] = useState(perfilInicial);

  const estadisticas = useMemo(() => {
    const aceptadas = reservas.filter(
      (reserva) => reserva.estado === 'aceptada'
    );

    const rechazadas = reservas.filter(
      (reserva) => reserva.estado === 'rechazada'
    );

    return {
      total: reservas.length,
      aceptadas: aceptadas.length,
      rechazadas: rechazadas.length,
    };
  }, [reservas]);

  const actualizarCampo = (campo, valor) => {
    setPerfil((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  const guardarCambios = () => {
    const nombre = perfil.nombre.trim();
    const correo = perfil.correo.trim();
    const telefono = perfil.telefono.trim();

    if (!nombre || !correo || !telefono) {
      Alert.alert(
        'Campos obligatorios',
        'Completa tu nombre, correo electrónico y teléfono.'
      );
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      Alert.alert(
        'Correo no válido',
        'Ingresa una dirección de correo electrónico válida.'
      );
      return;
    }

    const digitosTelefono = telefono.replace(/\D/g, '');

    if (digitosTelefono.length < 7 || digitosTelefono.length > 15) {
      Alert.alert(
        'Teléfono no válido',
        'Ingresa un teléfono que tenga entre 7 y 15 dígitos.'
      );
      return;
    }

    const nuevosDatos = {
      nombre,
      correo,
      telefono,
    };

    setPerfil(nuevosDatos);
    setDatosGuardados(nuevosDatos);

    Alert.alert(
      'Perfil actualizado',
      'Tus datos se han actualizado correctamente.'
    );
  };

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={typography.titulo}>Mi perfil</Text>

      <Text style={styles.descripcion}>
        Administra tus datos personales y consulta tu actividad
        en las clases de inglés.
      </Text>

      <View style={styles.tarjetaPerfil}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={38}
            color={colors.primario}
          />
        </View>

        <Text style={styles.nombrePerfil}>
          {datosGuardados.nombre || 'Estudiante'}
        </Text>

        <Text style={styles.correoPerfil}>
          {datosGuardados.correo || 'Completa tus datos personales'}
        </Text>

        <View style={styles.etiqueta}>
          <Ionicons
            name="school-outline"
            size={15}
            color={colors.primario}
          />
          <Text style={styles.textoEtiqueta}>
            Estudiante de inglés
          </Text>
        </View>
      </View>

      <View style={styles.seccion}>
        <Text style={typography.subtitulo}>
          Datos personales
        </Text>

        <Text style={styles.etiquetaCampo}>
          Nombre completo
        </Text>
        <TextInput
          style={styles.input}
          value={perfil.nombre}
          onChangeText={(valor) => actualizarCampo('nombre', valor)}
          placeholder="Escribe tu nombre completo"
          placeholderTextColor={colors.textoSuave}
          autoCapitalize="words"
          returnKeyType="next"
          maxLength={80}
        />

        <Text style={styles.etiquetaCampo}>
          Correo electrónico
        </Text>
        <TextInput
          style={styles.input}
          value={perfil.correo}
          onChangeText={(valor) => actualizarCampo('correo', valor)}
          placeholder="ejemplo@correo.com"
          placeholderTextColor={colors.textoSuave}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          maxLength={120}
        />

        <Text style={styles.etiquetaCampo}>
          Teléfono
        </Text>
        <TextInput
          style={styles.input}
          value={perfil.telefono}
          onChangeText={(valor) => actualizarCampo('telefono', valor)}
          placeholder="Tu número de teléfono"
          placeholderTextColor={colors.textoSuave}
          keyboardType="phone-pad"
          returnKeyType="done"
          maxLength={20}
        />

        <Pressable
          style={({ pressed }) => [
            styles.botonGuardar,
            pressed && styles.botonPresionado,
          ]}
          onPress={guardarCambios}
          accessibilityRole="button"
        >
          <Ionicons
            name="save-outline"
            size={19}
            color={colors.superficie}
          />
          <Text style={styles.textoBoton}>
            Guardar cambios
          </Text>
        </Pressable>
      </View>

      <View style={styles.seccion}>
        <Text style={typography.subtitulo}>
          Mi actividad
        </Text>

        <View style={styles.listaEstadisticas}>
          <View style={styles.tarjetaEstadistica}>
            <View
              style={[
                styles.iconoEstadistica,
                styles.fondoPrimario,
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.primario}
              />
            </View>

            <View style={styles.infoEstadistica}>
              <Text style={styles.numero}>
                {estadisticas.total}
              </Text>
              <Text style={styles.etiquetaEstadistica}>
                Reservas registradas
              </Text>
            </View>
          </View>

          <View style={styles.tarjetaEstadistica}>
            <View
              style={[
                styles.iconoEstadistica,
                styles.fondoExito,
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={colors.exito}
              />
            </View>

            <View style={styles.infoEstadistica}>
              <Text style={styles.numero}>
                {estadisticas.aceptadas}
              </Text>
              <Text style={styles.etiquetaEstadistica}>
                Reservas aceptadas
              </Text>
            </View>
          </View>

          <View style={styles.tarjetaEstadistica}>
            <View
              style={[
                styles.iconoEstadistica,
                styles.fondoError,
              ]}
            >
              <Ionicons
                name="close-circle-outline"
                size={22}
                color={colors.error}
              />
            </View>

            <View style={styles.infoEstadistica}>
              <Text style={styles.numero}>
                {estadisticas.rechazadas}
              </Text>
              <Text style={styles.etiquetaEstadistica}>
                Reservas rechazadas
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.nota}>
        <Ionicons
          name="information-circle-outline"
          size={20}
          color={colors.primario}
        />

        <Text style={styles.textoNota}>
          Las estadísticas se actualizan con tus reservas.
          En esta versión, los datos del perfil todavía no
          se conservan al cerrar la aplicación.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  contenido: {
    padding: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },

  descripcion: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textoSuave,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  tarjetaPerfil: {
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarioSuave,
    marginBottom: spacing.md,
  },
  nombrePerfil: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.texto,
    textAlign: 'center',
  },
  correoPerfil: {
    fontSize: 14,
    color: colors.textoSuave,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primarioSuave,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },
  textoEtiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primario,
  },
  seccion: {
    marginBottom: spacing.xl,
  },
  etiquetaCampo: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: 48,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.texto,
  },
  botonGuardar: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  textoBoton: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.superficie,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  listaEstadisticas: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  tarjetaEstadistica: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconoEstadistica: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondoPrimario: {
    backgroundColor: colors.primarioSuave,
  },
  fondoExito: {
    backgroundColor: '#DCFCE7',
  },
  fondoError: {
    backgroundColor: '#FEE2E2',
  },
  infoEstadistica: {
    flex: 1,
  },
  numero: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.texto,
  },
  etiquetaEstadistica: {
    fontSize: 13,
    color: colors.textoSuave,
    marginTop: spacing.xs,
  },
  nota: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.primarioSuave,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  textoNota: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.texto,
  },
});
