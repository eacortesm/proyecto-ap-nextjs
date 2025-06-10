import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  variant = 'default',
  asChild = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };

  const finalClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      className: `${children.props.className || ''} ${finalClasses}`,
      ...props
    });
  }

  return (
    <button
      className={finalClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;