export interface OlfactoryPyramid {
  salida: string[];
  corazon: string[];
  fondo: string[];
}

export interface Perfume {
  id: string;
  brand: string;
  name: string;
  category: 'Hombre' | 'Mujer' | 'Unisex' | 'Árabes / Nichos' | 'Colaboraciones Vesper' | 'Especiales Vesper' | 'Kits Vesper' | 'Unisex / Nicho';
  family: string;
  concentration: string;
  volume: string;
  price: number;
  status: 'Más vendido' | 'Edición Nicho' | 'Disponible' | 'Colección Privada' | 'Tendencia' | 'Alta Gama' | 'Lanzamiento Árabe' | 'Colaboración Exclusiva' | 'Discovery Set' | 'Edición Limitada';
  description: string;
  pyramid: OlfactoryPyramid;
  image: string;
  longevity: string;
  sillage: string;
  season: string;
  featured?: boolean;
}

export const PERFUMES_DATA: Perfume[] = [
  {
    id: 'santal-33',
    brand: 'Le Labo',
    name: 'Santal 33',
    category: 'Unisex / Nicho',
    family: 'Amaderada Aromática',
    concentration: 'Eau de Parfum',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 285,
    status: 'Edición Nicho',
    description: 'El icono de la perfumería contemporánea. Evoca el fuego crepitante de una llanura desértica americana bajo un cielo azul índigo, donde la libertad y la sofisticación se funden en una estela embriagadora.',
    pyramid: {
      salida: ['Cardamomo guatemalteco', 'Flor de Iris', 'Violeta silvestre'],
      corazon: ['Acorde de Cuero curado', 'Papiro egipcio', 'Ambrox mineral'],
      fondo: ['Sándalo australiano', 'Cedro de Virginia', 'Ámbar ahumado']
    },
    image: '/src/assets/images/perfume_santal_flacon_1790883555719.jpg',
    longevity: '10 - 12 Horas',
    sillage: 'Notable y envolvente',
    season: 'Cuatro estaciones / Versátil',
    featured: true
  },
  {
    id: 'baccarat-rouge-540',
    brand: 'Maison Francis Kurkdjian',
    name: 'Baccarat Rouge 540',
    category: 'Unisex / Nicho',
    family: 'Ámbar Floral Luminoso',
    concentration: 'Eau de Parfum',
    volume: '70 ml / 2.4 FL. OZ.',
    price: 340,
    status: 'Más vendido',
    description: 'Nacido del encuentro entre la alquimia del cristal rojo incandescente y la alta perfumería parisina. Una fragancia etérea pero imponente, dulce y cristalina con destellos amaderados cálidos.',
    pyramid: {
      salida: ['Azafrán de Cachemira', 'Jazmín Grandiflorum de Egipto'],
      corazon: ['Amberwood cristalino', 'Ámbar gris cálido'],
      fondo: ['Resina de Abeto balsámico', 'Madera de Cedro blanco']
    },
    image: '/src/assets/images/perfume_crystal_niche_1790883576485.jpg',
    longevity: '14+ Horas (Ultra durable)',
    sillage: 'Radiante y magnética',
    season: 'Otoño / Invierno / Noches',
    featured: true
  },
  {
    id: 'le-male-elixir',
    brand: 'Jean Paul Gaultier',
    name: 'Le Male Elixir',
    category: 'Hombre',
    family: 'Ámbar Aromático Fougère',
    concentration: 'Parfum',
    volume: '125 ml / 4.2 FL. OZ.',
    price: 148,
    status: 'Más vendido',
    description: 'Un fuego ardiente en la piel. La mítica silueta dorada desata una intensidad adictiva con notas melosas, lavanda crujiente y un corazón de haba tonka que seduce con misterio y calidez.',
    pyramid: {
      salida: ['Lavanda silvestre', 'Menta helada'],
      corazon: ['Vainilla negra de Madagascar', 'Benjuí resinoso'],
      fondo: ['Miel de bosque tostada', 'Haba Tonka', 'Hojas de Tabaco']
    },
    image: '/src/assets/images/perfume_gold_elixir_1790883566204.jpg',
    longevity: '12 - 14 Horas',
    sillage: 'Proyección intensa',
    season: 'Otoño / Invierno',
    featured: true
  },
  {
    id: 'toy-2-pearl',
    brand: 'Moschino',
    name: 'Toy 2 Pearl',
    category: 'Unisex / Nicho',
    family: 'Floral Amaderada Marina',
    concentration: 'Eau de Parfum',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 115,
    status: 'Tendencia',
    description: 'Inspirado en los reflejos iridiscentes del fondo marino y la frescura de Tahití. Una oda chispeante y contemporánea que combina cítricos salinos con la elegancia solar de la fresia.',
    pyramid: {
      salida: ['Limón Primofiore italiano', 'Sorbete de Orégano', 'Sal marina'],
      corazon: ['Jazmín hidropónico', 'Fresia blanca', 'Arena cálida'],
      fondo: ['Almizcle blanco puro', 'Vetiver de Haití', 'Ciprés de la Toscana']
    },
    image: '/src/assets/images/perfume_crystal_niche_1790883576485.jpg',
    longevity: '7 - 8 Horas',
    sillage: 'Moderada y luminosa',
    season: 'Primavera / Verano',
    featured: false
  },
  {
    id: 'tobacco-vanille',
    brand: 'Tom Ford',
    name: 'Tobacco Vanille',
    category: 'Unisex / Nicho',
    family: 'Oriental Especiada Cálida',
    concentration: 'Eau de Parfum Private Blend',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 310,
    status: 'Colección Privada',
    description: 'La opulencia del clásico club de caballeros londinense reinventada. Rica en especias finas, flores de tabaco selecto y vainilla bourbon que despiertan una calidez aristocrática incomparable.',
    pyramid: {
      salida: ['Hojas de Tabaco curado', 'Acorde de Especias orientales'],
      corazon: ['Haba Tonka tostada', 'Flor de Tabaco', 'Vainilla Bourbon', 'Cacao oscuro'],
      fondo: ['Frutos secos confitados', 'Savia de maderas nobles']
    },
    image: '/src/assets/images/vesper_hero_perfume_1790883545239.jpg',
    longevity: '14+ Horas',
    sillage: 'Pesada y aristocrática',
    season: 'Invierno / Noche de gala',
    featured: true
  },
  {
    id: 'delina-exclusif',
    brand: 'Parfums de Marly',
    name: 'Delina Exclusif',
    category: 'Mujer',
    family: 'Floral Ambarina Real',
    concentration: 'Parfum',
    volume: '75 ml / 2.5 FL. OZ.',
    price: 375,
    status: 'Alta Gama',
    description: 'El culmen de la feminidad palaciega de Versalles. Una rosa damascena voluptuosa envuelta en un velo aterciopelado de incienso místico, lichi jugoso y ámbar dorado cautivador.',
    pyramid: {
      salida: ['Lichi oriental', 'Pera Williams', 'Bergamota de Calabria'],
      corazon: ['Rosa Turca Damascena', 'Incienso sutil', 'Oud ahumado ligero'],
      fondo: ['Vainilla cremosa', 'Ámbar seco', 'Madera de Cedro noble']
    },
    image: '/src/assets/images/perfume_crystal_niche_1790883576485.jpg',
    longevity: '12 - 16 Horas',
    sillage: 'Majestuosa y perdurable',
    season: 'Otoño / Primavera / Noche',
    featured: true
  },
  {
    id: 'aventus',
    brand: 'Creed',
    name: 'Aventus',
    category: 'Hombre',
    family: 'Chipre Frutal Amaderado',
    concentration: 'Millésime Eau de Parfum',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 435,
    status: 'Colección Privada',
    description: 'Celebrando la fuerza, el poder y el éxito. Inspirado en la vida dramática de un emperador histórico, esta fragancia abre con piña vibrante que evoluciona hacia un abedul ahumado inconfundible.',
    pyramid: {
      salida: ['Piña Real madura', 'Grosellas negras', 'Manzana gala', 'Bergamota italiana'],
      corazon: ['Abedul ahumado', 'Pachulí de Indonesia', 'Jazmín de Marruecos', 'Rosa'],
      fondo: ['Almizcle real', 'Musgo de Roble', 'Ámbar gris milenario', 'Vainilla']
    },
    image: '/src/assets/images/perfume_santal_flacon_1790883555719.jpg',
    longevity: '10 - 12 Horas',
    sillage: 'Elegante y autoritaria',
    season: 'Todas las estaciones',
    featured: true
  },
  {
    id: 'jazz-club',
    brand: 'Maison Margiela REPLICA',
    name: 'Jazz Club',
    category: 'Hombre',
    family: 'Amaderada Oriental Licorosa',
    concentration: 'Eau de Toilette Concentrada',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 165,
    status: 'Disponible',
    description: 'Brooklyn, 2013. El recuerdo de una noche íntima en un sótano de jazz: copas de ron servidas sobre barras de roble envejecido, tabaco suave y sillones de piel que guardan historias memorables.',
    pyramid: {
      salida: ['Pimienta rosa picante', 'Neroli siciliano', 'Limón amargo'],
      corazon: ['Ron añejo caribeño', 'Salvia esclarea', 'Aceite de Vetiver de Java'],
      fondo: ['Hojas de Tabaco rubio', 'Vainilla de Tahití', 'Resina de Styrax']
    },
    image: '/src/assets/images/perfume_gold_elixir_1790883566204.jpg',
    longevity: '8 - 10 Horas',
    sillage: 'Cálida e íntima',
    season: 'Otoño / Invierno',
    featured: false
  },
  {
    id: 'naxos-1861',
    brand: 'Xerjoff',
    name: 'XJ 1861 Naxos',
    category: 'Unisex / Nicho',
    family: 'Aromática Especiada con Miel',
    concentration: 'Eau de Parfum',
    volume: '100 ml / 3.4 FL. OZ.',
    price: 290,
    status: 'Edición Nicho',
    description: 'Un tributo a la grandeza de Sicilia. Combina la frescura mediterránea de los cítricos sicilianos con un torrente glorioso de miel pura, canela exótica y tabaco noble de manufactura italiana.',
    pyramid: {
      salida: ['Bergamota de Calabria', 'Limón siciliano', 'Lavanda salvaje'],
      corazon: ['Miel de azahar pura', 'Canela de Ceilán', 'Jazmín Sambac', 'Cashmeran'],
      fondo: ['Hojas de Tabaco aromático', 'Haba Tonka', 'Vainilla cremosa']
    },
    image: '/src/assets/images/vesper_hero_perfume_1790883545239.jpg',
    longevity: '14+ Horas (Ultra proyector)',
    sillage: 'Proyección suntuosa',
    season: 'Otoño / Invierno / Primavera fresca',
    featured: false
  },
  {
    id: 'libre-platine',
    brand: 'Yves Saint Laurent',
    name: "Libre L'Absolu Platine",
    category: 'Mujer',
    family: 'Floral Ámbar Metálico',
    concentration: 'Parfum',
    volume: '90 ml / 3.0 FL. OZ.',
    price: 185,
    status: 'Tendencia',
    description: 'La tensión cautivadora entre el frío platino y el fuego interior. Un choque de contrastes donde la lavanda blanca Diva francesa se funde con el resplandor ardiente de la flor de azahar.',
    pyramid: {
      salida: ['Aldehídos blancos helados', 'Bergamota brillante', 'Mandarina'],
      corazon: ['Lavanda blanca Diva', 'Flor de Azahar de Marruecos'],
      fondo: ['Acorde de Ámbar gris mineral', 'Vainilla de Madagascar']
    },
    image: '/src/assets/images/perfume_crystal_niche_1790883576485.jpg',
    longevity: '10 - 12 Horas',
    sillage: 'Distinguida y radiante',
    season: 'Otoño / Invierno / Citas especiales',
    featured: false
  }
];

export const WHATSAPP_PHONE_DEFAULT = '573232175101'; // +57 323 217 5101 (Colombia)
