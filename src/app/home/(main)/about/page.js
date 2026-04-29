"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import AdsSidebar from "@/app/components/ui/AdsSidebar";

export default function About() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground font-sans selection:bg-[--success-color] selection:text-background">
      <main className="relative min-h-screen">

        {/* ── MISSION & VISION ── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--primary)/10]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#191c1b] mb-4">
                Our <span className="text-primary">Core</span> Purpose
              </h2>
              <p className="text-[#3f4941] text-base sm:text-lg max-w-2xl mx-auto">
                Guided by a bold vision and unwavering mission.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
              {/* VISION */}
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-serif font-bold text-[#191c1b] mb-3">
                  VISION
                </h3>
                <blockquote className="text-sm sm:text-base text-[#555] italic leading-relaxed">
                  THE NEXT BIG THING ON WELLNESS AND HEALTH CARE DIRECT SELLING COMPANY
                </blockquote>
              </div>

              {/* MISSION */}
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-serif font-bold text-[#191c1b] mb-3">
                  MISSION
                </h3>
                <blockquote className="text-sm sm:text-base text-[#555] italic leading-relaxed">
                  DELIVER HEALTH CARE WELLNESS IN EVERY FAMILY AND COMMUNITY
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERS ── */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-xs font-bold text-[--primary] mb-10 tracking-[0.2em] uppercase">
              Trusted Partners
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-20 grayscale opacity-90 hover:grayscale-0 transition-all duration-500">
              <Image src="/images/logos/acsr.png" alt="ACSR" width={100} height={70} />
              <Image src="/images/logos/memo-ni-dok.png" alt="Memo Ni Dok" width={100} height={70} />
              <Image src="/images/logos/wcea.png" alt="WCEA" width={100} height={70} />
              <Image src="/images/logos/whea.jpeg" alt="WHEA" width={100} height={70} />
              <Image src="/images/logos/gaf-champ.png" alt="GAF Champ" width={100} height={70} />
            </div>
          </div>
        </section>

        {/* ── STORY (FLOATING CARD) ── */}
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-[var(--primary)/10]">
          <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl 
              px-6 sm:px-8 md:px-14 
              py-10 sm:py-12 md:py-14 
              text-center">

              <span className="text-[var(--primary)/80] font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-3 block">
                Our Journey
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#191c1b] leading-snug mb-6">
                Pioneering Wellness Through
                <span className="text-[--primary] italic"> Direct Selling</span>
              </h2>

              <div className="space-y-4 sm:space-y-5 text-[#3f4941] text-sm sm:text-base max-w-2xl mx-auto">
                <p>
                  We are transforming the wellness industry by combining cutting-edge health products
                  with the power of direct selling. Our network empowers entrepreneurs to bring
                  life-changing wellness solutions directly to families and communities.
                </p>

                <p>
                  <span className="font-semibold text-[#191c1b]">Global Reach:</span> Serving families worldwide through dedicated distributors.
                </p>

                <p>
                  <span className="font-semibold text-[#191c1b]">Proven Products:</span> Science-backed wellness solutions for every need.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 md:py-24 px-4 sm:px-6 bg-[var(--primary)/20]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#191c1b] mb-4">
              Ready to Transform Wellness?
            </h2>

            <p className="text-[#3f4941] text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Join our mission to deliver health and wellness to every family.
            </p>

            <button
              onClick={() => router.push("/home/signup")}
              className="bg-[--primary] px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:opacity-90 active:scale-95 transition-all duration-300"
            >
              Become a Member
            </button>
          </div>
        </section>

        {/* <AdsSidebar /> */}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-100 border-t border-zinc-200/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-8 py-10 max-w-7xl mx-auto text-sm">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-lg font-serif text-primary mb-1">
              World Council Executive Alliances
            </div>
            <p className="text-zinc-600 text-xs sm:text-sm">
              © World Council Executive Alliances. Built for the community.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
            {["Privacy Policy", "Terms of Service", "Contact Us", "Careers"].map((link) => (
              <a
                key={link}
                href={link === "Privacy Policy" ? "/privacy-policy.html" : link === "Terms of Service" ? "/terms-of-service.html" : "#"}
                className="text-zinc-600 hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-zinc-200/50 border-t border-zinc-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-2 text-xs sm:text-sm text-center md:text-left">
            Website designed & developed by{" "}
            <a
              href="https://www.facebook.com/profile.php?id=100063680607062"
              target="_blank"
              className="font-semibold text-[--primary] underline"
            >
              Bok Tech
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}