import ProtectedLayout from '../(protected)/layout';

export default function AnalyticsLayout({ children }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}