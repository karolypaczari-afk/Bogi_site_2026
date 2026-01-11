import React, { useState } from 'react';
import { generateImage } from '../../utils/gemini';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackPrompt: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, fallbackPrompt, className, ...props }) => {
  // Ensure src is a string before passing to state, as it might be inferred as string | Blob
  const [imgSrc, setImgSrc] = useState<string | undefined>(typeof src === 'string' ? src : undefined);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'generating' | 'error' | 'generated'>('loading');

  const handleError = async () => {
    if (status === 'generating' || status === 'generated') return;
    
    setStatus('generating');
    try {
      // Use Nano Banana Pro (gemini-3-pro-image-preview) via the utility
      const generatedUrl = await generateImage(fallbackPrompt, '1K');
      setImgSrc(generatedUrl);
      setStatus('generated');
    } catch (err) {
      console.error("Failed to generate fallback image", err);
      setStatus('error');
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ display: 'inline-block' }}>
       {/* Generating Overlay */}
       {status === 'generating' && (
         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 text-text-secondary animate-pulse">
           <i className="fas fa-magic text-2xl mb-2 text-accent"></i>
           <span className="text-[10px] font-bold uppercase tracking-widest">Generating AI Image...</span>
         </div>
       )}
       
       {/* Error State */}
       {status === 'error' && (
         <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100 text-text-muted">
           <i className="fas fa-image text-3xl opacity-20"></i>
         </div>
       )}

       <img 
         src={imgSrc} 
         alt={alt} 
         onError={handleError}
         onLoad={() => setStatus(status === 'generated' ? 'generated' : 'loaded')}
         className={`w-full h-full object-cover transition-opacity duration-500 ${status === 'generating' ? 'opacity-0' : 'opacity-100'}`}
         {...props}
       />
    </div>
  );
};

export default SmartImage;