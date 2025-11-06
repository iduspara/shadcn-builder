"use client";

import {
  BlocksIcon,
  Heart,
  Code2,
  Zap,
  Users,
  Lightbulb,
  Target,
  ArrowRight,
  Github,
  Coffee,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";

// Real product logos as SVG components
const ReactLogo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="-10.5 -9.45 21 18.9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="uwu-hidden mt-4 mb-3 text-brand dark:text-brand-dark w-24 lg:w-28 self-center text-sm me-0 flex origin-center transition-all ease-in-out"
  >
    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

const NextjsLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 180"
    width="100%"
    height="100%"
  >
    <mask
      height="180"
      id=":r8:mask0_408_134"
      maskUnits="userSpaceOnUse"
      width="180"
      x="0"
      y="0"
      style={{ maskType: "alpha" }}
    >
      <circle cx="90" cy="90" fill="black" r="90"></circle>
    </mask>
    <g mask="url(#:r8:mask0_408_134)">
      <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#:r8:paint0_linear_408_134)"
      ></path>
      <rect
        fill="url(#:r8:paint1_linear_408_134)"
        height="72"
        width="12"
        x="115"
        y="54"
      ></rect>
    </g>
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id=":r8:paint0_linear_408_134"
        x1="109"
        x2="144.5"
        y1="116.5"
        y2="160.5"
      >
        <stop stopColor="white"></stop>
        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id=":r8:paint1_linear_408_134"
        x1="121"
        x2="120.799"
        y1="54"
        y2="106.875"
      >
        <stop stopColor="white"></stop>
        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
);

const ShadcnLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="100%"
    height="100%"
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="208"
      y1="128"
      x2="128"
      y2="208"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    ></line>
    <line
      x1="192"
      y1="40"
      x2="40"
      y2="192"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    ></line>
  </svg>
);

const TailwindLogo = () => (
  <svg
    viewBox="0 0 167 21"
    fill="none"
    className="h-5 text-black dark:text-white"
    width="100%"
    height="100%"
  >
    <path
      fill="currentColor"
      d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z"
    ></path>
    <path
      fill="currentColor"
      d="M51.547 8.688h-3v5.803c0 1.548 1.016 1.524 3 1.427v2.346c-4.015.483-5.611-.629-5.611-3.773V8.688H43.71V6.172h2.225V2.925l2.612-.774v4.021h2.998v2.516Zm11.43-2.516h2.61v12.092h-2.61v-1.741c-.92 1.28-2.346 2.055-4.233 2.055-3.288 0-6.021-2.78-6.021-6.36 0-3.603 2.733-6.36 6.021-6.36 1.886 0 3.313.774 4.233 2.032V6.172Zm-3.821 9.915c2.176 0 3.82-1.62 3.82-3.87 0-2.248-1.644-3.868-3.82-3.868-2.177 0-3.821 1.62-3.821 3.869s1.644 3.87 3.82 3.87ZM69.94 4.36a1.687 1.687 0 0 1-1.668-1.669c.002-.443.179-.868.491-1.18a1.662 1.662 0 0 1 2.354 0c.312.312.49.737.491 1.18 0 .895-.75 1.669-1.668 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612Zm5.635 0V.609h2.611v17.654H74.27ZM93.834 6.172h2.757l-3.797 12.092h-2.563l-2.516-8.15-2.539 8.15h-2.563L78.816 6.172h2.757l2.346 8.343 2.54-8.343h2.49l2.514 8.343 2.37-8.343ZM99.83 4.36c-.92 0-1.669-.774-1.669-1.669.002-.443.18-.868.492-1.18a1.661 1.661 0 0 1 2.354 0c.313.312.49.737.492 1.18 0 .895-.75 1.669-1.669 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612ZM110.52 5.858c2.708 0 4.643 1.838 4.643 4.982v7.423h-2.612v-7.158c0-1.838-1.064-2.804-2.708-2.804-1.717 0-3.071 1.015-3.071 3.482v6.48h-2.612V6.174h2.612V7.72c.798-1.257 2.103-1.862 3.748-1.862Zm17.024-4.522h2.612v16.927h-2.612v-1.741c-.918 1.282-2.345 2.055-4.231 2.055-3.289 0-6.022-2.78-6.022-6.36 0-3.603 2.733-6.36 6.022-6.36 1.886 0 3.313.774 4.231 2.032V1.336Zm-3.821 14.751c2.177 0 3.821-1.62 3.821-3.87 0-2.248-1.644-3.868-3.821-3.868-2.176 0-3.82 1.62-3.82 3.869s1.644 3.87 3.82 3.87Zm15.187 2.49c-3.651 0-6.384-2.78-6.384-6.36 0-3.602 2.733-6.359 6.384-6.359 2.37 0 4.426 1.233 5.393 3.12l-2.249 1.306c-.532-1.137-1.717-1.863-3.168-1.863-2.128 0-3.748 1.62-3.748 3.797 0 2.176 1.62 3.797 3.748 3.797 1.451 0 2.636-.75 3.216-1.863l2.249 1.282c-1.015 1.91-3.071 3.144-5.441 3.144Zm9.746-9.068c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.159-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.355 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.425-3.701 1.983 0 3.628.92 4.474 2.515l-2.2 1.233c-.436-.943-1.283-1.378-2.274-1.378-.943 0-1.765.41-1.765 1.281Zm11.148 0c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.158-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.354 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.426-3.701 1.982 0 3.627.92 4.473 2.515l-2.2 1.233c-.435-.943-1.282-1.378-2.273-1.378-.944 0-1.766.41-1.766 1.281Z"
    ></path>
  </svg>
);

