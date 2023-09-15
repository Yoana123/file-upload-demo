// app/page.tsx
import FileUploadForm from "@/components/FileUploadForm";

export default function Home() {
  return (
    <main className="flex flex-col">
      <FileUploadForm />
    </main>
  );
}
