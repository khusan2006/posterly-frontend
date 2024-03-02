import { useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MaxWidthWrapper className="py-10">
      <div className="md:px-16">
        <h1 className="text-center text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-6 letter tracking-wider leading-8">
          This Privacy Policy describes how Posterly.uz ("we," "us," or "our")
          collects, uses, and shares personal data when you use our website
          www.posterly.uz.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Information We Collect</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as "Device Information."
        </p>
        <p className=" my-2 letter tracking-wider leading-8">
          We collect Device Information using the following technologies:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2">
          <li className="letter tracking-wider leading-8 ml-3">
            "Cookies" are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            "Log files" track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            "Web beacons," "tags," and "pixels" are electronic files used to
            record information about how you browse the Site.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-3">
          Personal Information You Provide
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          When you place an order on the Site, we collect your name, phone
          number, and any other information you choose to provide, such as
          shipping address or payment information. We use this information to
          process your order and to communicate with you about your order.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Uploaded Images</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          If you choose to upload custom images for your posters, these images
          are stored in Google Firebase storage. We do not use or access these
          images for any purpose other than fulfilling your order.
        </p>

        <h3 className="text-2xl font-semibold mt-3">
          What Security Measures Do We Use?
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We seek to protect Personal Data using appropriate technical and
          organizational measures based on the type of Personal Data and
          applicable processing activity. You need to prevent unauthorized
          access to your Account and Personal Data by selecting and protecting
          your password appropriately and limiting access to your device and
          browser by signing off after you have finished accessing your Account.
          We seek to ensure that user account information is kept private.
          However, Posterly cannot guarantee the security of any Account
          information. Unauthorized entry or use, hardware or software failure,
          and other factors, may compromise the security of user information at
          any time.
        </p>
        <h3 className="text-2xl font-semibold mt-3">
          How We Use Your Information
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
        <h3 className="text-2xl font-semibold mt-3">
          Sharing Your Personal Information
        </h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. For example, we use
          Google Analytics to help us understand how our customers use the Site
          -- you can read more about how Google uses your Personal Information
          here: https://www.google.com/intl/en/policies/privacy/. We also use
          Google AdSense to display ads on our website -- you can read more
          about how Google uses your Personal Information in its advertising
          here: https://policies.google.com/technologies/ads.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Your Rights</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          If you are a European resident, you have the right to access personal
          information we hold about you and to ask that your personal
          information be corrected, updated, or deleted. If you would like to
          exercise this right, please contact us through the contact information
          below.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Changes</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Contact Us</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at support@posterly.uz.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default PrivacyPolicy;
