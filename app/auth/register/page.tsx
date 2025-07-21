"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import StepsGuide from "@/components/auth/StepsGuide";


const Register = () => {
  

  return (
    <div className="min-h-screen lg:h-screen flex bg-white text-gray-800 dark:bg-[#27282a] dark:text-white transition-colors duration-500">
      
      {/* Left Side - Steps Guide Section */}
     <StepsGuide/>

      {/* Right Side - Signup Form */}
      <RegisterForm/>
    </div>
  );
};

export default Register;