const TypeScriptLogo = () => (
  <svg
    fill="none"
    viewBox="0 0 27 26"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <path
      clipRule="evenodd"
      d="m.98608 0h24.32332c.5446 0 .9861.436522.9861.975v24.05c0 .5385-.4415.975-.9861.975h-24.32332c-.544597 0-.98608-.4365-.98608-.975v-24.05c0-.538478.441483-.975.98608-.975zm13.63142 13.8324v-2.1324h-9.35841v2.1324h3.34111v9.4946h2.6598v-9.4946zm1.0604 9.2439c.4289.2162.9362.3784 1.5218.4865.5857.1081 1.2029.1622 1.8518.1622.6324 0 1.2331-.0595 1.8023-.1784.5691-.1189 1.0681-.3149 1.497-.5879s.7685-.6297 1.0187-1.0703.3753-.9852.3753-1.6339c0-.4703-.0715-.8824-.2145-1.2365-.1429-.3541-.3491-.669-.6186-.9447-.2694-.2757-.5925-.523-.9692-.7419s-.8014-.4257-1.2743-.6203c-.3465-.1406-.6572-.2771-.9321-.4095-.275-.1324-.5087-.2676-.7011-.4054-.1925-.1379-.3409-.2838-.4454-.4379-.1045-.154-.1567-.3284-.1567-.523 0-.1784.0467-.3392.1402-.4824.0935-.1433.2254-.2663.3959-.369s.3794-.1824.6269-.2392c.2474-.0567.5224-.0851.8248-.0851.22 0 .4523.0162.697.0486.2447.0325.4908.0825.7382.15.2475.0676.4881.1527.7218.2555.2337.1027.4495.2216.6475.3567v-2.4244c-.4015-.1514-.84-.2636-1.3157-.3365-.4756-.073-1.0214-.1095-1.6373-.1095-.6268 0-1.2207.0662-1.7816.1987-.5609.1324-1.0544.3392-1.4806.6203s-.763.6392-1.0104 1.0743c-.2475.4352-.3712.9555-.3712 1.5609 0 .7731.2268 1.4326.6805 1.9785.4537.546 1.1424 1.0082 2.0662 1.3866.363.146.7011.2892 1.0146.4298.3134.1405.5842.2865.8124.4378.2282.1514.4083.3162.5403.4946s.198.3811.198.6082c0 .1676-.0413.323-.1238.4662-.0825.1433-.2076.2676-.3753.373s-.3766.1879-.6268.2473c-.2502.0595-.5431.0892-.8785.0892-.5719 0-1.1383-.0986-1.6992-.2959-.5608-.1973-1.0805-.4933-1.5589-.8879z"
      fill="currentColor"
      fillRule="evenodd"
    ></path>
  </svg>
);
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="max-w-8xl mx-auto px-4 py-16 md:py-18">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/about">About</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">
                    About shadcn/ui Builder
                  </h1>
                  <p className="text-xl text-muted-foreground mt-2">
                    Making form building accessible, beautiful, and fun for
                    everyone
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Beta Version
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Code2 className="h-3 w-3" />
                  Open Source
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  Built with Love
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* The Story */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">The Story Behind the Builder</h2>

            <div className="prose prose-gray max-w-none space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  &quot;Every great tool starts with a frustration, and mine
                  began with the countless hours I spent building forms from
                  scratch, over and over again.&quot;
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  It was a typical Saturday morning when the idea for shadcn/ui
                  Builder was born. As a developer, I found myself repeatedly
                  building the same form components, styling them with Tailwind
                  CSS, and ensuring they worked perfectly with React Hook Form
                  and Zod validation. The pattern was always the same, but the
                  implementation took hours every single time.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  The breakthrough moment came when I discovered
                  <Link
                    href="https://ui.shadcn.com"
                    className="text-primary hover:underline font-medium"
                  >
                    shadcn/ui
                  </Link>
                  - a beautifully designed component library that perfectly
                  balanced aesthetics with functionality. I realized that if I
                  could create a visual form builder using these components as
                  the foundation, I could solve not just my own problem, but
                  help thousands of other developers too.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  What started as a late-night weekend side project quickly
                  evolved into something much bigger. I envisioned a tool that
                  would make form building as simple as drag-and-drop, while
                  still generating clean, production-ready React code that
                  developers could be proud of.
                </p>
              </div>
            </div>
          </section>

          {/* Development Journey */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">My Journey So Far</h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full ring ring-primary flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">The Idea Phase</h3>
                  <p className="text-sm text-muted-foreground">
                    Late nights and countless coffee sessions figuring out the
                    perfect form builder that developers would actually want to
                    use.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                  <Code2 className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">First Prototype</h3>
                  <p className="text-sm text-muted-foreground">
                    Built the initial drag-and-drop interface and component
                    system. The magic moment when I saw components come to life!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Beta Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    Released my first public beta with core form components and
                    code generation capabilities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Community Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Amazing feedback from early adopters helping me shape the
                    roadmap and improve the user experience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Foundation */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Built on Solid Foundations</h2>

            <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-6 space-y-4 border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="flex items-center justify-center">
                      <div className="h-10 flex flex-row">
                        <ReactLogo />
                        <TypeScriptLogo />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">React + TypeScript</p>
                    <p className="text-xs text-muted-foreground">
                      Type-safe components
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="h-10 flex flex-row gap-2">
                      <NextjsLogo />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Next.js</p>
                    <p className="text-xs text-muted-foreground">
                      Full-stack framework
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="h-10 flex flex-row gap-2">
                      <ShadcnLogo />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">shadcn/ui</p>
                    <p className="text-xs text-muted-foreground">
                      Beautiful components
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="h-10 flex flex-row gap-2 items-center">
                      <TailwindLogo />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Tailwind CSS</p>
                    <p className="text-xs text-muted-foreground">
                      Utility-first styling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">What Drives Me</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full border border-primary w-fit">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Simplicity First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complex problems deserve simple solutions. We believe
                    powerful tools don&apos;t have to be complicated.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full border border-primary w-fit">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Code Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Generated code should be clean, readable, and maintainable -
                    code you&apos;d be proud to write yourself.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full border border-primary w-fit">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Community Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built by developers, for developers, with feedback and
                    contributions from the community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Future Vision */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">What&apos;s Next</h2>

            <p className="text-muted-foreground leading-relaxed">
              I&apos;m just getting started! My roadmap includes advanced
              validation rules, custom component support, form analytics, team
              collaboration features, and integrations with popular services.
              But most importantly, I&apos;m building what the community needs.
            </p>

            <div className="pt-4">
              <Link
                href="https://github.com/iduspara/shadcn-builder/issues"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Share your ideas on GitHub <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-6 py-12 bg-dotted rounded-lg border">
            <h2 className="text-3xl font-bold">Join the Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re a developer looking to speed up your workflow,
              or someone who wants to build beautiful forms without code,
              I&apos;d love to have you as part of this community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/builder">
                  Try the Builder <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/iduspara/shadcn-builder">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
