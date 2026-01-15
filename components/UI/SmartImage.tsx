import React from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackPrompt?: string; // Keep for backwards compatibility but unused
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default SmartImage;