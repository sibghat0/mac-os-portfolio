import React, { useState, useEffect } from "react";
import {
  Folder,
  SquarePen,
  Trash2,
  Share,
  Search,
  CheckSquare,
  Table,
  Paperclip,
  PenTool,
  MoreHorizontal,
  FolderPlus,
} from "lucide-react";
import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";

interface Note {
  id: string;
  title: string;
  body: string;
  date: string;
  timestamp: string;
  group: "Previous 7 Days" | "Previous 30 Days";
}

const initialNotes: Note[] = [];

const STORAGE_KEY = "macos-clone-notes";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (e) {
        console.error("Failed to parse notes from local storage", e);
      }
    }
    return initialNotes;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(
    notes.length > 0 ? notes[0].id : "",
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "New Note",
      body: "",
      date: "Today",
      timestamp: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      group: "Previous 7 Days",
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (activeNoteId === id && remaining.length > 0) {
      setActiveNoteId(remaining[0].id);
    } else if (remaining.length === 0) {
      setActiveNoteId("");
    }
  };

  const handleUpdateContent = (text: string) => {
    const lines = text.split("\n");
    const newTitle = lines[0]?.trim() || "New Note";

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId
          ? {
              ...note,
              title: newTitle,
              body: text,
            }
          : note,
      ),
    );
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sevenDaysNotes = filteredNotes.filter(
    (n) => n.group === "Previous 7 Days",
  );
  const thirtyDaysNotes = filteredNotes.filter(
    (n) => n.group === "Previous 30 Days",
  );

  return (
    <WindowWrapper
      appId="notes"
      title="Notes"
      defaultWidth={920}
      defaultHeight={580}
    >
      <div className="flex w-full h-full bg-[#1e1e1e] text-gray-200 select-none overflow-hidden font-sans">
        <div className="w-52 bg-[#252526]/80 backdrop-blur-xl border-r border-black/40 flex flex-col p-3 text-xs z-10">
          <div className="flex items-center justify-between text-gray-400 mb-2 px-2">
            <span className="font-semibold text-[11px] tracking-wider uppercase">
              iCloud
            </span>
            <FolderPlus size={14} className="hover:text-white cursor-pointer" />
          </div>

          <button className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#323234] text-amber-400 font-medium">
            <div className="flex items-center gap-2">
              <Folder size={15} className="fill-amber-400 text-amber-400" />
              <span className="text-gray-100">Notes</span>
            </div>
            <span className="text-gray-400 text-[11px]">{notes.length}</span>
          </button>

          <div className="text-gray-400 font-semibold text-[11px] tracking-wider uppercase px-2 mt-4 mb-2">
            Google
          </div>
        </div>

        <div className="w-64 bg-[#1e1e1e] border-r border-white/5 flex flex-col overflow-hidden z-10">
          <div className="h-11 flex items-center justify-between px-3 border-b border-white/5 bg-[#252526]/30">
            <div>
              <div className="text-xs font-semibold text-gray-200">Notes</div>
              <div className="text-[10px] text-gray-400">
                {filteredNotes.length} notes
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCreateNote}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="New Note"
              >
                <SquarePen size={15} />
              </button>
              <button
                onClick={() => handleDeleteNote(activeNoteId)}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-red-400 transition-colors"
                title="Delete Note"
                disabled={!activeNoteId}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-3 no-scrollbar">
            {sevenDaysNotes.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-gray-400 px-2 mb-1">
                  Previous 7 Days
                </div>
                <div className="space-y-1">
                  {sevenDaysNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setActiveNoteId(note.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                        activeNoteId === note.id
                          ? "bg-[#323234] border border-white/5"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="text-xs font-semibold text-gray-200 truncate">
                        {note.title || "New Note"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5 truncate">
                        <span>{note.date}</span>
                        <span className="text-gray-500 font-normal truncate">
                          {note.body.replace(note.title, "").trim() ||
                            "No additional text"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {thirtyDaysNotes.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-gray-400 px-2 mb-1">
                  Previous 30 Days
                </div>
                <div className="space-y-1">
                  {thirtyDaysNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setActiveNoteId(note.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                        activeNoteId === note.id
                          ? "bg-[#323234] border border-white/5"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="text-xs font-semibold text-gray-200 truncate">
                        {note.title || "New Note"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5 truncate">
                        <span>{note.date}</span>
                        <span className="text-gray-500 font-normal truncate">
                          {note.body.replace(note.title, "").trim() ||
                            "No additional text"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#1c1c1e]">
          <div className="h-11 flex items-center justify-between px-4 border-b border-white/5 bg-[#252526]/30">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-sm font-semibold tracking-wide text-gray-300">
                Aa
              </span>
              <CheckSquare
                size={16}
                className="hover:text-white cursor-pointer"
              />
              <Table size={16} className="hover:text-white cursor-pointer" />
              <Paperclip
                size={16}
                className="hover:text-white cursor-pointer"
              />
              <PenTool size={16} className="hover:text-white cursor-pointer" />
            </div>

            <div className="flex items-center gap-3">
              <Share
                size={15}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
              <MoreHorizontal
                size={16}
                className="text-gray-400 hover:text-white cursor-pointer"
              />

              <div className="relative flex items-center">
                <Search size={13} className="absolute left-2.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-36 h-6 bg-white/10 rounded-md pl-7 pr-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {activeNote ? (
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
              <div className="text-[11px] text-gray-500 text-center mb-4">
                {activeNote.timestamp}
              </div>

              <textarea
                value={activeNote.body}
                onChange={(e) => handleUpdateContent(e.target.value)}
                placeholder="Type your note here..."
                autoFocus
                className="w-full flex-1 bg-transparent border-none outline-none resize-none text-[15px] leading-relaxed text-gray-100 placeholder-gray-600 caret-amber-400"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
              No Note Selected
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
