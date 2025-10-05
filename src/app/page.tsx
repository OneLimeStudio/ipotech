import Image from "next/image";


export default function Home() {
  return (<>
    <section className="p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold ">Welcome</h1>
      <p>Your one-stop destination for everything IPO</p>
    </section>

    {/* <section className="p-6 bg-white sexDemon101">
      <Image
        src="/Taj-Mahal.jpg"
        alt ="Taj Mahal"
        width={600}
        height={400}
        className="rounded-x1 shadow"
      />

    </section> */}
  </>
  );
}
