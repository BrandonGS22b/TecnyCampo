import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

interface PhotoSphere360ViewerProps {
    imageUrl: string;
    height?: string;
    className?: string;
}

export default function PhotoSphere360Viewer({ 
    imageUrl, 
    height = '500px',
    className = '' 
}: PhotoSphere360ViewerProps) {
    const viewerContainerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Viewer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!viewerContainerRef.current) return;

        try {
            // Destroy previous viewer instance if exists
            if (viewerRef.current) {
                viewerRef.current.destroy();
            }

            // Create new viewer instance
            viewerRef.current = new Viewer({
                container: viewerContainerRef.current,
                panorama: imageUrl,
                navbar: [
                    'zoom',
                    'move',
                    'fullscreen',
                ],
                defaultZoomLvl: 50,
                mousewheel: true,
                mousemove: true,
                touchmoveTwoFingers: true,
                loadingTxt: 'Cargando imagen 360°...',
                size: {
                    width: '100%',
                    height: height,
                },
            });

            // Event listeners
            viewerRef.current.on('ready', () => {
                setLoading(false);
                setError(false);
            });

            viewerRef.current.on('error', () => {
                setLoading(false);
                setError(true);
            });

        } catch (err) {
            console.error('Error initializing Photo Sphere Viewer:', err);
            setError(true);
            setLoading(false);
        }

        // Cleanup on unmount
        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [imageUrl, height]);

    return (
        <div className={`relative ${className}`}>
            {loading && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10"
                    style={{ height }}
                >
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-3"></div>
                        <p className="text-gray-600 font-semibold">Cargando vista 360°...</p>
                    </div>
                </div>
            )}
            
            {error && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg z-10"
                    style={{ height }}
                >
                    <div className="text-center p-6">
                        <p className="text-red-600 font-semibold text-lg mb-2">⚠️ Error al cargar imagen 360°</p>
                        <p className="text-gray-600 text-sm">Por favor, intenta de nuevo más tarde</p>
                    </div>
                </div>
            )}

            <div 
                ref={viewerContainerRef} 
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ height }}
            />
            
            {!loading && !error && (
                <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600">
                        💡 <strong>Tip:</strong> Arrastra para rotar • Rueda del mouse para zoom • Haz clic en pantalla completa para mejor experiencia
                    </p>
                </div>
            )}
        </div>
    );
}
