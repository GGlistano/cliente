import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import LoginPage from './components/LoginPage';
import MembersArea from './components/MembersArea';

interface UserData {
  name: string;
  phone: string;
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('memberUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('memberUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('memberUser');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Área de Membros</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <User className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <MembersArea />
    </div>
  );
}

export default App;
