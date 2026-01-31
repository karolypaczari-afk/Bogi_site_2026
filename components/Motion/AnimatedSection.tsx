import React, { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'custom';
    customVariants?: Variants;
    once?: boolean;
    threshold?: number;
}

const animations: Record<string, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    animation = 'fadeUp',
    customVariants,
    once = true,
    threshold = 0.1,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        margin: "-100px" as const
    });

    const variants = customVariants || animations[animation];

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // Spring-like easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;

// Stagger container for list animations
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px 0px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger item for use inside StaggerContainer
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
    children,
    className = '',
    animation = 'fadeUp',
}) => {
    return (
        <motion.div
            variants={animations[animation]}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Parallax wrapper
interface ParallaxWrapperProps {
    children: ReactNode;
    className?: string;
    speed?: number; // 0.5 = half speed, 1 = normal, 2 = double
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
    children,
    className = '',
    speed = 0.5,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                willChange: 'transform',
            }}
            whileInView={{
                y: [0, -20 * speed],
            }}
            viewport={{ once: false }}
            transition={{
                duration: 0.8,
                ease: 'linear',
            }}
        >
            {children}
        </motion.div>
    );
};

// Hover tilt effect for cards
interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    tiltAmount = 5,
}) => {
    return (
        <motion.div
            className={className}
            whileHover={{
                rotateX: tiltAmount,
                rotateY: -tiltAmount,
                scale: 1.02,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
};
