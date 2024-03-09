import { useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MaxWidthWrapper className="py-10">
      <div className="md:px-16">
        <h1 className="text-center text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-6 letter tracking-wider leading-8">
          This Cookie Policy explains how Posterly.uz ("we," "us," or "our")
          uses cookies on our website https://posterly.uz. By using the Site,
          you consent to the use of cookies.
        </p>
        <h3 className="text-2xl font-semibold mt-3">What are cookies</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          Cookies are small pieces of text sent by your web browser by a website
          you visit. A cookie file is stored in your web browser and allows the
          Site or a third-party to recognize you and make your next visit easier
          and the Site more useful to you.
        </p>
        <h3 className="text-2xl font-semibold mt-3">
          How Posterly.uz uses cookies
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          When you use and access the Site, we may place a number of cookies
          files in your web browser. We use cookies for the following purposes:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2">
          <li className="letter tracking-wider leading-8 ml-3">
            To enable certain functions of the Site
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            To provide analytics
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            To store your preferences
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            To enable advertisements delivery, including behavioral advertising
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-3">Types of cookies we use</h3>
        <ul className="list-disc list-inside flex flex-col gap-2">
          <li className="letter tracking-wider leading-8 ml-3">
            Essential cookies: These cookies are necessary for the Site to
            function properly. They enable basic functions like page navigation
            and access to secure areas of the Site. The Site cannot function
            properly without these cookies.
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            Preference cookies: These cookies enable the Site to remember
            information that changes the way the Site behaves or looks, like
            your preferred language or the region that you are in.
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            Statistic cookies: These cookies help us understand how visitors
            interact with the Site by collecting and reporting information
            anonymously.
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            Marketing cookies: These cookies are used to track visitors across
            websites. The intention is to display ads that are relevant and
            engaging for the individual user and thereby more valuable for
            publishers and third-party advertisers.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-3">Third-party cookies</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          In addition to our own cookies, we may also use various third-party
          cookies to report usage statistics of the Site, deliver advertisements
          on and through the Site, and so on.
        </p>

        <h3 className="text-2xl font-semibold mt-3">
          What are your choices regarding cookies
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          If you'd like to delete cookies or instruct your web browser to delete
          or refuse cookies, please visit the help pages of your web browser.
          Please note, however, that if you delete cookies or refuse to accept
          them, you might not be able to use all of the features we offer, you
          may not be able to store your preferences, and some of our pages might
          not display properly.
        </p>
        <h3 className="text-2xl font-semibold mt-3">
          Changes to our Cookie Policy
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We may update our Cookie Policy from time to time. We will notify you
          of any changes by posting the new Cookie Policy on this page.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Contact Us</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          If you have any questions about our Cookie Policy, please contact us
          by email at support@posterly.uz.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default CookiePolicy;
