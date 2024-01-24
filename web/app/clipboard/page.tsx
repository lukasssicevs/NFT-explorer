import ClipboardContainer from "@/src/components/Clipboard/ClipboardContainer";

export default function ClipboardPage() {
  return (
    <main className="flex flex-col items-center justify-between px-6 pt-24 lg:p-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-600 mb-4">
        Clipped NFTs
      </h1>
      <ClipboardContainer />
    </main>
  );
}
