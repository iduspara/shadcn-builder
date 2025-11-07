import { SignUp } from "@clerk/nextjs";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Infinity } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-dotted">
      <Header />

      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-center">
            <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm p-0">
              <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "!w-full",
                      formButtonPrimary:
                        "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                      cardBox:
                        "!border-none !rounded-none !shadow-none !w-full",
                      headerTitle: "text-gray-900",
                      headerSubtitle: "text-gray-600",
                      socialButtonsBlockButton:
                        "border border-gray-300 hover:bg-gray-50",
                      socialButtonsBlockButtonText: "font-normal",
                      formFieldInput:
                        "border border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                      footerActionLink: "text-blue-600 hover:text-blue-500",
                    },
                  }}
                  redirectUrl="/"
                  signInUrl="/sign-in"
                />
                <div className="space-y-8 p-6 border-l">
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      Free Forever
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed">
                      Create professional forms with our drag-and-drop builder.
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      What you get for FREE:
                    </h3>
                    <div className="grid gap-3">
                      {[
                        "Drag-and-drop form builder",
                        "All free form components included",
                        "Live preview & mobile responsive",
                        "Export to React + Tailwind code",
                        "100+ professional templates",
                        "Save/Load functionality",
                        "Form history",
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Infinity className="h-4 w-4 text-primary" />
                      <span>Free forever</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
