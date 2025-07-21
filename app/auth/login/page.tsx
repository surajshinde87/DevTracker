'use client';

import LoginForm from '@/components/auth/LoginForm';
import StepsGuide from '@/components/auth/StepsGuide';


const Login = () => {
  return (
    <div className="min-h-screen lg:h-screen flex bg-white text-gray-800 dark:bg-[#27282a] dark:text-white transition-colors duration-500">
      
      {/* Left Side - Steps Guide */}
      <StepsGuide />

      {/* Right Side - Login Form */}
      <LoginForm/>
    </div>
  );
};

export default Login;
