import { ErrorBoundary } from "@/components/error-boundary";
import { MenuPage } from "@/components/menu/menu-page";

export default function Home() {
  return (
    <ErrorBoundary>
      <MenuPage />
    </ErrorBoundary>
  );
}

export const metadata = {
  title: "Mashgin Menu",
  description: "mashgin menu take home assignment",
};
