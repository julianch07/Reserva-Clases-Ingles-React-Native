// Array de niveles disponibles para los filtros de la aplicación
export const niveles = [
  'Todos',
  'Básico',
  'Intermedio',
  'Avanzado',
  'Conversacional',
];

// Arreglo de objetos JSON con la información estática de las clases
export const clases = [
  {
    id: '1',
    titulo: 'Inglés desde cero',
    nivel: 'Básico',
    descripcion: 'Curso práctico enfocado en gramática inicial, vocabulario esencial y pronunciación básica para principiantes.',
    profesor: {
      nombre: 'Laura Gómez',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      pais: 'Colombia',
    },
    precio: 25,
    duracion: '1.5 horas',
    modalidad: 'Virtual',
    ranking: 4.8,
    cupos: 8,
    horarios: [
      {
        id: '1',
        dia: 'Lunes',
        hora: '10:00 AM',
      },
      {
        id: '2',
        dia: 'Miércoles',
        hora: '04:00 PM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800',
  },
  {
    id: '2',
    titulo: 'Conversación cotidiana y fluidez',
    nivel: 'Conversacional',
    descripcion: 'Espacio dinámico para soltar la lengua, mejorar la fluidez oral y ampliar vocabulario de uso diario en contextos reales.',
    profesor: {
      nombre: 'Laura Martínez',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      pais: 'Estados Unidos',
    },
    precio: 30,
    duracion: '1 hora',
    modalidad: 'Virtual',
    ranking: 4.9,
    cupos: 6,
    horarios: [
      {
        id: '1',
        dia: 'Martes',
        hora: '06:00 PM',
      },
      {
        id: '2',
        dia: 'Jueves',
        hora: '06:00 PM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  },
  {
    id: '3',
    titulo: 'Inglés intermedio intensivo',
    nivel: 'Intermedio',
    descripcion: 'Consolida tiempos verbales compuestos, expresiones modales y comprensión auditiva de textos de complejidad media.',
    profesor: {
      nombre: 'David Miller',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      pais: 'Canadá',
    },
    precio: 35,
    duracion: '2 horas',
    modalidad: 'Virtual',
    ranking: 4.7,
    cupos: 10,
    horarios: [
      {
        id: '1',
        dia: 'Sábado',
        hora: '09:00 AM',
      },
      {
        id: '2',
        dia: 'Sábado',
        hora: '11:00 AM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
  },
  {
    id: '4',
    titulo: 'Inglés de negocios y profesional',
    nivel: 'Avanzado',
    descripcion: 'Preparación para presentaciones corporativas, redacción de correos ejecutivos, negociación y vocabulario empresarial.',
    profesor: {
      nombre: 'Sarah Jenkins',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      pais: 'Reino Unido',
    },
    precio: 45,
    duracion: '1.5 horas',
    modalidad: 'Virtual',
    ranking: 5.0,
    cupos: 5,
    horarios: [
      {
        id: '1',
        dia: 'Lunes',
        hora: '07:00 PM',
      },
      {
        id: '2',
        dia: 'Miércoles',
        hora: '07:00 PM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
  },
  {
    id: '5',
    titulo: 'Fonética y pronunciación avanzada',
    nivel: 'Avanzado',
    descripcion: 'Aprende los símbolos del alfabeto fonético internacional (IPA), entonación natural y reducción de acento.',
    profesor: {
      nombre: 'Carlos Ruiz',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      pais: 'España',
    },
    precio: 28,
    duracion: '1 hora',
    modalidad: 'Virtual',
    ranking: 4.6,
    cupos: 7,
    horarios: [
      {
        id: '1',
        dia: 'Viernes',
        hora: '05:00 PM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  },
  {
    id: '6',
    titulo: 'Gramática práctica y redacción',
    nivel: 'Básico',
    descripcion: 'Aprende a estructurar oraciones correctamente, dominar conectores lógicos y redactar párrafos coherentes.',
    profesor: {
      nombre: 'Laura Gómez',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      pais: 'Colombia',
    },
    precio: 22,
    duracion: '1.5 horas',
    modalidad: 'Virtual',
    ranking: 4.8,
    cupos: 12,
    horarios: [
      {
        id: '1',
        dia: 'Martes',
        hora: '08:00 AM',
      },
      {
        id: '2',
        dia: 'Jueves',
        hora: '08:00 AM',
      },
    ],
    imagen: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
  },
];

export default {
  niveles,
  clases,
};