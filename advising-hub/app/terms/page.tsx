import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Lehigh360",
  description:
    "Terms governing use of the Lehigh360 AI Chat Assistant.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>Welcome to the Lehigh360 AI Chat Assistant.</p>
        <p>
          These Terms and Conditions govern your access to and use of the
          AI Chat Assistant, personalized recommendation tools, student profiles,
          and related features.
        </p>
        <p>
          By accessing or using the Application, you agree to these Terms and
          our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          If you do not agree to these Terms, you should not use the
          Application.
        </p>
      </>
    ),
  },
  {
    id: "description-of-the-service",
    title: "Description of the Service",
    content: (
      <>
        <p>
          Lehigh360 is an educational discovery and advising platform designed
          to help students explore university programs, organizations, research
          opportunities, extracurricular activities, and other educational
          experiences.
        </p>
        <p>The Application may provide:</p>
        <ul>
          <li>Personalized program and opportunity recommendations.</li>
          <li>An AI-powered conversational assistant.</li>
          <li>Student profiles and interest-based matching.</li>
          <li>Tools for saving, organizing, and discovering opportunities.</li>
          <li>
            Information about university programs, including descriptions,
            eligibility requirements, and deadlines.
          </li>
          <li>
            Additional advising and recommendation features as they become
            available.
          </li>
        </ul>
        <p>
          The Application is intended to supplement traditional university
          resources and advising services, not replace them.
        </p>
      </>
    ),
  },
  {
    id: "user-accounts-and-authentication",
    title: "User Accounts and Authentication",
    content: (
      <>
        <p>
          Certain features may require users to sign in using an authorized
          Google account.
        </p>
        <p>
          You agree to provide accurate information when creating or updating
          your profile and to use only accounts that you are authorized to
          access.
        </p>
        <p>
          You are responsible for maintaining the security of your account and
          promptly reporting suspected unauthorized access.
        </p>
        <p>
          We reserve the right to restrict access to accounts or features when
          reasonably necessary to protect the security, integrity, or
          appropriate use of the Application.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>
          You agree to use the Application responsibly and in accordance with
          applicable laws and university policies.
        </p>
        <p>You must not:</p>
        <ul>
          <li>
            Use the Application for unlawful, fraudulent, threatening, or
            abusive purposes.
          </li>
          <li>
            Attempt to gain unauthorized access to another user&#x27;s account
            or personal information.
          </li>
          <li>Interfere with the operation or security of the Application.</li>
          <li>
            Introduce malicious software or attempt to exploit vulnerabilities.
          </li>
          <li>
            Submit content intended to manipulate, compromise, or disrupt the AI
            system.
          </li>
          <li>
            Use automated tools to excessively access, scrape, or overload the
            Application without authorization.
          </li>
          <li>
            Impersonate another person or misrepresent your identity or
            university affiliation.
          </li>
        </ul>
        <p>
          We may restrict or suspend access when necessary to address violations
          of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "artificial-intelligence-disclaimer",
    title: "Artificial Intelligence Disclaimer",
    content: (
      <>
        <p>
          The Application uses artificial intelligence to generate responses,
          recommend opportunities, and assist users in exploring available
          programs.
        </p>
        <p>
          <strong>
            AI-generated information may be inaccurate, incomplete, outdated, or
            inappropriate for a user&#x27;s particular circumstances.
          </strong>
        </p>
        <p>
          Although we aim to provide accurate and useful information, we do not
          guarantee that every AI-generated response is correct.
        </p>
        <p>
          Users should independently verify important information, including:
        </p>
        <ul>
          <li>Application deadlines</li>
          <li>Program eligibility requirements</li>
          <li>Academic requirements</li>
          <li>Financial aid or funding availability</li>
          <li>Program participation requirements</li>
          <li>University policies and procedures</li>
        </ul>
        <p>
          The AI Chat Assistant does not replace professional academic advising,
          official university guidance, or decisions made by authorized
          university personnel.
        </p>
      </>
    ),
  },
  {
    id: "program-information-and-recommendations",
    title: "Program Information and Recommendations",
    content: (
      <>
        <p>
          Lehigh360 may display information obtained from university programs,
          departments, organizations, or other sources.
        </p>
        <p>
          We make reasonable efforts to maintain accurate and relevant
          information. However, program details, eligibility criteria,
          deadlines, availability, and participation requirements may change
          without notice.
        </p>
        <p>
          A recommendation displayed by the Application does not guarantee
          eligibility, admission, acceptance, funding, or participation in any
          program.
        </p>
        <p>
          Users are responsible for consulting the appropriate program
          administrator or official university resource before making important
          decisions.
        </p>
      </>
    ),
  },
  {
    id: "user-submitted-content",
    title: "User-Submitted Content",
    content: (
      <>
        <p>
          You may submit information to the Application through student
          profiles, chatbot conversations, feedback forms, and other interactive
          features.
        </p>
        <p>You retain any rights you hold in the content you submit.</p>
        <p>
          By submitting content, you grant the Application operator limited
          permission to store, process, transmit, and display that content as
          reasonably necessary to provide, maintain, secure, and improve the
          Service, consistent with our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          You are responsible for ensuring that the content you submit does not
          violate applicable laws or the rights of others.
        </p>
      </>
    ),
  },
  {
    id: "privacy-and-data-protection",
    title: "Privacy and Data Protection",
    content: (
      <>
        <p>
          Your use of the Application is also governed by our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          The <Link href="/privacy">Privacy Policy</Link> explains what
          information may be collected, how it is used, and when it may be
          shared with authorized service providers or personnel.
        </p>
        <p>
          By using the Application, you acknowledge that certain information,
          including chatbot messages and relevant profile information, may be
          processed by third-party AI service providers to generate responses
          and recommendations.
        </p>
        <p>
          Please review the <Link href="/privacy">Privacy Policy</Link> before
          submitting personal or sensitive information.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The Application&#x27;s software, interface, design, branding, and
          original content are protected by applicable intellectual property
          laws.
        </p>
        <p>
          Except where otherwise stated, these materials belong to the
          Application operator or their respective owners.
        </p>
        <p>
          You may use the Application for its intended educational and personal
          purposes.
        </p>
        <p>
          You may not reproduce, distribute, commercially exploit, or modify
          protected Application materials without appropriate permission, except
          as permitted by applicable law.
        </p>
        <p>
          AI-generated responses may not be unique, and similar responses may be
          provided to other users.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services-and-links",
    title: "Third-Party Services and Links",
    content: (
      <>
        <p>
          The Application may integrate with third-party services, including
          Google authentication and AI technology providers, and may display
          links to external websites.
        </p>
        <p>
          Your use of these services may be subject to their respective terms
          and privacy policies.
        </p>
        <p>
          We are not responsible for the content, availability, security, or
          practices of independent third-party websites or services beyond our
          control.
        </p>
        <p>
          Links to external programs or organizations do not necessarily
          constitute an endorsement.
        </p>
      </>
    ),
  },
  {
    id: "service-availability-and-modifications",
    title: "Service Availability and Modifications",
    content: (
      <>
        <p>
          We strive to provide a reliable and accessible experience, but we do
          not guarantee uninterrupted access to the Application.
        </p>
        <p>
          Features may occasionally be unavailable due to maintenance, technical
          issues, service-provider interruptions, or circumstances beyond our
          control.
        </p>
        <p>
          We reserve the right to modify, improve, restrict, or discontinue
          features when reasonably necessary.
        </p>
        <p>
          Where appropriate, we will provide notice of significant changes that
          materially affect users.
        </p>
      </>
    ),
  },
  {
    id: "account-suspension-and-termination",
    title: "Account Suspension and Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to the Application when necessary
          to:
        </p>
        <ul>
          <li>Address violations of these Terms.</li>
          <li>Protect users or application infrastructure.</li>
          <li>Prevent fraudulent or unauthorized activity.</li>
          <li>Comply with applicable laws or institutional requirements.</li>
        </ul>
        <p>Users may stop using the Application at any time.</p>
        <p>
          Requests concerning account deletion and associated personal
          information are handled in accordance with the{" "}
          <Link href="/privacy">Privacy Policy</Link> and applicable legal
          obligations.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, the Application is provided
          on an &quot;as is&quot; and &quot;as available&quot; basis.
        </p>
        <p>
          We do not make warranties that the Application will always be
          error-free, uninterrupted, or suitable for every user&#x27;s
          individual needs.
        </p>
        <p>
          In particular, we do not guarantee the accuracy, completeness, or
          reliability of AI-generated content or third-party program
          information.
        </p>
        <p>
          Nothing in these Terms excludes warranties or rights that cannot
          legally be excluded.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, the Application operator
          and its authorized representatives will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising from
          use of the Application.
        </p>
        <p>
          This includes losses resulting from reliance on inaccurate
          AI-generated information, missed deadlines, unavailable opportunities,
          or temporary service interruptions.
        </p>
        <p>
          Nothing in these Terms limits liability where doing so would be
          prohibited by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          We may revise these Terms to reflect changes in the Application, its
          features, applicable legal requirements, or operational practices.
        </p>
        <p>
          The Effective Date will be updated when revisions are made. When
          required, material changes will be communicated through the
          Application or other appropriate channels.
        </p>
        <p>
          Continued use of the Application after updated Terms take effect
          constitutes acceptance of the revised Terms to the extent permitted by
          law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms are governed by the laws of the Commonwealth of
          Pennsylvania, without regard to conflict-of-law principles, except
          where otherwise required by applicable law.
        </p>
        <p>
          Any disputes arising from these Terms will be handled in accordance
          with applicable law and any mandatory dispute-resolution requirements.
        </p>
      </>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: (
      <>
        <p>
          For questions about these Terms or the Application, please contact:
        </p>
        <p>
          <strong>Lehigh360 AI Chat Assistant</strong>
        </p>
        <p>Operated by: Lehigh360</p>
        <p>
          Email: <a href="mailto:inlu360@lehigh.edu">inlu360@lehigh.edu</a>
        </p>
        <p>
          Website:{" "}
          <a href="https://lu360-advising-hub.vercel.app/">
            https://lu360-advising-hub.vercel.app/
          </a>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" sections={sections} />;
}
