import ProtectedLayout from '../(protected)/layout';

export default function DashboardLayout({ children }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
