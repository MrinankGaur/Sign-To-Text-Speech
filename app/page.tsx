import Translator from "@/app/components/Translator";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900">
          Breaking Barriers, One Gesture at a Time
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          This professional interface demonstrates the core functionality of our smart glove—translating captured sign language into text and audible speech in real time.
        </p>
        <Translator />
      </div>
    </main>
  );
}