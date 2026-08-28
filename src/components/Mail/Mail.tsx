import { useState } from "react";
import {
  Inbox,
  Flag,
  File,
  Send,
  Search,
  Edit,
  Reply,
  ReplyAll,
  Forward,
  Trash2,
  Archive,
  Folder as FolderIcon,
  ChevronRight,
  Filter,
  MoreHorizontal,
  User,
  ShoppingCart,
  MessageCircle,
  Megaphone,
} from "lucide-react";
import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";

interface EmailData {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  unread: boolean;
  source: string;
  folder: string;
}

const DUMMY_EMAILS: EmailData[] = [
  {
    id: "mail-1",
    sender: "Naquib",
    subject: "Re: Website Development Proposal",
    preview:
      "Well received — N. (Sent From Mobile Device) From: Sibghatullah Khan...",
    body: "Hi Sibghatullah,\n\nI received the structured proposal outlining website pages and delivery scope. Let's proceed with the development. \n\nBest,\nNaquib",
    date: "27/02/26",
    unread: false,
    source: "Inbox - Google",
    folder: "All Inboxes",
  },
  {
    id: "mail-2",
    sender: "Engineering Team",
    subject: "React Native Interview Guides Ready",
    preview:
      "The technical interview question-and-answer sets focusing on React Native build pipelines...",
    body: "Hello,\n\nThank you for authoring the interview guides to evaluate senior React Native developer candidates. The questions on native modules and production debugging are exactly what we needed.\n\nThanks,\nEngineering",
    date: "15/02/26",
    unread: true,
    source: "Inbox - iCloud",
    folder: "All Inboxes",
  },
  {
    id: "mail-3",
    sender: "GitHub Server",
    subject: "Deployment Success: Aniwatch API",
    preview:
      "Your local development instance of the Aniwatch API with Node.js and Redis has been...",
    body: "Deployment successful.\n\nYou recently set up a local development instance of the Aniwatch API with Node.js and Redis. Port binding conflicts have been resolved and local database connectivity is confirmed.",
    date: "10/03/26",
    unread: true,
    source: "Inbox - Google",
    folder: "All Inboxes",
  },
  {
    id: "mail-4",
    sender: "Build System",
    subject: "Electron Monorepo Build Status",
    preview:
      "Workspace build scripts and Electron runtime flags configured successfully...",
    body: "Build Complete.\n\nYour recent configuration for the Electron desktop application within a pnpm monorepo architecture compiled without errors. Deployment workflows are ready.",
    date: "05/05/26",
    unread: false,
    source: "Inbox - Google",
    folder: "All Inboxes",
  },
  {
    id: "mail-5",
    sender: "Family",
    subject: "Happy Birthday!",
    preview:
      "Wishing you a great birthday on July 19! We have the nursery rhymes and birthday song...",
    body: "Happy Birthday!\n\nSince you celebrate your birthday on July 19, we hope you have a wonderful day! We still remember the great time we had in March organizing the birthday celebration involving nursery rhymes and birthday songs for the kids.\n\nEnjoy your day!",
    date: "19/07/26",
    unread: true,
    source: "Inbox - iCloud",
    folder: "All Inboxes",
  },
  {
    id: "mail-6",
    sender: "Sibghatullah Khan",
    subject: "Draft: Astro Documentation",
    preview:
      "Configured Astro build configurations, Starlight sidebars, and deployment rewrites...",
    body: "Note to self: \n\nEnsure the documentation websites using Astro and the Starlight framework have their deployment rewrites pushed to the staging branch by Friday.",
    date: "10/01/26",
    unread: false,
    source: "Drafts - Google",
    folder: "All Drafts",
  },
  {
    id: "mail-7",
    sender: "Sibghatullah Khan",
    subject: "Client Update",
    preview: "Sent the three-page website proposal to client Naquib...",
    body: "Hi Naquib,\n\nPlease find attached the three-page website proposal.",
    date: "25/02/26",
    unread: false,
    source: "Sent - Google",
    folder: "All Sent",
  },
];

