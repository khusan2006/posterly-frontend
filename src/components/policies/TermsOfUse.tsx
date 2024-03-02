import { useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const TermsOfUse = () => {
    useEffect(() => {
        scrollTo(0,0)
    }, [])
  return (
    <MaxWidthWrapper className="py-10">
      <div className="md:px-16">
        <h1 className="text-center text-4xl font-bold">Terms of Use</h1>
        <p className="mt-6 letter tracking-wider leading-8">
          These Terms of Use ("Terms") govern your use of the Posterly.uz
          website (www.posterly.uz) operated by posterly ("us," "we," or "our").
          Please read these Terms carefully before using the Site.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Acceptance of Terms</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          By accessing or using the Site in any manner, including, but not
          limited to, visiting or browsing the Site or contributing content or
          other materials to the Site, you agree to be bound by these Terms and
          our Privacy Policy. If you do not agree to these Terms or the Privacy
          Policy, please do not use the Site.
        </p>

        <h3 className="text-2xl font-semibold mt-3">Use License</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Posterly.uz's website for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license, you may
          not:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2">
          <li className="letter tracking-wider leading-8 ml-3">
            modify or copy the materials;
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial);
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            attempt to decompile or reverse engineer any software contained on
            Posterly.uz's website;
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li className="letter tracking-wider leading-8 ml-3">
            transfer the materials to another person or "mirror" the materials
            on any other server.
          </li>
        </ul>
        <p className="mt-2 letter tracking-wider leading-8">
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Posterly.uz at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Disclaimer</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          The materials on Posterly.uz's website are provided on an 'as is'
          basis. Posterly.uz makes no warranties, expressed or implied, and
          hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>
        <p className="mt-2 letter tracking-wider leading-8">
          Further, Posterly.uz does not warrant or make any representations
          concerning the accuracy, likely results, or reliability of the use of
          the materials on its website or otherwise relating to such materials
          or on any sites linked to this site.
        </p>

        <h3 className="text-2xl font-semibold mt-3">Limitations</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          In no event shall Posterly.uz or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on Posterly.uz's website, even if
          Posterly.uz or a Posterly.uz authorized representative has been
          notified orally or in writing of the possibility of such damage.
          Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Revisions and Errata</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          The materials appearing on Posterly.uz's website could include
          technical, typographical, or photographic errors. Posterly.uz does not
          warrant that any of the materials on its website are accurate,
          complete, or current. Posterly.uz may make changes to the materials
          contained on its website at any time without notice. Posterly.uz does
          not, however, make any commitment to update the materials.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Links</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          Posterly.uz has not reviewed all of the sites linked to its website
          and is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by Posterly.uz of the
          site. Use of any such linked website is at the user's own risk.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Governing Law</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          These terms and conditions are governed by and construed in accordance
          with the laws of Uzbekistan and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Changes</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
        <h3 className="text-2xl font-semibold mt-3">Changes to Terms</h3>
        <p className="mt-2 letter tracking-wider leading-8">
          Posterly.uz may revise these Terms of Use for its website at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these Terms of Use.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default TermsOfUse;
