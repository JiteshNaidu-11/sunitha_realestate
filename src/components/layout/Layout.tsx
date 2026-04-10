import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Layout;
