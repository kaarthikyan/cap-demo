import SignUpForm from '@/components/auth/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HridhyaTech Sign-Up Page | HridhyaTech Dashboard',
  description: 'This is HridhyaTech Sign-Up Page',
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
