import { Button } from "@/components/UI/Button";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  Cpu,
  Pill,
  Settings,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

// Navbar Component
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Pill className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">CuraTech</span>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/signin">Login</Link>
          </Button>
          <Button size="lg" className="rounded-xl" asChild>
            <Link href="/dashboard/medication_schedule">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Cpu className="h-4 w-4" />
            Smart Healthcare Technology
          </span>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Health, <span className="text-primary">Perfectly Timed</span>
          </h1>

          <p className="mb-8 max-w-xl text-pretty text-lg text-muted-foreground">
            Experience the seamless integration of hardware and software for
            modern healthcare. CuraTech&apos;s smart pill dispenser ensures you
            never miss a dose with intelligent scheduling, real-time tracking,
            and automated alerts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-xl px-8 text-base"
              asChild
            >
              <Link href="/dashboard/medication_schedule">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl px-8 text-base"
              asChild
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>

        {/* Right Visual - Hardware Mockup */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-80 w-80 lg:h-96 lg:w-96">
            {/* Gradient Background */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 via-secondary to-primary/10" />

            {/* Central Device Mockup */}
            <div className="absolute inset-8 flex items-center justify-center rounded-2xl border border-border bg-card shadow-xl">
              <div className="flex flex-col items-center gap-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                  <Pill className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-card-foreground">
                    CuraTech Device
                  </p>
                  <p className="text-sm text-muted-foreground">ESP32 Powered</p>
                </div>
              </div>
            </div>

            {/* Floating Pills/Icons */}
            <div
              className="absolute -top-2 left-12 flex h-12 w-12 animate-bounce items-center justify-center rounded-xl bg-card shadow-lg"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <Pill className="h-6 w-6 text-primary" />
            </div>
            <div
              className="absolute -right-2 top-20 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl bg-card shadow-lg"
              style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
            >
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div
              className="absolute -bottom-2 right-16 flex h-12 w-12 animate-bounce items-center justify-center rounded-xl bg-card shadow-lg"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            >
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div
              className="absolute bottom-16 -left-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl bg-card shadow-lg"
              style={{ animationDelay: "1.5s", animationDuration: "3.2s" }}
            >
              <Cpu className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Data
const features = [
  {
    icon: Cpu,
    title: "Smart Hardware Integration",
    description:
      "Automatic detection of ESP32 modules with seamless connectivity. Your hardware and software work together flawlessly.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Set multiple alarms and doses per day with precision. Customize schedules to match your exact medication needs.",
  },
  {
    icon: Bell,
    title: "Real-Time Tracking",
    description:
      "Never miss a dose again. CuraTech automatically sends an instant email notification directly to your inbox exactly when it's time to take your medication, keeping your health schedule perfectly on track.",
  },
];

// Features Section Component
function FeaturesSection() {
  return (
    <section id="features" className="bg-card px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-card-foreground sm:text-4xl">
            Powerful Features for Better Health
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            CuraTech combines cutting-edge hardware with intuitive software to
            revolutionize how you manage your medications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-background p-8 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <feature.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Data
const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Insert the Physical Module",
    description:
      "Simply insert your CuraTech module into the device. The ESP32 microcontroller handles the rest automatically.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure on the Platform",
    description:
      "Use our intuitive web platform to set up your medications, dosages, and personalized schedules.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "CuraTech Handles the Rest",
    description:
      "Receive timely email reminders and keep your daily doses perfectly on track. Healthcare made simple.",
  },
];

// How It Works Section Component
function HowItWorksSection() {
  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Getting started with CuraTech is simple. Follow these three easy
            steps to take control of your medication management.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
               
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-1/2 bg-border md:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Step Number Badge */}
                <div className="relative z-10 mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-card shadow-lg">
                  <span className="text-xs font-bold text-primary">
                    {step.number}
                  </span>
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-8 w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
         
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Pill className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date().getFullYear()} CuraTech. All rights reserved.
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground">
          Smart Healthcare for a Better Tomorrow
        </p>
      </div>
    </footer>
  );
}

 
export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
