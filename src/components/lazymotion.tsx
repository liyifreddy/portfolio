import { useEffect, useState, useRef, ReactNode } from 'react';

interface LazyMotionComponentProps {
  children: ReactNode;
  placeholder?: ReactNode;
  height?: string | number;
}

export const LazyMotionComponent = ({ 
  children, 
  placeholder = null,
  height = '100px'
}: LazyMotionComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder || <div style={{ height }}></div>}
    </div>
  );
};

export default LazyMotionComponent;