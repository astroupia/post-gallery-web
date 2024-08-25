import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  show: boolean;
};

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show]);

  const animationClasses = isVisible
    ? "transform transition duration-500 ease-in-out translate-y-0 opacity-100"
    : "transform transition duration-500 ease-in-out -translate-y-full opacity-0";

  return (
    <div className={`fixed top-0 left-0 w-full p-4 ${animationClasses}`}>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <div className="text-center sm:text-left">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const showSuccess = () => {
	const [showToast, setShowToast] = useState(false);
  
	return (
	  <div>
		<button 
		  className="px-4 py-2 bg-blue-500 text-white" 
		  onClick={() => setShowToast(true)}
		>
		  Show Toast
		</button>
		<Toast 
		  message="This is a toast notification!" 
		  show={showToast} 
		/>
	  </div>
	);
  };

  export default showSuccess;