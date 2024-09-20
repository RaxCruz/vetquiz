import HeroPage from "@/components/_ui/fuzzy";

export default function Home() {

  return (
    <section className="overflow-hidden" style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    }}>
      <HeroPage />
    </section>



  );
}
