# Docs Folder README

This folder contains documentation files for the Anime & TV Series Tracker capstone submission.

Files included:
- Project_Report.md — project report and architecture placeholders
- SRS_Document.md — software requirements specification
- User_Manual.md — user manual and sample workflows

To generate PDF files from these Markdown files (recommended for submission), install Pandoc and run (PowerShell):

```powershell
pandoc Project_Report.md -o Project_Report.pdf --from markdown
pandoc SRS_Document.md -o SRS_Document.pdf --from markdown
pandoc User_Manual.md -o User_Manual.pdf --from markdown
```

Alternatively, open the Markdown files in a Markdown editor (VS Code) and export to PDF.
