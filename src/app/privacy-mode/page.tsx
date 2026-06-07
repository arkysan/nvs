import { PrivacyModeControl } from "@/components/privacy/PrivacyModeControl";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Privacy Mode - New Vision OS",
};

export default function PrivacyModePage() {
  return (
    <section className="section" data-section="privacy-mode" data-section-label="Privacy mode">
      <div className="container">
        <SectionTitle title="Privacy Mode" titleField="title" copyField="copy">
          Local browser controls for safer New Vision review work. This page is honest about what the site can protect and what belongs in account, device, or business-system settings.
        </SectionTitle>
        <PrivacyModeControl />
      </div>
    </section>
  );
}
