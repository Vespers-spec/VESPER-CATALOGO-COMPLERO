import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Heart, 
  Code, 
  ShieldCheck, 
  Droplets, 
  Clock, 
  MessageCircle, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Image as ImageIcon,
  Truck,
  CreditCard,
  MapPin
} from 'lucide-react';
import { Perfume, WHATSAPP_PHONE_DEFAULT } from './data/perfumes';

const STORAGE_KEY = 'vesper_perfumes_catalog_v5';
const LOGO_STORAGE_KEY = 'vesper_custom_logo';
const ADMIN_PASSWORD_EXACT = 'vpplaneplane11';

// Generador para poblar más de 500 perfumes (528 fragancias = 22 páginas de 24 productos)
function generate500Perfumes(): Perfume[] {
  const houses = [
    // Hombre
    { brand: "Creed", cat: "Hombre" },
    { brand: "Jean Paul Gaultier", cat: "Hombre" },
    { brand: "Dior", cat: "Hombre" },
    { brand: "Chanel", cat: "Hombre" },
    { brand: "Acqua di Parma", cat: "Hombre" },
    { brand: "Tom Ford Men", cat: "Hombre" },

    // Mujer
    { brand: "Parfums de Marly", cat: "Mujer" },
    { brand: "Yves Saint Laurent", cat: "Mujer" },
    { brand: "Carolina Herrera", cat: "Mujer" },
    { brand: "Lancôme", cat: "Mujer" },
    { brand: "Kilian Paris", cat: "Mujer" },
    { brand: "Mugler", cat: "Mujer" },

    // Unisex
    { brand: "Le Labo", cat: "Unisex" },
    { brand: "Maison Francis Kurkdjian", cat: "Unisex" },
    { brand: "Tom Ford", cat: "Unisex" },
    { brand: "Byredo", cat: "Unisex" },
    { brand: "Diptyque", cat: "Unisex" },
    { brand: "Matiere Premiere", cat: "Unisex" },

    // Árabes / Nichos
    { brand: "Lattafa", cat: "Árabes / Nichos" },
    { brand: "Xerjoff", cat: "Árabes / Nichos" },
    { brand: "Afnan", cat: "Árabes / Nichos" },
    { brand: "Swiss Arabian", cat: "Árabes / Nichos" },
    { brand: "Armaf", cat: "Árabes / Nichos" },
    { brand: "Amouage", cat: "Árabes / Nichos" },

    // Colaboraciones Vesper
    { brand: "Vesper × Grasse", cat: "Colaboraciones Vesper" },
    { brand: "Vesper × Dubai", cat: "Colaboraciones Vesper" },
    { brand: "Vesper × Milano", cat: "Colaboraciones Vesper" },
    { brand: "Vesper × Paris", cat: "Colaboraciones Vesper" },

    // Especiales Vesper
    { brand: "Vesper Atelier Privé", cat: "Especiales Vesper" },
    { brand: "Vesper Vault Collection", cat: "Especiales Vesper" },
    { brand: "Vesper Elixir Royale", cat: "Especiales Vesper" },
    { brand: "Vesper Black Label", cat: "Especiales Vesper" },

    // Kits Vesper
    { brand: "Vesper Discovery Vault", cat: "Kits Vesper" },
    { brand: "Vesper Coffret Luxe", cat: "Kits Vesper" },
    { brand: "Vesper Duo Alquimia", cat: "Kits Vesper" }
  ];

  const genericNames = [
    "Khamrah", "Oud for Glory", "Naxos 1861", "Santal 33", "Baccarat Rouge 540",
    "Aventus", "Le Male Elixir", "Delina Exclusif", "Libre Platine", "Tobacco Vanille",
    "Sauvage Elixir", "Club de Nuit Intense", "Shaghaf Oud", "Turathi Blue", "Elysium",
    "Layton", "Grand Soir", "Angels' Share", "Hacivat", "Silver Mountain Water",
    "Jazz Club", "Toy 2 Pearl", "Velvet Desert Oud", "Musk Therapy", "Side Effect"
  ];

  const collabNames = [
    "Rose Centifolia & Oud Imperial", "Santal Royal Cuir d'Or", "Iris Sublime di Milano",
    "Vanille Bourbon & Cacao Noir", "Ambre Impérial du Golfe", "Cuir Vénitien & Encens Blanc",
    "Fleur Blanche de Grasse", "Safran d'Orient Extrait", "Bergamotto & Pelle Nobile"
  ];

  const specialNames = [
    "Vesper Elixir Privé Extrait", "Vesper Noir Absolu de Nuit", "Vesper Gold Imperial Nectar",
    "Vesper Velvet Shadow Extrait", "Vesper Royal Sillage Privé", "Vesper Cristal D'Ambre",
    "Vesper Cuir Majestueux", "Vesper Bois d'Ébène", "Vesper Rose Alchimique"
  ];

  const kitNames = [
    "Discovery Vault: 5 Joyas Árabes (5x10ml)", "Niche Connoisseur Coffret (4x10ml)",
    "Duo Layering Alquimia Pura (2x50ml)", "Travel Leather Case + 3 Viales Recargables",
    "Discovery Set Masculino Best Sellers (5x10ml)", "Discovery Set Femenino Alta Gama (5x10ml)"
  ];

  const families = [
    "Oriental Especiada", "Ámbar Floral", "Amaderada Cuero", "Aromática Fougère",
    "Floral Frutal", "Cítrica Marina", "Chipre Amaderado", "Gourmand Licoroso"
  ];

  const images = [
    "/src/assets/images/perfume_santal_flacon_1790883555719.jpg",
    "/src/assets/images/perfume_gold_elixir_1790883566204.jpg",
    "/src/assets/images/perfume_crystal_niche_1790883576485.jpg",
    "/src/assets/images/vesper_hero_perfume_1790883545239.jpg"
  ];

  const catalog: Perfume[] = [];
  const total = 528;

  for (let i = 1; i <= total; i++) {
    const house = houses[i % houses.length];
    let fullName = "";
    let statusText: Perfume['status'] = "Disponible";
    let descText = "Creación olfativa exclusiva con notas seleccionadas de alta pureza y fijación duradera en piel.";
    let volText = i % 2 === 0 ? "100 ml" : "75 ml";
    let priceVal = Math.floor((i * 17) % 320) + 65;

    if (house.cat === "Colaboraciones Vesper") {
      const bName = collabNames[i % collabNames.length];
      const cycle = Math.floor(i / collabNames.length) + 1;
      fullName = cycle > 1 ? `${bName} Ed. ${cycle}` : bName;
      statusText = "Colaboración Exclusiva";
      descText = "Coautoría artística con perfumistas maestros internacionales. Edición de colección numerada a mano con estuche de lujo.";
      priceVal = 145 + ((i * 11) % 180);
    } else if (house.cat === "Especiales Vesper") {
      const bName = specialNames[i % specialNames.length];
      const cycle = Math.floor(i / specialNames.length) + 1;
      fullName = cycle > 1 ? `${bName} Millésime ${cycle}` : bName;
      statusText = "Colección Privada";
      descText = "Extracto de Parfum puro formulado por el atelier Vesper con maceración prolongada de 6 meses y fijación de más de 16 horas.";
      priceVal = 160 + ((i * 13) % 190);
    } else if (house.cat === "Kits Vesper") {
      const bName = kitNames[i % kitNames.length];
      const cycle = Math.floor(i / kitNames.length) + 1;
      fullName = cycle > 1 ? `${bName} Vol. ${cycle}` : bName;
      statusText = "Discovery Set";
      descText = "Cofre de presentación de alta gama con atomizadores recargables y guía de cata olfativa. Ideal para viaje o regalo.";
      volText = "Set Decants 10ml";
      priceVal = 85 + ((i * 15) % 110);
    } else {
      const bName = genericNames[i % genericNames.length];
      const vol = Math.floor(i / genericNames.length) + 1;
      fullName = vol > 1 ? `${bName} Vol. ${vol}` : bName;
      statusText = i % 5 === 0 ? "Más vendido" : (house.cat === "Árabes / Nichos" ? "Lanzamiento Árabe" : "Disponible");
    }

    catalog.push({
      id: `perfume-${i}`,
      brand: house.brand,
      name: fullName,
      category: house.cat as any,
      family: families[i % families.length],
      concentration: house.cat === "Colaboraciones Vesper" || house.cat === "Especiales Vesper" ? "Extrait de Parfum" : (i % 3 === 0 ? "Extrait de Parfum" : "Eau de Parfum"),
      volume: volText,
      price: priceVal,
      status: statusText,
      description: descText,
      pyramid: {
        salida: ["Bergamota de Calabria", "Canela de Ceilán", "Cardamomo Verde"],
        corazon: ["Dátiles dulces", "Iris Nobile", "Rosa de Damasco", "Cuero Suave"],
        fondo: ["Oud Real", "Vainilla Bourbon", "Sándalo Australiano", "Ámbar Gris"]
      },
      image: images[i % images.length],
      longevity: house.cat === "Especiales Vesper" || house.cat === "Colaboraciones Vesper" ? "14 - 18 Horas" : "12 - 14 Horas",
      sillage: "Pesada y envolvente",
      season: "Cuatro estaciones",
      featured: i <= 12
    });
  }

  return catalog;
}

