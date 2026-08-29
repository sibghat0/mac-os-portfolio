import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";
import resumePdf from "@/assets/Sibghatullah_khan_Resume .pdf";

export default function Resume() {
  return (
    <WindowWrapper
      appId="resume"
      title="Resume.pdf"
      defaultWidth={850}
      defaultHeight={590}
    >
      <div className="w-full h-full bg-[#323639]">
        <iframe
          src={`${resumePdf}#toolbar=0&navpanes=0`}
          className="w-full h-full border-none rounded-b-xl"
          title="Resume PDF"
        />
      </div>
    </WindowWrapper>
  );
}
