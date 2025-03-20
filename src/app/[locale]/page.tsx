import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import LandingPage from "../user/landing_page/LandingPage";
import ChatbotPopup from "../user/next-chatbot/ChatbotPopup";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["landingPage"];

export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <>
      <GoogleTagManager gtmId="GTM-KBG7S42T" />
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <LandingPage />
      </TranslationsProvider>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GTM-KBG7S42T"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16457594733');
              `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRental",
            name: "Injaz Rent A Car",
            url: "https://injazrent.ae/",
            logo: "https://injazrent.ae/injaz%20white%20colour%20logo.png",
            description:
              "Explore Dubai with our diverse car fleet—SUVs, sedans, luxury, compacts, hatchbacks, economy, and crossovers. Top brands, affordable rates, premium service.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Mohammed Bin Zayed City- ME10-C56",
              addressLocality: "Abu Dhabi",
              postalCode: "44737",
              addressRegion: "Emirate",
              addressCountry: "United Arab Emirates",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+971502378558",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/people/INJAZ-RENT-A-CAR/61550608379423/",
              "https://twitter.com/",
              "https://www.linkedin.com/company/injaz-rent-a-car/",
              "https://www.instagram.com/injazrent/",
            ],
          }),
        }}
      />
      <ChatbotPopup />
    </>
  );
}
