import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import Blog from './pages/Blog';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/:toolId" element={<ToolPage />} />
    </Routes>
  );
}
