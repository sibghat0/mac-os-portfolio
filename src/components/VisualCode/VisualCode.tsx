import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";

export default function VisualCode() {
  return (
    <WindowWrapper appId="vscode" title="Visual Studio Code">
      <iframe
        src="https://github1s.com/microsoft/vscode"
        title="VS Code"
        className="w-full h-full border-none"
      />
    </WindowWrapper>
  );
}
