import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeftIcon,
    MapPinIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassPlusIcon,
    ArrowsPointingOutIcon,
    EyeIcon,
    CalendarIcon,
    InformationCircleIcon,
    CheckBadgeIcon,
    GlobeAmericasIcon,
    PlayIcon
} from '@heroicons/react/24/solid';
import PhotoSphere360Viewer from '../../../shared/components/PhotoSphere360Viewer';

export default function PropertyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [selected360Index, setSelected360Index] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const touchStartLB = useRef<number | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProperty(data);
                }
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
                    <p className="text-xl font-bold text-gray-600 animate-pulse">Cargando detalles de la propiedad...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
                    <div className="text-6xl mb-4">🏜️</div>
                    <h2 className="text-3xl font-black text-gray-800 mb-4">Propiedad no encontrada</h2>
                    <p className="text-gray-600 mb-8">Lo sentimos, la propiedad que buscas no existe o ha sido removida.</p>
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                        Explorar otras Propiedades
                    </button>
                </div>
            </div>
        );
    }

    // Combine all media types for the gallery
    const allMedia = [
        ...(property.media?.images || []).map((url: string) => ({ url, type: 'image' })),
        ...(property.media?.images360 || []).map((url: string) => ({ url, type: 'image360' })),
        ...(property.media?.videos || []).map((url: string) => ({ url, type: 'video' }))
    ];

    // Lightbox Navigation
    const nextLightboxMedia = () => {
        setLightboxIndex((prev) => (prev + 1) % allMedia.length);
    };

    const prevLightboxMedia = () => {
        setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    // Slider Navigation
    const prevSliderMedia = () => {
        const index = (selectedMedia - 1 + allMedia.length) % allMedia.length;
        handleMediaChange(index);
    };

    const nextSliderMedia = () => {
        const index = (selectedMedia + 1) % allMedia.length;
        handleMediaChange(index);
    };

    const handleMediaChange = (index: number) => {
        setSelectedMedia(index);
        if (scrollRef.current) {
            isScrollingRef.current = true;
            scrollRef.current.scrollTo({
                left: scrollRef.current.clientWidth * index,
                behavior: 'smooth'
            });
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 500);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (isScrollingRef.current) return;
        const container = e.currentTarget;
        const index = Math.round(container.scrollLeft / container.clientWidth);
        if (index !== selectedMedia) {
            setSelectedMedia(index);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleTouchStartLB = (e: React.TouchEvent) => {
        touchStartLB.current = e.targetTouches[0].clientX;
    };

    const handleTouchEndLB = (e: React.TouchEvent) => {
        if (touchStartLB.current === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartLB.current - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextLightboxMedia();
            } else {
                prevLightboxMedia();
            }
        }
        touchStartLB.current = null;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            {/* Lightbox Modal with Zoom Effect */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[5000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onTouchStart={handleTouchStartLB}
                    onTouchEnd={handleTouchEndLB}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition z-10 text-white shadow-2xl"
                    >
                        <XMarkIcon className="w-8 h-8" />
                    </button>

                    {/* Navigation Arrows */}
                    {allMedia.length > 1 && (
                        <>
                            <button
                                onClick={prevLightboxMedia}
                                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition z-10 text-white shadow-2xl backdrop-blur-md"
                            >
                                <ChevronLeftIcon className="w-10 h-10" />
                            </button>
                            <button
                                onClick={nextLightboxMedia}
                                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition z-10 text-white shadow-2xl backdrop-blur-md"
                            >
                                <ChevronRightIcon className="w-10 h-10" />
                            </button>
                        </>
                    )}

                    {/* Content View */}
                    <div className="relative max-w-full max-h-[85vh] overflow-hidden rounded-xl shadow-2xl">
                        {allMedia[lightboxIndex].type === 'video' ? (
                            <video
                                src={allMedia[lightboxIndex].url}
                                controls
                                className="w-full h-auto max-h-[85vh]"
                                autoPlay
                            />
                        ) : (
                            <img
                                src={allMedia[lightboxIndex].url}
                                alt="Imagen ampliada"
                                className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-500 hover:scale-150 cursor-zoom-in"
                                style={{ transformOrigin: 'center center' }}
                            />
                        )}

                        {allMedia[lightboxIndex].type === 'image360' && (
                            <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-black shadow-2xl animate-pulse flex items-center gap-2">
                                <GlobeAmericasIcon className="w-6 h-6" />
                                🌐 VISTA 360°
                            </div>
                        )}
                        {allMedia[lightboxIndex].type === 'video' && (
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-black shadow-2xl">
                                📹 VIDEO TOUR
                            </div>
                        )}
                    </div>

                    {/* Media Counter */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-lg font-bold border border-white/20">
                        {lightboxIndex + 1} / {allMedia.length}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4">
                {/* Upper Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold group transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Catálogo</span>
                    </button>

                    <div className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                        <span>ID: {property._id}</span>
                        <div className={`px-3 py-1 rounded-lg ${property.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {property.status === 'published' ? '✨ Publicado' : '⏳ Pendiente'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column - Gallery, Header, Technical Sections */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* 1. Main Media Gallery */}
                        <div className="relative group">
                            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white transition-all transform group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative">

                                {/* Desktop Arrows */}
                                {allMedia.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevSliderMedia(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                        >
                                            <ChevronLeftIcon className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextSliderMedia(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                        >
                                            <ChevronRightIcon className="w-8 h-8" />
                                        </button>
                                    </>
                                )}

                                <div
                                    ref={scrollRef}
                                    onScroll={handleScroll}
                                    className="relative aspect-video overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth scrollbar-hide bg-gray-900"
                                >
                                    {allMedia.map((media, idx) => (
                                        <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative">
                                            {media.type === 'video' ? (
                                                <video
                                                    src={media.url}
                                                    controls
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full relative cursor-zoom-in group/main"
                                                    onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                                                >
                                                    <img
                                                        src={media.url || '/placeholder-property.jpg'}
                                                        alt={`${property.title} - ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover/main:bg-black/10 transition-colors flex items-center justify-center">
                                                        <MagnifyingGlassPlusIcon className="w-20 h-20 text-white opacity-0 group-hover/main:opacity-100 transition-all transform scale-50 group-hover/main:scale-100" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Overlay Badges */}
                                            {media.type === 'image360' && (
                                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-2xl animate-pulse z-10">
                                                    <GlobeAmericasIcon className="w-5 h-5" />
                                                    VISTA 360°
                                                </div>
                                            )}
                                            {media.type === 'video' && (
                                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-2xl z-10">
                                                    <PlayIcon className="w-5 h-5" />
                                                    VIDEO
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Price and Title Overlay (Mobile only) */}
                                <div className="absolute bottom-4 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden pointer-events-none z-10">
                                    <h1 className="text-white text-2xl font-black mb-1 leading-tight">{property.title}</h1>
                                    <p className="text-yellow-400 font-black text-xl">{formatPrice(property.price)}</p>
                                </div>

                                {/* Slide Counter dots */}
                                {allMedia.length > 1 && (
                                    <div className="absolute bottom-4 right-6 z-20 flex gap-1.5 md:hidden">
                                        {allMedia.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-all ${selectedMedia === idx ? 'bg-yellow-400 w-4' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails Strip */}
                            {allMedia.length > 1 && (
                                <div className="flex gap-3 p-4 bg-gray-50/50 backdrop-blur-md overflow-x-auto scrollbar-hide">
                                    {allMedia.map((media, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleMediaChange(idx)}
                                            className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all transform ${selectedMedia === idx ? 'border-green-600 scale-105 shadow-xl rotate-1' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-95'
                                                }`}
                                        >
                                            {media.type === 'video' ? (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    <PlayIcon className="w-10 h-10 text-white opacity-80" />
                                                    <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-[8px] px-1 rounded">VID</div>
                                                </div>
                                            ) : (
                                                <img src={media.url} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                                            )}

                                            {media.type === 'image360' && (
                                                <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                                                    <span className="text-white font-black text-[10px]">360°</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 2. Title & Basic Info Section */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 lg:p-10 border border-gray-100">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className={`px-4 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-wider ${property.propertyType === 'finca' ? 'bg-yellow-500' : property.propertyType === 'parcela' ? 'bg-green-500' : 'bg-blue-500'
                                    } shadow-md`}>
                                    {property.propertyType}
                                </div>
                                <div className="flex items-center text-gray-500 font-bold text-sm bg-gray-100 px-4 py-1.5 rounded-full">
                                    <MapPinIcon className="w-4 h-4 mr-1.5 text-green-600" />
                                    {property.location.municipality}, {property.location.department}
                                </div>
                            </div>

                            <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6 leading-[1.1]">
                                {property.title}
                            </h1>

                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line border-t pt-8 mt-4 font-medium">
                                {property.description || 'Esta propiedad ha sido cargada recientemente y estamos trabajando en una descripción detallada para brindarte la mejor experiencia.'}
                            </p>
                        </div>

                        {/* 3. Technical Sections Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Terrain Characteristics Section */}
                            <TechnicalCard title="Ubicación y Entorno" icon="🚩" color="bg-orange-100/50 text-orange-700">
                                <TechItem label="Vereda / Sector" value={property.location.vereda} />
                                <TechItem label="Distancia al Pueblo" value={property.location.distanceToTown ? `${property.location.distanceToTown} km` : 'Muy cerca'} />
                                <TechItem label="Tipo de Acceso" value={property.location.roadAccess} capitalize />
                                <TechItem label="Vía Principal" value={property.location.roadAccess?.toLowerCase().includes('paviment') ? 'Pavimentada' : 'Destapada'} />
                                <TechItem label="Bosques / Reservas" value={property.forestPercentage ? `${property.forestPercentage}%` : 'N/A'} />
                                <TechItem label="Rastrojos" value={property.reservePercentage ? `${property.reservePercentage}%` : 'N/A'} />
                            </TechnicalCard>

                            {/* Soil and Land Section */}
                            <TechnicalCard title="Calidad del Terreno" icon="🌱" color="bg-green-100/50 text-green-700">
                                <TechItem label="Tipo de Suelo" value={property.soil?.types?.join(', ')} capitalize />
                                <TechItem label="Topografía" value={property.topography?.types?.join(', ')} capitalize />
                                <TechItem label="Uso de Suelos" value={property.useTypes?.join(', ')} capitalize />
                                <TechItem label="Calidad Pastos" value={property.pasture?.quality} capitalize />
                                <TechItem label="Tipos Pastos" value={property.pasture?.types?.join(', ')} capitalize />
                                <TechItem label="Altura (msnm)" value={property.topography?.elevation?.min ? `${property.topography.elevation.min}m - ${property.topography.elevation.max}m` : 'Consultar'} />
                            </TechnicalCard>

                            {/* Water and Utilities Section */}
                            <TechnicalCard title="Agua y Servicios" icon="💧" color="bg-blue-100/50 text-blue-700">
                                <TechItem label="Fuentes Hídricas" value={property.water?.sources?.join(', ')} capitalize />
                                <TechItem label="Agua Permanente" value={property.water?.yearRound ? 'Sí (Todo el año)' : 'Por temporadas'} />
                                <TechItem label="Electricidad" value={property.installations?.electricity ? 'Ya instalada' : 'Proyecto cercano'} />
                                <TechItem label="Infraestructura" value={property.installations?.infrastructure?.join(', ')} />
                            </TechnicalCard>

                            {/* Legal and Extras Section */}
                            <TechnicalCard title="Estado Legal" icon="📄" color="bg-indigo-100/50 text-indigo-700">
                                <TechItem label="Documentación" value={property.legal?.documentation?.replace('_', ' ')} capitalize />
                                <TechItem label="Tradición" value="Escritura al día" />
                                <TechItem label="Impuestos" value="Libre de gravamen" />
                                <TechItem label="Propietarios" value="Único dueño" />
                            </TechnicalCard>

                        </div>

                        {/* Crops Section (Tags Style) */}
                        {property.crops?.length > 0 && (
                            <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 underline decoration-green-500 underline-offset-8">
                                    🍎 Cultivos Existentes
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {property.crops.map((crop: string) => (
                                        <div key={crop} className="bg-green-50 border-2 border-green-100 px-6 py-3 rounded-2xl flex items-center gap-3 group hover:bg-green-600 transition-all cursor-default shadow-sm hover:shadow-green-200">
                                            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-lg border border-green-200 group-hover:scale-110 transition-transform">
                                                🪴
                                            </div>
                                            <span className="text-green-800 font-bold capitalize group-hover:text-white transition-colors">{crop}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 360° Images Section */}
                        {property.media?.images360?.length > 0 && (
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[2.5rem] shadow-2xl p-8 lg:p-10 border-2 border-purple-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                                        <GlobeAmericasIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">
                                            Vista Panorámica 360°
                                        </h3>
                                        <p className="text-sm text-purple-600 font-semibold">
                                            Explora la propiedad de forma interactiva
                                        </p>
                                    </div>
                                </div>

                                {/* Photo Sphere Viewer */}
                                <PhotoSphere360Viewer
                                    imageUrl={property.media.images360[selected360Index]}
                                    height="600px"
                                    className="mb-6"
                                />

                                {/* Thumbnail Selector for Multiple 360 Images */}
                                {property.media.images360.length > 1 && (
                                    <div className="mt-6">
                                        <p className="text-sm font-bold text-gray-700 mb-3">
                                            📸 Selecciona otra vista 360° ({property.media.images360.length} disponibles):
                                        </p>
                                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                                            {property.media.images360.map((img: string, idx: number) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setSelected360Index(idx)}
                                                    className={`relative flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all transform ${selected360Index === idx
                                                        ? 'border-purple-600 scale-105 shadow-2xl shadow-purple-500/50'
                                                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-95'
                                                        }`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Vista 360° ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                                                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                            <span className="text-purple-700 font-black text-sm">360° #{idx + 1}</span>
                                                        </div>
                                                    </div>
                                                    {selected360Index === idx && (
                                                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                                            ✓
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Right Column - Pricing Sidebar (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">

                            {/* 1. Main Conversion Card */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl p-8 lg:p-10 text-white relative overflow-hidden group">
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 transition-all duration-1000 group-hover:opacity-40"></div>
                                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-yellow-500 rounded-full blur-[80px] opacity-10"></div>

                                <div className="relative z-10 text-center">
                                    <p className="text-yellow-500 font-black tracking-[0.2em] text-xs uppercase mb-6 drop-shadow-lg">
                                        Precio Negociable
                                    </p>
                                    <div className="text-5xl lg:text-6xl font-black mb-4 drop-shadow-2xl">
                                        {formatPrice(property.price)}
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl inline-block border border-white/10 mb-10 shadow-inner">
                                        <span className="text-gray-300 font-medium">Por hectárea: </span>
                                        <span className="text-green-400 font-black">{formatPrice(property.pricePerHectare || 0)}</span>
                                    </div>

                                    {/* Stats grid within the card */}
                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center group/item hover:bg-white/10 transition">
                                            <ArrowsPointingOutIcon className="w-8 h-8 text-yellow-500 mb-2 transition-transform group-hover/item:scale-110" />
                                            <span className="text-2xl font-black">{property.area} ha</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Área Total</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center group/item hover:bg-white/10 transition">
                                            <EyeIcon className="w-8 h-8 text-green-500 mb-2 transition-transform group-hover/item:scale-110" />
                                            <span className="text-2xl font-black">{property.views}</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Visitas Hoy</span>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-4">
                                        <a
                                            href={`https://wa.me/573176677911?text=Hola LP Negocios, me interesa la propiedad: ${property.title} (ID: ${property._id}).`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-black rounded-3xl shadow-[0_15px_30px_rgba(234,179,8,0.3)] transition-all transform hover:scale-105 active:scale-95 group/btn"
                                        >
                                            <span className="text-xl">Contactar WhatsApp</span>
                                            <ArrowRightIcon className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>

                                        <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold pt-4">
                                            <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                                            GARANTÍA LP NEGOCIOS S.A.S
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Secondary Info Card (Date, etc) */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 flex items-center justify-between group overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-2 h-full bg-green-600 transition-all duration-300 group-hover:w-4"></div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center text-green-600">
                                        <CalendarIcon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Publicado hace</p>
                                        <p className="text-gray-900 font-black text-lg">
                                            {Math.floor((new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 3600 * 24))} días
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Estado</p>
                                    <p className="text-green-600 font-black text-lg">Activo</p>
                                </div>
                            </div>

                            {/* 3. Helper Note */}
                            <div className="bg-blue-50/50 rounded-[2rem] p-6 border-2 border-blue-100/50 flex gap-4">
                                <InformationCircleIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                                <p className="text-sm text-blue-800 font-medium italic">
                                    "¿Necesitas financiación? Consulta con nuestros asesores sobre opciones de crédito rural."
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Custom Animations CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .gradient-text { background: linear-gradient(to right, #22c55e, #16a34a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .gradient-text-secondary { background: linear-gradient(to right, #eab308, #ca8a04); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
}

// Technical Sub-Components
function TechnicalCard({ title, icon, color, children }: any) {
    return (
        <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 ${color.split(' ')[0]} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className={`w-12 h-12 flex items-center justify-center rounded-2xl ${color} shadow-sm group-hover:rotate-6 transition-transform`}>
                    {icon}
                </span>
                {title}
            </h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function TechItem({ label, value, capitalize }: any) {
    return (
        <div className="flex flex-col border-b border-gray-50 pb-2 group/item last:border-0">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 group-hover/item:text-green-600 transition-colors">
                {label}
            </span>
            <span className={`text-gray-900 font-bold ${capitalize ? 'capitalize' : ''}`}>
                {value || 'No especificado'}
            </span>
        </div>
    );
}

const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);
