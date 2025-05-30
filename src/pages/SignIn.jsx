import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ClerkSignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          redirectUrl="/"
        />
      </div>
    </div>
  );
}
