import React, { useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={`relative ${className} rounded-lg overflow-hidden shadow-lg bg-gray-100`} style={{ height }}>
            {loading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-3"></div>
                        <p className="text-gray-600 font-semibold">Cargando vista 360°...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
                    <div className="text-center p-6">
                        <p className="text-red-600 font-semibold text-lg mb-2">⚠️ Error al cargar imagen 360°</p>
                        <p className="text-gray-600 text-sm">Por favor, intenta de nuevo más tarde</p>
                    </div>
                </div>
            )}

            <ReactPhotoSphereViewer
                src={imageUrl}
                height={height}
                width="100%"
                onReady={() => {
                    setLoading(false);
                    setError(false);
                }}
                //@ts-ignore - The library types might be slightly behind the implementation for error events
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
                navbar={[
                    'zoom',
                    'move',
                    'fullscreen',
                ]}
                mousewheel={true}
                mousemove={true}
                touchmoveTwoFingers={true}
                loadingTxt="Cargando imagen 360°..."
            />

            {!loading && !error && (
                <div className="absolute bottom-4 left-0 right-0 text-center z-10 pointer-events-none">
                    <p className="text-xs text-white/80 bg-black/40 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                        💡 Arrastra para rotar • Mouse para zoom
                    </p>
                </div>
            )}
        </div>
    );
}