export default function Mail() {
  const [activeMailId, setActiveMailId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState("All Inboxes");

  const filteredEmails = DUMMY_EMAILS.filter(
    (mail) => mail.folder === activeFolder,
  );

  // Set active mail to the first one in the folder if the current active mail isn't in this folder
  const activeMail =
    filteredEmails.find((m) => m.id === activeMailId) || filteredEmails[0];

  const handleFolderClick = (folder: string) => {
    setActiveFolder(folder);
    const folderEmails = DUMMY_EMAILS.filter((mail) => mail.folder === folder);
    if (folderEmails.length > 0) {
      setActiveMailId(folderEmails[0].id);
    } else {
      setActiveMailId(null);
    }
  };

  return (
    <WindowWrapper
      appId="email"
      title="Mail"
      defaultWidth={1000}
      defaultHeight={600}
    >
      <div className="flex w-full h-full bg-[#1c1c1e] text-gray-200 select-none overflow-hidden font-sans">
        {/* Left Sidebar - Folders */}
        <div className="w-56 bg-[#252526]/80 backdrop-blur-xl border-r border-black/40 flex flex-col p-3 z-10 flex-shrink-0">
          <div className="text-[11px] font-semibold text-gray-400 mb-2 px-2 mt-4">
            Favourites
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => handleFolderClick("All Inboxes")}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                activeFolder === "All Inboxes"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronRight
                  size={14}
                  className={
                    activeFolder === "All Inboxes"
                      ? "text-white"
                      : "text-gray-500"
                  }
                />
                <Inbox
                  size={15}
                  className={
                    activeFolder === "All Inboxes"
                      ? "text-white"
                      : "text-blue-400"
                  }
                />
                <span className="text-[13px] font-medium">All Inboxes</span>
              </div>
              <span
                className={`text-[11px] ${activeFolder === "All Inboxes" ? "text-white" : "text-gray-400"}`}
              >
                {DUMMY_EMAILS.filter((e) => e.folder === "All Inboxes").length}
              </span>
            </button>

            <button
              onClick={() => handleFolderClick("Flagged")}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                activeFolder === "Flagged"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2 ml-5">
                <Flag
                  size={15}
                  className={
                    activeFolder === "Flagged" ? "text-white" : "text-gray-400"
                  }
                />
                <span className="text-[13px] font-medium">Flagged</span>
              </div>
              <span
                className={`text-[11px] ${activeFolder === "Flagged" ? "text-white" : "text-gray-400"}`}
              >
                {DUMMY_EMAILS.filter((e) => e.folder === "Flagged").length}
              </span>
            </button>

            <button
              onClick={() => handleFolderClick("All Drafts")}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                activeFolder === "All Drafts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronRight
                  size={14}
                  className={
                    activeFolder === "All Drafts"
                      ? "text-white"
                      : "text-gray-500"
                  }
                />
                <File
                  size={15}
                  className={
                    activeFolder === "All Drafts"
                      ? "text-white"
                      : "text-gray-400"
                  }
                />
                <span className="text-[13px] font-medium">All Drafts</span>
              </div>
              <span
                className={`text-[11px] ${activeFolder === "All Drafts" ? "text-white" : "text-gray-400"}`}
              >
                {DUMMY_EMAILS.filter((e) => e.folder === "All Drafts").length}
              </span>
            </button>

            <button
              onClick={() => handleFolderClick("All Sent")}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                activeFolder === "All Sent"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronRight
                  size={14}
                  className={
                    activeFolder === "All Sent" ? "text-white" : "text-gray-500"
                  }
                />
                <Send
                  size={15}
                  className={
                    activeFolder === "All Sent" ? "text-white" : "text-gray-400"
                  }
                />
                <span className="text-[13px] font-medium">All Sent</span>
              </div>
              <span
                className={`text-[11px] ${activeFolder === "All Sent" ? "text-white" : "text-gray-400"}`}
              >
                {DUMMY_EMAILS.filter((e) => e.folder === "All Sent").length}
              </span>
            </button>
          </div>

          <div className="text-[11px] font-semibold text-gray-400 mb-2 px-2 mt-6">
            Smart Mailboxes
          </div>

          <div className="flex items-center justify-between px-2 py-1.5 mt-2 text-gray-300">
            <span className="text-[13px]">iCloud</span>
            <span className="text-[11px] text-gray-400">2</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 text-gray-300">
            <span className="text-[13px]">Google</span>
            <span className="text-[11px] text-gray-400">5</span>
          </div>

          <div className="mt-auto border-t border-white/10 pt-3 pb-1 px-2">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-blue-500 w-[100%]" />
            </div>
            <div className="text-[11px] font-semibold text-gray-300 text-center">
              Up to Date
            </div>
            <div className="text-[10px] text-gray-500 text-center">
              Updated Just Now
            </div>
          </div>
        </div>

        {/* Middle Sidebar - Email List */}
        <div className="w-[320px] bg-[#1e1e1e] border-r border-black/50 flex flex-col z-10 flex-shrink-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-200">
                {activeFolder}
              </h2>
              <div className="flex gap-2">
                <Filter
                  size={16}
                  className="text-gray-400 cursor-pointer hover:text-white"
                />
                <MoreHorizontal
                  size={16}
                  className="text-gray-400 cursor-pointer hover:text-white"
                />
              </div>
            </div>
            <div className="text-[11px] text-gray-400">
              Primary • {filteredEmails.length} messages
            </div>
          </div>

          {/* Categories Tabs */}
          <div className="flex items-center gap-4 px-4 py-2 border-b border-white/5">
            <button className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
              <User size={14} /> Primary
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <ShoppingCart size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <MessageCircle size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <Megaphone size={16} />
            </button>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setActiveMailId(email.id)}
                  className={`px-3 py-3 border-b border-white/5 cursor-pointer relative ${
                    activeMail?.id === email.id
                      ? "bg-blue-500/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  {email.unread && (
                    <div className="absolute left-1 top-4 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                  <div className="pl-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span
                        className={`text-[13px] truncate pr-2 ${email.unread ? "font-bold text-gray-100" : "font-medium text-gray-300"}`}
                      >
                        {email.sender}
                      </span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">
                        {email.date}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center justify-between mb-1">
                      <span className="truncate">{email.source}</span>
                    </div>
                    <div
                      className={`text-[12px] truncate mb-0.5 ${email.unread ? "font-bold text-gray-200" : "text-gray-300"}`}
                    >
                      {email.subject}
                    </div>
                    <div className="text-[12px] text-gray-400 line-clamp-2 leading-snug">
                      {email.preview}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No messages in this folder
              </div>
            )}
          </div>
        </div>

        {/* Right Area - Email Viewer */}
        <div className="flex-1 flex flex-col bg-[#1c1c1e] min-w-0">
          {/* Top Toolbar */}
          <div className="h-12 flex items-center justify-between px-4 border-b border-black/50 bg-[#252526]/30">
            <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 transition-colors">
              <Edit size={16} />
            </button>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <Reply size={16} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <ReplyAll size={16} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <Forward size={16} />
              </button>

              <div className="w-px h-4 bg-gray-700 mx-1" />

              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <Archive size={16} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <Trash2 size={16} />
              </button>

              <div className="w-px h-4 bg-gray-700 mx-1" />

              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <FolderIcon size={16} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                <Flag size={16} />
              </button>
            </div>

            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-48 h-7 bg-black/20 border border-white/10 rounded-md pl-8 pr-3 text-[12px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email Body */}
          <div className="flex-1 overflow-y-auto bg-white/5">
            {activeMail ? (
              <div className="p-8 max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-gray-100 mb-4">
                  {activeMail.subject}
                </h1>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <div className="font-semibold text-gray-200 text-sm">
                      {activeMail.sender}
                    </div>
                    <div className="text-[12px] text-gray-400 mt-0.5">
                      To: Sibghatullah Khan
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-400">
                    {activeMail.date}
                  </div>
                </div>
                <div className="text-[14px] text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                  {activeMail.body}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                No Message Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
