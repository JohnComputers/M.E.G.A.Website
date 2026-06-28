import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DownloadClient } from "@/components/DownloadClient";

export const metadata = {
  title: "Download",
  robots: { index: false, follow: false },
};

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Suspense
          fallback={
            <div className="shell flex min-h-[70vh] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
            </div>
          }
        >
          <DownloadClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
