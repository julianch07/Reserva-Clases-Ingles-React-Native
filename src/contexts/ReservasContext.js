
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { clases } from '../data/clases';

const ReservasContext = createContext(null);

export function useReservas() {
  const ctx = useContext(ReservasContext);

  if (!ctx) {
    throw new Error(
      'useReservas debe usarse dentro de ReservasProvider'
    );
  }

  return ctx;
}

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);

  const [cuposDisponibles, setCuposDisponibles] = useState(() =>
    Object.fromEntries(
      clases.map((clase) => [clase.id, clase.cupos])
    )
  );

  const obtenerCupos = useCallback(
    (claseId) => cuposDisponibles[claseId] ?? 0,
    [cuposDisponibles]
  );

  const agregarReserva = useCallback(
    (clase, horario) => {
      const duplicada = reservas.some(
        (reserva) =>
          reserva.claseId === clase.id &&
          reserva.horarioId === horario.id &&
          reserva.estado !== 'rechazada'
      );

      if (duplicada) {
        return {
          ok: false,
          mensaje: 'Ya existe una reserva para este horario.',
        };
      }

      const cupos = cuposDisponibles[clase.id] ?? 0;

      if (cupos <= 0) {
        return {
          ok: false,
          mensaje: 'No quedan cupos disponibles para esta clase.',
        };
      }

      const nuevaReserva = {
        id: `${clase.id}_${horario.id}`,
        claseId: clase.id,
        titulo: clase.titulo,
        nivel: clase.nivel,
        profesor: clase.profesor.nombre,
        precio: clase.precio,
        horarioId: horario.id,
        dia: horario.dia,
        hora: horario.hora,
        estado: 'aceptada',
        creadaEn: new Date().toISOString(),
      };

      setReservas((previas) => [nuevaReserva, ...previas]);

      setCuposDisponibles((previos) => ({
        ...previos,
        [clase.id]: Math.max(
          0,
          (previos[clase.id] ?? 0) - 1
        ),
      }));

      return {
        ok: true,
        id: nuevaReserva.id,
      };
    },
    [reservas, cuposDisponibles]
  );

  const aceptarReserva = useCallback(
    (id) => {
      const reserva = reservas.find(
        (item) => item.id === id
      );

      if (!reserva || reserva.estado === 'aceptada') {
        return;
      }

      const cupos = cuposDisponibles[reserva.claseId] ?? 0;

      if (cupos <= 0) {
        return;
      }

      setReservas((previas) =>
        previas.map((item) =>
          item.id === id
            ? { ...item, estado: 'aceptada' }
            : item
        )
      );

      setCuposDisponibles((previos) => ({
        ...previos,
        [reserva.claseId]: previos[reserva.claseId] - 1,
      }));
    },
    [reservas, cuposDisponibles]
  );

  const rechazarReserva = useCallback(
    (id) => {
      const reserva = reservas.find(
        (item) => item.id === id
      );

      if (!reserva) {
        return;
      }

      setReservas((previas) =>
        previas.map((item) =>
          item.id === id
            ? { ...item, estado: 'rechazada' }
            : item
        )
      );

      if (reserva.estado === 'aceptada') {
        setCuposDisponibles((previos) => ({
          ...previos,
          [reserva.claseId]:
            (previos[reserva.claseId] ?? 0) + 1,
        }));
      }
    },
    [reservas]
  );

  const cancelarReserva = useCallback(
    (id) => {
      const reserva = reservas.find(
        (item) => item.id === id
      );

      if (!reserva) {
        return;
      }

      setReservas((previas) =>
        previas.filter((item) => item.id !== id)
      );

      if (reserva.estado === 'aceptada') {
        setCuposDisponibles((previos) => ({
          ...previos,
          [reserva.claseId]:
            (previos[reserva.claseId] ?? 0) + 1,
        }));
      }
    },
    [reservas]
  );

  const actualizarReserva = useCallback((id, cambios) => {
    setReservas((previas) =>
      previas.map((reserva) =>
        reserva.id === id
          ? { ...reserva, ...cambios }
          : reserva
      )
    );
  }, []);

  const obtenerReserva = useCallback(
    (claseId) =>
      reservas.find(
        (reserva) => reserva.claseId === claseId
      ),
    [reservas]
  );

  const valor = useMemo(
    () => ({
      reservas,
      cuposDisponibles,
      obtenerCupos,
      agregarReserva,
      aceptarReserva,
      rechazarReserva,
      cancelarReserva,
      actualizarReserva,
      obtenerReserva,
    }),
    [
      reservas,
      cuposDisponibles,
      obtenerCupos,
      agregarReserva,
      aceptarReserva,
      rechazarReserva,
      cancelarReserva,
      actualizarReserva,
      obtenerReserva,
    ]
  );

  return (
    <ReservasContext.Provider value={valor}>
      {children}
    </ReservasContext.Provider>
  );
}

export default ReservasProvider;
