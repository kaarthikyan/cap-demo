import SignInForm from '@/components/auth/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HridhyaTech SignIn Page | HridhyaTech Dashboard',
  description: 'This is HridhyaTech Signin Page',
};

export default function SignIn() {
  return <SignInForm />;
}