export default function App() {
  // Catálogo persistente con +500 perfumes
  const [perfumes, setPerfumes] = useState<Perfume[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) && 
          parsed.length >= 200 &&
          parsed.some(p => p.category === 'Colaboraciones Vesper') &&
          parsed.some(p => p.category === 'Especiales Vesper') &&
          parsed.some(p => p.category === 'Kits Vesper')
        ) {
          return parsed;
        }
      }
    } catch {}
    const initial500 = generate500Perfumes();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial500));
    } catch {}
    return initial500;
  });

  const savePerfumes = (newList: Perfume[]) => {
    setPerfumes(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // Logo desde galería
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOGO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCustomLogo(base64);
        try {
          localStorage.setItem(LOGO_STORAGE_KEY, base64);
        } catch {}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setCustomLogo(null);
    try {
      localStorage.removeItem(LOGO_STORAGE_KEY);
    } catch {}
  };

  // Modo Administrador con 3 CLICKS en "Vesper"
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('vesper_admin_active') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Triple click detector
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);

  const handleVesperTripleClick = () => {
    clickCountRef.current += 1;
    clearTimeout(clickTimerRef.current);

    if (clickCountRef.current === 3) {
      clickCountRef.current = 0;
      if (isAdmin) {
        alert("Ya te encuentras en Modo Administrador.");
      } else {
        setIsAdminLoginOpen(true);
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 700);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput.trim() === ADMIN_PASSWORD_EXACT) {
      setIsAdmin(true);
      sessionStorage.setItem('vesper_admin_active', 'true');
      setIsAdminLoginOpen(false);
      setAdminPasswordInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('vesper_admin_active');
  };

  // 1. FILTROS Y CATEGORÍAS EXACTAS
  const categoriesList = [
    'Todos', 
    'Hombre', 
    'Mujer', 
    'Unisex', 
    'Árabes / Nichos', 
    'Colaboraciones Vesper', 
    'Especiales Vesper',
    'Kits Vesper'
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');

  // 2. PAGINACIÓN (24 productos por página para soportar 500+ perfumes)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

  // Modales
  const [activeModalPerfume, setActiveModalPerfume] = useState<Perfume | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [activeKitTab, setActiveKitTab] = useState<'all' | 'discovery' | 'collabs' | 'specials'>('all');

  // Kits, Colaboraciones y Especiales
  const kitsList = [
    {
      id: "kit-discovery-arabian",
      type: "discovery",
      badge: "Discovery Set Exclusivo",
      title: "Vesper Discovery Vault: Joyas Árabes",
      subtitle: "5 Extractos Puros de 10ml en Estuche de Terciopelo Negro",
      items: ["Khamrah", "Bade'e Al Oud", "Naxos 1861", "Club de Nuit Pure Parfum", "Asad"],
      description: "El cofre definitivo para explorar la alta perfumería oriental. 5 decants atomizadores de vidrio reforzado con corona dorada.",
      price: 95,
      originalPrice: 140,
      gradient: "from-amber-950/70 via-stone-900 to-black"
    },
    {
      id: "kit-niche-connoisseur",
      type: "discovery",
      badge: "Niche Masterpieces",
      title: "Niche Connoisseur Coffret (4x10ml)",
      subtitle: "Las 4 Esencias Más Codiciadas del Mundo",
      items: ["Santal 33 (Le Labo)", "Baccarat Rouge 540 Extrait (MFK)", "Aventus Millésime (Creed)", "Angels' Share (Kilian)"],
      description: "Una selección curada por nuestros sumilleres para los amantes del lujo supremo y la fijación imperturbable.",
      price: 145,
      originalPrice: 210,
      gradient: "from-yellow-950/60 via-zinc-900 to-black"
    },
    {
      id: "collab-grasse-ombre",
      type: "collabs",
      badge: "Edición Limitada 300 Unidades",
      title: "Vesper × Grasse Atelier: L'Ombre Dorée",
      subtitle: "Haute Parfumerie · Frasco de 50ml Numerado a Mano",
      items: ["Rosa de Mayo Centifolia de Grasse", "Azafrán Persa Real", "Oud Blanco Silvestre"],
      description: "Colaboración exclusiva con maestros perfumistas de Grasse. Cada frasco viene con sello en lacre y certificado de autenticidad.",
      price: 210,
      originalPrice: 280,
      gradient: "from-rose-950/70 via-zinc-900 to-black"
    },
    {
      id: "collab-dubai-cuir-sultan",
      type: "collabs",
      badge: "Colaboración Dubai Masters",
      title: "Vesper × Dubai Masters: Cuir Sultan Extrait",
      subtitle: "Frasco en Cristal Pesado con Acabados en Oro 24K (50ml)",
      items: ["Cuero Toscano Añejado", "Resina Sagrada de Omán", "Vainilla Negra Ahumada"],
      description: "Potencia, nobleza y distinción imperial. Una estela de más de 16 horas diseñada en los emiratos.",
      price: 195,
      originalPrice: 260,
      gradient: "from-emerald-950/70 via-stone-900 to-black"
    },
    {
      id: "special-layering-duo",
      type: "specials",
      badge: "Especial de Vesper",
      title: "Dúo Layering Imperial (Khamrah + Cuir Sultan)",
      subtitle: "El Arte de la Superposición Olfativa (2 Frascos Completos)",
      items: ["1x Lattafa Khamrah 100ml", "1x Cuir Sultan Extrait 50ml", "Guía Impresa de Layering"],
      description: "Crea una firma olfativa única combinando la base oscura de cuero y oud con la dulzura licorosa de dátiles y canela.",
      price: 150,
      originalPrice: 210,
      gradient: "from-amber-950/80 via-zinc-900 to-black"
    },
    {
      id: "special-travel-case",
      type: "specials",
      badge: "Accesorio de Lujo Vesper",
      title: "Estuche de Viaje en Cuero Italiano + 3 Viales Recargables",
      subtitle: "Atomizadores Herméticos de Llenado Rápido (3x12ml)",
      items: ["Estuche artesanal en cuero flor", "3 Atomizadores recargables de titanio", "Embudo y pipeta de precisión"],
      description: "Lleva tus fragancias favoritas protegidas de la luz y los golpes en un accesorio de alta marroquinería.",
      price: 65,
      originalPrice: 95,
      gradient: "from-stone-900 via-zinc-900 to-black"
    }
  ];

  // Formulario de edición/creación
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Árabes / Nichos' as any,
    family: 'Oriental Especiada',
    concentration: 'Eau de Parfum',
    volume: '100 ml',
    price: 120,
    status: 'Disponible' as Perfume['status'],
    description: '',
    salida: '',
    corazon: '',
    fondo: '',
    image: '',
    longevity: '12 - 14 Horas',
    sillage: 'Pesada y envolvente',
    season: 'Cuatro estaciones'
  });

  // Favoritos
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vesper_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('vesper_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Filtrado y ordenamiento de alta velocidad
  const filteredPerfumes = useMemo(() => {
    let result = perfumes.filter(perfume => {
      if (selectedCategory === 'Favoritos') {
        if (!favorites.includes(perfume.id)) return false;
      } else if (selectedCategory !== 'Todos') {
        if (selectedCategory === 'Árabes / Nichos') {
          if (
            perfume.category !== 'Árabes / Nichos' && 
            (perfume.category as any) !== 'Unisex / Nicho' &&
            (perfume.category as any) !== 'Nicho'
          ) {
            return false;
          }
        } else if (selectedCategory === 'Colaboraciones Vesper') {
          if (
            perfume.category !== 'Colaboraciones Vesper' &&
            !perfume.brand.toLowerCase().includes('vesper ×') &&
            !perfume.brand.toLowerCase().includes('colaboración')
          ) {
            return false;
          }
        } else if (selectedCategory === 'Especiales Vesper') {
          if (
            perfume.category !== 'Especiales Vesper' &&
            !perfume.brand.toLowerCase().includes('vesper atelier') &&
            !perfume.brand.toLowerCase().includes('vesper vault') &&
            !perfume.brand.toLowerCase().includes('vesper elixir') &&
            !perfume.brand.toLowerCase().includes('vesper black')
          ) {
            return false;
          }
        } else if (selectedCategory === 'Kits Vesper') {
          if (
            perfume.category !== 'Kits Vesper' &&
            !perfume.name.toLowerCase().includes('kit') &&
            !perfume.name.toLowerCase().includes('coffret') &&
            !perfume.name.toLowerCase().includes('discovery') &&
            !perfume.name.toLowerCase().includes('set')
          ) {
            return false;
          }
        } else if (perfume.category !== selectedCategory) {
          return false;
        }
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = perfume.name.toLowerCase().includes(query);
        const matchBrand = perfume.brand.toLowerCase().includes(query);
        const matchFamily = (perfume.family || '').toLowerCase().includes(query);
        const matchCategory = (perfume.category || '').toLowerCase().includes(query);
        const matchTop = perfume.pyramid?.salida?.some(n => n.toLowerCase().includes(query)) || false;
        const matchHeart = perfume.pyramid?.corazon?.some(n => n.toLowerCase().includes(query)) || false;
        const matchBase = perfume.pyramid?.fondo?.some(n => n.toLowerCase().includes(query)) || false;
        if (!matchName && !matchBrand && !matchFamily && !matchCategory && !matchTop && !matchHeart && !matchBase) {
          return false;
        }
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [perfumes, selectedCategory, searchQuery, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredPerfumes.length / itemsPerPage) || 1;
  const paginatedPerfumes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPerfumes.slice(start, start + itemsPerPage);
  }, [filteredPerfumes, currentPage, itemsPerPage]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 340, behavior: 'smooth' });
    }
  };

  // CRUD
  const handleOpenCreateModal = () => {
    setEditingPerfume(null);
    setFormData({
      name: '',
      brand: '',
      category: 'Árabes / Nichos',
      family: 'Oriental Especiada',
      concentration: 'Eau de Parfum',
      volume: '100 ml',
      price: 95,
      status: 'Disponible',
      description: 'Fragancia sublime formulada con aceites esenciales de altísima fijación.',
      salida: 'Canela, Nuez moscada, Bergamota',
      corazon: 'Dátiles, Iris, Rosa',
      fondo: 'Oud, Vainilla, Ámbar gris',
      image: '/src/assets/images/perfume_gold_elixir_1790883566204.jpg',
      longevity: '12 - 14 Horas',
      sillage: 'Pesada y envolvente',
      season: 'Otoño / Invierno'
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (perfume: Perfume, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPerfume(perfume);
    setFormData({
      name: perfume.name,
      brand: perfume.brand,
      category: perfume.category,
      family: perfume.family || '',
      concentration: perfume.concentration || 'Eau de Parfum',
      volume: perfume.volume || '100 ml',
      price: perfume.price,
      status: perfume.status,
      description: perfume.description || '',
      salida: (perfume.pyramid?.salida || []).join(', '),
      corazon: (perfume.pyramid?.corazon || []).join(', '),
      fondo: (perfume.pyramid?.fondo || []).join(', '),
      image: perfume.image || '',
      longevity: perfume.longevity || '10 - 12 Horas',
      sillage: perfume.sillage || 'Notable',
      season: perfume.season || 'Versátil'
    });
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const parseNotes = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload: Perfume = {
      id: editingPerfume ? editingPerfume.id : `perfume-${Date.now()}`,
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      family: formData.family.trim() || 'Alta Perfumería',
      concentration: formData.concentration.trim() || 'Eau de Parfum',
      volume: formData.volume.trim() || '100 ml',
      price: Number(formData.price) || 80,
      status: formData.status,
      description: formData.description.trim(),
      pyramid: {
        salida: parseNotes(formData.salida),
        corazon: parseNotes(formData.corazon),
        fondo: parseNotes(formData.fondo)
      },
      image: formData.image.trim() || '/src/assets/images/perfume_crystal_niche_1790883576485.jpg',
      longevity: formData.longevity,
      sillage: formData.sillage,
      season: formData.season,
      featured: editingPerfume?.featured ?? false
    };

    if (editingPerfume) {
      savePerfumes(perfumes.map(p => p.id === editingPerfume.id ? productPayload : p));
    } else {
      savePerfumes([productPayload, ...perfumes]);
    }

    setIsFormModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar "${name}" del catálogo?`)) {
      savePerfumes(perfumes.filter(p => p.id !== id));
      if (activeModalPerfume?.id === id) setActiveModalPerfume(null);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('¿Deseas restablecer el catálogo completo de 528 perfumes de fábrica?')) {
      const fresh500 = generate500Perfumes();
      savePerfumes(fresh500);
      setCurrentPage(1);
    }
  };

  const getWhatsAppLink = (perfume: Perfume) => {
    const message = `Hola Vesper Perfumería (+57 323 217 5101), deseo ordenar con pago contraentrega el perfume:\n\n*${perfume.brand} — ${perfume.name}*\nCategoría: ${perfume.category}\nPrecio: $${perfume.price} USD.\n\n¿Tienen disponibilidad para envío a mi ciudad?`;
    return `https://wa.me/${WHATSAPP_PHONE_DEFAULT}?text=${encodeURIComponent(message)}`;
  };

  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'Hombre':
        return {
          badge: 'Haute Parfumerie Masculina',
          title: 'Sección Masculina · Presencia & Magnetismo',
          desc: 'Fragancias amaderadas, cueros ahumados, fougère aromáticos y especias orientales seleccionadas por su proyección y fijación impecable.'
        };
      case 'Mujer':
        return {
          badge: 'Elixires Femeninos de Lujo',
          title: 'Sección Femenina · Seducción & Opulencia',
          desc: 'Ramilletes florales preciosos, vainillas de Madagascar, jazmines egipcios y acordes gourmand sofisticados que dejan una estela inolvidable.'
        };
      case 'Unisex':
        return {
          badge: 'Alquimia Sin Género',
          title: 'Sección Unisex · Libertad Olfativa & Vanguardia',
          desc: 'Creaciones moleculares, sándalo australiano, ámbar cristalino y cedros nobles diseñados para fundirse con la química natural de tu piel.'
        };
      case 'Árabes / Nichos':
        return {
          badge: 'Oriente Medio & Casas de Culto',
          title: 'Árabes & Nichos · Ultra Concentración & Resinas',
          desc: 'Las casas más virales y aclamadas: Lattafa, Xerjoff, Afnan y Amouage. Perfumes con aceites macerados de proyección insuperable.'
        };
      case 'Colaboraciones Vesper':
        return {
          badge: 'Ediciones Especiales de Autor',
          title: 'Colaboraciones Vesper · Grasse, Dubái & Milán',
          desc: 'Obras maestras creadas en coautoría con maestros perfumistas de Francia, Italia y los Emiratos Árabes en tirajes exclusivos.'
        };
      case 'Especiales Vesper':
        return {
          badge: 'Colección Privada Vesper',
          title: 'Especiales de Vesper · Elixires de Firma',
          desc: 'Extractos puros de Parfum formulados bajo estrictos estándares de la casa Vesper con maceración artesanal y botellas de alta gama.'
        };
      case 'Kits Vesper':
        return {
          badge: 'Discovery Sets & Sets de Regalo',
          title: 'Kits & Discovery Sets Vesper · Explora Sin Límites',
          desc: 'Cofres de decants atomizadores en estuches de terciopelo y cuero italiano para descubrir fragancias icónicas antes de tu frasco grande.'
        };
      case 'Favoritos':
        return {
          badge: 'Tu Selección Guardada',
          title: 'Mis Fragancias Favoritas',
          desc: 'Perfumes que has guardado en tu navegador. Puedes cotizar la lista completa o pedir cualquiera por WhatsApp (+57 323 217 5101) en un solo clic.'
        };
      default:
        return {
          badge: 'Catálogo General Completo',
          title: 'Todas las Fragancias Vesper',
          desc: 'Explora más de 500 perfumes seleccionados con entrega contraentrega a toda Colombia y envíos gratuitos en Bogotá.'
        };
    }
  };

  // Tecla Escape para modales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalPerfume(null);
        setIsAdminLoginOpen(false);
        setIsFormModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#edece8] flex flex-col antialiased selection:bg-[#c5a880]/30 selection:text-[#f8f5ee]">
      
      {/* ========================================================
          BARRA DE ADMINISTRADOR
      ======================================================== */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border-b border-[#c5a880]/40 px-4 py-2.5 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] animate-ping"></span>
              <span className="font-semibold text-[#f1dfb8] uppercase tracking-wider text-[11px]">
                Modo Administrador Activo
              </span>
              <span className="text-zinc-400 hidden md:inline">
                · Edita fragancias, agrega nuevos perfumes o cambia el logo desde tu galería
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => logoFileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-200 text-xs transition-colors border border-white/10"
                title="Cambiar la imagen del logo seleccionando una foto de tu dispositivo"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Cambiar Logo (Galería)</span>
              </button>
              <input 
                ref={logoFileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleLogoUpload}
                className="hidden" 
              />

              {customLogo && (
                <button
                  onClick={handleRemoveLogo}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  Quitar Logo
                </button>
              )}

              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nueva Fragancia</span>
              </button>

              <button
                onClick={handleResetCatalog}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs transition-colors"
                title="Restablecer los 528 perfumes de fábrica"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer Catálogo</span>
              </button>

              <button
                onClick={handleLogoutAdmin}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white text-xs transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          1. BARRA DE NAVEGACIÓN Y ENCABEZADO
          3 CLICKS EN "VESPER" PARA ABRIR ADMIN
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
            
            {/* Logotipo / Botón 3 Clics */}
            <div 
              onClick={handleVesperTripleClick}
              className="flex items-center gap-3 cursor-pointer select-none group active:scale-95 transition-transform shrink-0"
              title="Haz 3 clics seguidos en Vesper para abrir el modo administrador"
            >
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="Vesper Logo" 
                  className="h-10 w-auto max-w-[150px] object-contain rounded"
                />
              ) : (
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light text-white uppercase group-hover:text-[#c5a880] transition-colors">
                    Vesper
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-[#c5a880] uppercase -mt-1 font-medium">
                    Haute Parfumerie
                  </span>
                </div>
              )}
            </div>

            {/* Buscador en Tiempo Real */}
            <div className="flex-1 max-w-lg mx-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Buscar entre más de 500 perfumes (ej. Khamrah, Santal, Miel)..."
                  className="w-full bg-[#131318] border border-white/10 rounded-full py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a880]/70 focus:ring-1 focus:ring-[#c5a880]/30 transition-all"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3 pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-white p-0.5 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => {
                  setSelectedCategory('Colaboraciones Vesper');
                  setCurrentPage(1);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all whitespace-nowrap ${
                  selectedCategory === 'Colaboraciones Vesper'
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-[#f1dfb8]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="font-medium">Colaboraciones</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Especiales Vesper');
                  setCurrentPage(1);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all whitespace-nowrap ${
                  selectedCategory === 'Especiales Vesper'
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-[#f1dfb8]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="font-medium">Especiales</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Kits Vesper');
                  setCurrentPage(1);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all whitespace-nowrap ${
                  selectedCategory === 'Kits Vesper'
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-[#f1dfb8]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="font-medium">Kits Vesper</span>
              </button>

              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/30 text-xs text-rose-300 transition-all shadow-sm"
                title="Ver tus perfumes favoritos"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span className="hidden sm:inline font-medium">Favoritos</span>
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-black font-bold text-[10px] tabular-nums">
                  {favorites.length}
                </span>
              </button>

              <a
                href="/vesper-perfumeria.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-all whitespace-nowrap"
                title="Descargar o ver vesper-perfumeria.html"
              >
                <Code className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="font-medium">Single-File HTML</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE_DEFAULT}?text=${encodeURIComponent('Hola Vesper Perfumería (+57 323 217 5101), deseo consultar pedidos con pago contraentrega.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-all whitespace-nowrap shadow-sm shadow-[#c5a880]/20"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">+57 323 217 5101</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================
          HERO EDITORIAL & 2. BADGES SUPERIORES ACTUALIZADOS
      ======================================================== */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/vesper_hero_perfume_1790883545239.jpg" 
            alt="Vesper Parfums Colección 2026"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-3 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#c5a880]" />
            <span>Colección Exclusiva & Perfumería Árabe</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide max-w-3xl mx-auto leading-tight">
            El arte del aroma capturado en su máxima expresión
          </h1>

          <p className="mt-3 text-zinc-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Catálogo completo de fragancias de autor, casas nicho y lanzamientos árabes con paginación de alta velocidad.
          </p>

          {/* 2. BADGES EXACTOS SOLICITADOS EN EL ENCABEZADO */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CreditCard className="w-4 h-4 text-[#c5a880]" />
              <span className="font-medium">Pagos contraentrega</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Droplets className="w-4 h-4 text-[#c5a880]" />
              <span className="font-medium text-[#f1dfb8]">500+ Perfumes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Truck className="w-4 h-4 text-[#c5a880]" />
              <span className="font-medium">Envíos gratis a Bogotá</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span className="font-medium text-[#f1dfb8]">Envíos a todo Colombia</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. CATEGORÍAS EXACTAS & CONTROLES DE PÁGINA
          "Todos", "Hombre", "Mujer", "Unisex", "Árabes / Nichos"
      ======================================================== */}
      <section className="sticky top-20 z-30 bg-[#09090b]/95 backdrop-blur-md border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Pestañas exactas */}
            <div className="flex items-center gap-1.5 p-1 bg-[#131318] rounded-xl border border-white/5 overflow-x-auto max-w-full">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#c5a880] text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                onClick={() => {
                  setSelectedCategory('Favoritos');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all border border-rose-500/20 ${
                  selectedCategory === 'Favoritos'
                    ? 'bg-rose-500 text-black shadow-sm font-bold'
                    : 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${selectedCategory === 'Favoritos' ? 'fill-black' : 'fill-rose-400'}`} />
                <span>Favoritos</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  selectedCategory === 'Favoritos' ? 'bg-black text-rose-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {favorites.length}
                </span>
              </button>
            </div>

            {/* Selectores */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end overflow-x-auto text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span>Mostrar:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-[#131318] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a880]"
                >
                  <option value={24}>24 por pág.</option>
                  <option value={12}>12 por pág.</option>
                  <option value={48}>48 por pág.</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#131318] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* ========================================================
               1. PAGINACIÓN INTEGRADA AL LADO DEL CONTEO
          ======================================================== */}
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-[#c5a880] tabular-nums">
                Mostrando {filteredPerfumes.length} fragancias (Página {currentPage} de {totalPages})
              </span>

              {/* Controles de paginación directos al lado */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 px-2 rounded border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-0.5"
                    title="Página Anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ant</span>
                  </button>

                  {/* Números compactos */}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <button
                          key={p}
                          onClick={() => changePage(p)}
                          className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                            currentPage === p 
                              ? 'bg-[#c5a880] text-black font-bold shadow' 
                              : 'border border-white/10 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                      return <span key={p} className="text-zinc-600 px-0.5">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 px-2 rounded border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-0.5"
                    title="Página Siguiente"
                  >
                    <span className="hidden sm:inline">Sig</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-[11px] text-zinc-500 hidden sm:inline">
              Acceso admin: 3 clics en &ldquo;Vesper&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CATÁLOGO GRID
      ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Banner descriptivo de la sección / categoría activa */}
        {(() => {
          const info = getCategoryInfo(selectedCategory);
          return (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#14141a] via-[#101015] to-[#14141a] border border-[#c5a880]/25 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#c5a880]/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse"></span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                      {info.badge}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-wide">
                    {info.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 max-w-3xl leading-relaxed">
                    {info.desc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#f1dfb8] font-medium shadow-sm">
                    {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'fragancia' : 'fragancias'}
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {paginatedPerfumes.length === 0 ? (
          <div className="text-center py-20 bg-[#111116] border border-white/5 rounded-2xl p-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-white font-light">No encontramos fragancias</h3>
            <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
              Prueba con otros términos de búsqueda o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setCurrentPage(1);
              }}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#c5a880] text-black text-xs font-semibold hover:bg-[#d8bd95] transition-all"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedPerfumes.map((perfume, idx) => {
              const isFav = favorites.includes(perfume.id);

              return (
                <div
                  key={perfume.id}
                  onClick={() => setActiveModalPerfume(perfume)}
                  style={{ animationDelay: `${(idx % 24) * 35}ms` }}
                  className="animate-fade-in-slide-up group relative bg-[#111116] border border-white/5 hover:border-[#c5a880]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer"
                >
                  {/* Botones Admin */}
                  {isAdmin && (
                    <div className="absolute top-2 right-12 z-20 flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-lg border border-[#c5a880]/40">
                      <button
                        onClick={(e) => handleOpenEditModal(perfume, e)}
                        className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 text-[10px] font-semibold rounded transition-colors flex items-center gap-1"
                        title="Editar fragancia"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteProduct(perfume.id, perfume.name, e)}
                        className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-[10px] font-semibold rounded transition-colors flex items-center gap-1"
                        title="Eliminar fragancia"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Borrar</span>
                      </button>
                    </div>
                  )}

                  {/* Imagen */}
                  <div className="relative h-64 bg-gradient-to-b from-[#181820] to-[#0d0d10] flex items-center justify-center p-6 overflow-hidden">
                    <img 
                      src={perfume.image} 
                      alt={`${perfume.brand} - ${perfume.name}`}
                      className="w-full h-full object-cover object-center rounded-lg opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[#c5a880] backdrop-blur-md z-10">
                      {perfume.status}
                    </span>

                    <button
                      onClick={(e) => toggleFavorite(perfume.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-md transition-all z-10 ${
                        isFav 
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-md' 
                          : 'bg-black/60 hover:bg-black/80 border-white/10 text-zinc-400 hover:text-rose-400'
                      }`}
                      title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Datos del producto */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="uppercase tracking-widest text-[#c5a880] font-semibold">
                          {perfume.brand}
                        </span>
                        <span className="text-zinc-500 text-[10px]">
                          {perfume.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#c5a880] transition-colors leading-snug">
                        {perfume.name}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-1">
                        {perfume.family} · <span className="text-zinc-500">{perfume.concentration}</span>
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs">
                        <div className="flex items-baseline gap-2">
                          <span className="text-zinc-500 w-14 shrink-0 text-[10px] uppercase tracking-wider font-medium">Salida:</span>
                          <span className="text-zinc-300 truncate">{(perfume.pyramid?.salida || []).slice(0, 2).join(', ')}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-zinc-500 w-14 shrink-0 text-[10px] uppercase tracking-wider font-medium">Corazón:</span>
                          <span className="text-zinc-300 truncate">{(perfume.pyramid?.corazon || []).slice(0, 2).join(', ')}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-zinc-500 w-14 shrink-0 text-[10px] uppercase tracking-wider font-medium">Fondo:</span>
                          <span className="text-zinc-300 truncate">{(perfume.pyramid?.fondo || []).slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="flex items-baseline justify-between mb-3.5">
                        <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                          {perfume.volume}
                        </span>
                        <span className="font-serif text-2xl text-white font-medium tabular-nums">
                          ${perfume.price} <span className="text-xs font-sans text-zinc-400 font-normal">USD</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalPerfume(perfume);
                          }}
                          className="w-full py-2 px-3 text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors border border-white/5 text-center"
                        >
                          Ver detalles
                        </button>

                        <a
                          href={getWhatsAppLink(perfume)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2 px-3 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8bd95] rounded-lg transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Contraentrega</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Paginación Inferior */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <div className="text-xs text-zinc-500">
              Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, filteredPerfumes.length)} - {Math.min(currentPage * itemsPerPage, filteredPerfumes.length)} de {filteredPerfumes.length} fragancias
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => changePage(pageNumber)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        currentPage === pageNumber
                          ? 'bg-[#c5a880] text-black font-semibold shadow-sm'
                          : 'border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 3 || 
                  pageNumber === currentPage + 3
                ) {
                  return <span key={pageNumber} className="text-zinc-600 px-1">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          1. SECCIÓN: COLABORACIONES VESPER
      ======================================================== */}
      <section id="colaboracionesVesper" className="relative py-16 bg-gradient-to-b from-[#09090b] via-[#141218] to-[#09090b] border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#c5a880] font-semibold block mb-2">
              Haute Parfumerie · Ediciones de Autor
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-wide">
              Colaboraciones Vesper
            </h2>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
              Obras maestras creadas en coautoría con ateliers históricos de Grasse, perfumistas de Milán y maestros del Oud en los Emiratos Árabes. Frascos de colección y tirajes limitados numerados a mano.
            </p>
          </div>

          {/* Grid de Colaboraciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kitsList
              .filter(k => k.type === 'collabs')
              .map((kit, idx) => {
                const waLink = `https://wa.me/${WHATSAPP_PHONE_DEFAULT}?text=${encodeURIComponent(
                  `Hola Vesper Perfumería (+57 323 217 5101), deseo ordenar la Colaboración Exclusiva:\n\n*${kit.title}*\n${kit.subtitle}\nPrecio: $${kit.price} USD.\n\n¿Tienen unidades disponibles con pago contraentrega? Gracias.`
                )}`;

                return (
                  <div
                    key={kit.id}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className="animate-fade-in-slide-up group bg-[#111116] border border-white/10 hover:border-[#c5a880]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                  >
                    <div className={`relative p-6 bg-gradient-to-b ${kit.gradient} border-b border-white/5`}>
                      <span className="inline-block px-2.5 py-1 rounded bg-black/60 border border-[#c5a880]/40 text-[10px] text-[#f1dfb8] font-semibold uppercase tracking-wider backdrop-blur-md mb-3">
                        {kit.badge}
                      </span>
                      <h3 className="font-serif text-2xl text-white font-medium group-hover:text-[#f1dfb8] transition-colors">
                        {kit.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 font-light">
                        {kit.subtitle}
                      </p>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                          {kit.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                          <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold block">Contenido del Set:</span>
                          {kit.items.map((it, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0"></span>
                              <span>{it}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase text-zinc-500 line-through block">${kit.originalPrice} USD</span>
                          <div className="font-serif text-2xl text-white font-medium">
                            ${kit.price} <span className="text-xs font-sans text-zinc-400 font-light">USD</span>
                          </div>
                        </div>

                        <a 
                          href={waLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Pedir Colaboración</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* ========================================================
          2. SECCIÓN: ESPECIALES DE VESPER
      ======================================================== */}
      <section id="especialesVesper" className="relative py-16 bg-gradient-to-b from-[#09090b] via-[#101016] to-[#09090b] border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#c5a880] font-semibold block mb-2">
              Discovery Sets & Accesorios Exclusivos
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-wide">
              Especiales de Vesper
            </h2>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
              Kits de descubrimiento para explorar fragancias icónicas, cofres de regalo con empaque de lujo y accesorios en piel italiana para amantes del perfume.
            </p>
          </div>

          {/* Grid de Especiales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kitsList
              .filter(k => k.type !== 'collabs')
              .map((kit, idx) => {
                const waLink = `https://wa.me/${WHATSAPP_PHONE_DEFAULT}?text=${encodeURIComponent(
                  `Hola Vesper Perfumería (+57 323 217 5101), deseo ordenar el Especial Vesper:\n\n*${kit.title}*\n${kit.subtitle}\nPrecio Catálogo: $${kit.price} USD.\n\n¿Tienen unidades disponibles con pago contraentrega? Gracias.`
                )}`;

                return (
                  <div
                    key={kit.id}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className="animate-fade-in-slide-up group bg-[#111116] border border-white/10 hover:border-[#c5a880]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                  >
                    <div className={`relative p-6 bg-gradient-to-b ${kit.gradient} border-b border-white/5`}>
                      <span className="inline-block px-2.5 py-1 rounded bg-black/60 border border-[#c5a880]/40 text-[10px] text-[#f1dfb8] font-semibold uppercase tracking-wider backdrop-blur-md mb-3">
                        {kit.badge}
                      </span>
                      <h3 className="font-serif text-2xl text-white font-medium group-hover:text-[#f1dfb8] transition-colors">
                        {kit.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 font-light">
                        {kit.subtitle}
                      </p>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                          {kit.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                          <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold block">Contenido del Set:</span>
                          {kit.items.map((it, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0"></span>
                              <span>{it}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase text-zinc-500 line-through block">${kit.originalPrice} USD</span>
                          <div className="font-serif text-2xl text-white font-medium">
                            ${kit.price} <span className="text-xs font-sans text-zinc-400 font-light">USD</span>
                          </div>
                        </div>

                        <a 
                          href={waLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Pedir Especial</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* ========================================================
          DRAWER / MODAL: FAVORITOS GUARDADOS EN LOCALSTORAGE
      ======================================================== */}
      {isFavoritesDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
          onClick={() => setIsFavoritesDrawerOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-[#111116] h-full flex flex-col border-l border-white/10 shadow-2xl relative p-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <div>
                  <h3 className="font-serif text-2xl text-white font-medium">Mis Favoritos</h3>
                  <span className="text-[11px] text-zinc-400 block -mt-0.5">Guardado en tu navegador ({favorites.length})</span>
                </div>
              </div>
              <button 
                onClick={() => setIsFavoritesDrawerOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {favorites.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  <Heart className="w-12 h-12 mx-auto mb-3 stroke-zinc-600 text-zinc-600" />
                  <p className="text-sm text-zinc-300 font-medium">Aún no tienes perfumes en favoritos</p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">Haz clic en el corazón de cualquier tarjeta para guardarla en tu lista personal.</p>
                </div>
              ) : (
                perfumes
                  .filter(p => favorites.includes(p.id))
                  .map(perfume => (
                    <div 
                      key={perfume.id}
                      className="flex items-center justify-between gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-[#c5a880]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0" 
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-semibold">{perfume.brand}</span>
                          <h4 className="font-serif text-base text-white font-medium leading-tight">{perfume.name}</h4>
                          <span className="text-xs text-zinc-300 font-semibold">${perfume.price} USD</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveModalPerfume(perfume);
                            setIsFavoritesDrawerOpen(false);
                          }}
                          className="px-2.5 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                        >
                          Ver
                        </button>
                        <button 
                          onClick={(e) => toggleFavorite(perfume.id, e)}
                          className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Quitar de favoritos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider text-zinc-400">Total Favoritos</span>
                  <span className="font-serif text-2xl text-white font-medium">
                    ${perfumes.filter(p => favorites.includes(p.id)).reduce((acc, curr) => acc + curr.price, 0)} USD
                  </span>
                </div>

                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE_DEFAULT}?text=${encodeURIComponent(
                    `Hola Vesper Perfumería, deseo cotizar y ordenar mi lista de fragancias favoritas:\n\n${perfumes
                      .filter(p => favorites.includes(p.id))
                      .map(p => `• ${p.brand} - ${p.name} ($${p.price} USD)`)
                      .join('\n')}\n\n*Total Estimado:* $${perfumes.filter(p => favorites.includes(p.id)).reduce((acc, curr) => acc + curr.price, 0)} USD\n¿Tienen disponibilidad y pagos contraentrega para mi ciudad?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Pedir Favoritos por WhatsApp</span>
                </a>

                <button 
                  onClick={() => {
                    if (window.confirm("¿Vaciar tu lista de favoritos?")) {
                      setFavorites([]);
                      localStorage.removeItem('vesper_favorites');
                    }
                  }}
                  className="w-full py-1 text-[11px] text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  Vaciar lista de favoritos
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: LOGIN DE ADMINISTRADOR (3 CLICKS EN VESPER)
      ======================================================== */}
      {isAdminLoginOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
          onClick={() => setIsAdminLoginOpen(false)}
        >
          <div 
            className="relative w-full max-w-sm bg-[#131318] border border-[#c5a880]/40 rounded-2xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] mx-auto flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-white font-light">Acceso Administrativo</h3>
              <p className="text-xs text-zinc-400 mt-1">Introduce la clave de acceso a Vesper</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">Contraseña Maestra</label>
                <input 
                  type="password" 
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Introduce la contraseña..."
                  required
                  autoFocus
                  className="w-full bg-[#1b1b22] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
                />
                {loginError && (
                  <p className="text-rose-400 text-xs mt-1.5">Contraseña incorrecta. Inténtalo de nuevo.</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminLoginOpen(false)}
                  className="w-1/2 py-2 px-3 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 px-3 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-colors"
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDITAR / CREAR FRAGANCIA
      ======================================================== */}
      {isFormModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          onClick={() => setIsFormModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#111116] border border-[#c5a880]/40 rounded-2xl shadow-2xl overflow-hidden text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <h3 className="font-serif text-2xl text-white font-light">
                  {editingPerfume ? `Editar: ${editingPerfume.name}` : 'Añadir Nueva Fragancia'}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Se guarda automáticamente en localStorage</p>
              </div>
              <button 
                onClick={() => setIsFormModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Nombre de la Fragancia *</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Casa / Marca *</label>
                  <input 
                    type="text" 
                    value={formData.brand} 
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    required 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Género / Categoría *</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  >
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Árabes / Nichos">Árabes / Nichos</option>
                    <option value="Colaboraciones Vesper">Colaboraciones Vesper</option>
                    <option value="Especiales Vesper">Especiales Vesper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Precio (USD) *</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    min="1" 
                    required 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Etiqueta / Estado</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  >
                    <option value="Más vendido">Más vendido</option>
                    <option value="Edición Nicho">Edición Nicho</option>
                    <option value="Lanzamiento Árabe">Lanzamiento Árabe</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Colección Privada">Colección Privada</option>
                    <option value="Tendencia">Tendencia</option>
                    <option value="Alta Gama">Alta Gama</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Familia Olfativa</label>
                  <input 
                    type="text" 
                    value={formData.family} 
                    onChange={e => setFormData({ ...formData, family: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Concentración</label>
                  <input 
                    type="text" 
                    value={formData.concentration} 
                    onChange={e => setFormData({ ...formData, concentration: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Volumen</label>
                  <input 
                    type="text" 
                    value={formData.volume} 
                    onChange={e => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold block">
                  Pirámide Olfativa (Separar notas por comas)
                </span>
                
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Notas de Salida:</label>
                  <input 
                    type="text" 
                    value={formData.salida} 
                    onChange={e => setFormData({ ...formData, salida: e.target.value })}
                    placeholder="ej. Canela, Nuez moscada, Bergamota" 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Notas de Corazón:</label>
                  <input 
                    type="text" 
                    value={formData.corazon} 
                    onChange={e => setFormData({ ...formData, corazon: e.target.value })}
                    placeholder="ej. Dátiles, Praliné, Iris" 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Notas de Fondo:</label>
                  <input 
                    type="text" 
                    value={formData.fondo} 
                    onChange={e => setFormData({ ...formData, fondo: e.target.value })}
                    placeholder="ej. Oud, Vainilla Bourbon, Sándalo" 
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">URL de Imagen</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/src/assets/images/... o URL web" 
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1 font-medium">Descripción</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#181820] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#c5a880]" 
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs transition-colors shadow-lg"
                >
                  Guardar Fragancia
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL DETALLE PERFUME
      ======================================================== */}
      {activeModalPerfume && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center"
          onClick={() => setActiveModalPerfume(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left my-8 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPerfume(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-44 sm:h-52 bg-gradient-to-r from-black via-[#16161e] to-black overflow-hidden flex items-center px-6 sm:px-8 border-b border-white/10">
              <img 
                src={activeModalPerfume.image} 
                alt={activeModalPerfume.name}
                className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  {activeModalPerfume.brand} · {activeModalPerfume.category}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                  {activeModalPerfume.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-zinc-400">
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                    {activeModalPerfume.concentration}
                  </span>
                  <span>{activeModalPerfume.family}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400 font-medium">{activeModalPerfume.status}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">Narrativa Olfativa</h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {activeModalPerfume.description}
                </p>
              </div>

              <div className="bg-black/50 border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                    Pirámide Olfativa Completa
                  </h4>
                  <span className="text-[10px] text-zinc-500">Notas de formulación</span>
                </div>

                <div className="border-l-2 border-[#c5a880]/60 pl-3.5">
                  <div className="text-[11px] text-zinc-400 font-medium">Notas de Salida (Primeros 15 min)</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(activeModalPerfume.pyramid?.salida || []).map((nota, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-200">
                        {nota}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-l-2 border-[#c5a880] pl-3.5">
                  <div className="text-[11px] text-zinc-400 font-medium">Notas de Corazón (2 a 6 horas)</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(activeModalPerfume.pyramid?.corazon || []).map((nota, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-200">
                        {nota}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-l-2 border-[#876c48] pl-3.5">
                  <div className="text-[11px] text-zinc-400 font-medium">Notas de Fondo (+8 horas)</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(activeModalPerfume.pyramid?.fondo || []).map((nota, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-200">
                        {nota}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block mb-0.5">Longevidad estimada</span>
                  <span className="text-white font-medium text-sm">{activeModalPerfume.longevity}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block mb-0.5">Estela / Sillage</span>
                  <span className="text-white font-medium text-sm">{activeModalPerfume.sillage}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Precio catálogo</span>
                <div className="font-serif text-3xl text-white font-medium">
                  ${activeModalPerfume.price} <span className="text-sm font-sans text-zinc-400 font-normal">USD</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalPerfume(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cerrar
                </button>

                <a
                  href={getWhatsAppLink(activeModalPerfume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#c5a880] hover:bg-[#d8bd95] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Pedir Contraentrega</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          PIE DE PÁGINA
      ======================================================== */}
      <footer className="border-t border-white/5 bg-[#070709] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-zinc-500">
          <div>
            <span className="font-serif text-xl tracking-[0.2em] font-light text-white uppercase">
              Vesper Perfumería
            </span>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              Alta perfumería, colecciones nicho y fragancias árabes con pagos contraentrega en toda Colombia.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/vesper-perfumeria.html" target="_blank" className="hover:text-[#c5a880] transition-colors">
              Descargar Archivo HTML
            </a>
            <span>·</span>
            <span>Acceso Admin: 3 Clics en Vesper</span>
            <span>·</span>
            <span>© 2026 Vesper Parfums</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
