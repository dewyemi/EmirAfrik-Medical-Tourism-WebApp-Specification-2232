import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = clsx(
    'bg-white rounded-lg shadow-sm border border-gray-200',
    paddingClasses[padding],
    hover && 'hover:shadow-md transition-shadow duration-200',
    className
  );

  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;