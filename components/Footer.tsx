export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} House of EdTech Assignment</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-medium text-zinc-800">Arun Upadhayay</span>
          <a
            className="hover:text-zinc-900 underline underline-offset-4"
            href="https://github.com/arun-upadhayay"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-zinc-900 underline underline-offset-4"
            href="https://www.linkedin.com/in/arun-upadhayay"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
