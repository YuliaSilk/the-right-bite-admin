import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}