import PublicHeader from "./PublicHeader/PublicHeader.jsx";
import PublicFooter from "./PublicFooter/PublicFooter.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="app">
      <PublicHeader />
      <main className="main">{children}</main>
      <PublicFooter />
    </div>
  );
}
