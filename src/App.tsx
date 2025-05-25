
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ConversationPage from './pages/ConversationPage';
import ResourcesPage from './pages/ResourcesPage';
import { ConversationProvider } from './context/ConversationContext';

import './styles/conversation.css';

function App() {
  return (
    <ConversationProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/conversation" element={<ConversationPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
           
          </main>
          <Footer />
        </div>
      </Router>
    </ConversationProvider>
  );
}

export default App;