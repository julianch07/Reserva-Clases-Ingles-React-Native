import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const ReservasContext = createContext(null);

export function useReservas() {
  const ctx = useContext(ReservasContext);

  if (!ctx) {
    throw new Error('useReservas debe usarse dentro de ReservasProvider');
  }

  return ctx;
}

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);

  const agregarReserva = useCallback((clase, horario) => {
    setReservas((previas) => {
      if (previas.some((reserva) => reserva.claseId === clase.id)) {
        return previas;
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
        creadaEn: new Date().toISOString(),
      };

      return [nuevaReserva, ...previas];
    });

    return { ok: true };
  }, []);

  const cancelarReserva = useCallback((id) => {
    setReservas((previas) =>
      previas.filter((reserva) => reserva.id !== id)
    );
  }, []);

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
      reservas.find((reserva) => reserva.claseId === claseId),
    [reservas]
  );

  const valor = useMemo(
    () => ({
      reservas,
      agregarReserva,
      cancelarReserva,
      actualizarReserva,
      obtenerReserva,
    }),
    [
      reservas,
      agregarReserva,
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