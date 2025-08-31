import ProtectedLayout from '../(protected)/layout';

export default function ChallengesLayout({ children }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}