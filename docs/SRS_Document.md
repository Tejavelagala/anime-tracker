# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This SRS describes the functional and non-functional requirements for the Anime & TV Series Tracker application.

### 1.2 Scope
The application allows users to add and track shows, join clubs, post and comment, vote in polls, rate shows, and view analytics. Data is stored in browser localStorage.

## 2. Functional Requirements

FR-1: Users shall be able to add a show with title, total episodes, tags, spoiler/review and a status.

FR-2: Users shall be able to update watched episodes and status.

FR-3: Users shall be able to create clubs, add posts, and comment.

FR-4: Users shall be able to create polls and vote on them.

FR-5: The system shall provide a Discover page with AI-simulated recommendations filtered by user tags.

FR-6: The system shall persist data in localStorage and provide an Admin panel to reset data.

## 3. Non-Functional Requirements

- NFR-1: The system shall be responsive across desktop and mobile.
- NFR-2: The system shall not require a backend for demo operation.
- NFR-3: The system shall persist data locally for the current browser.

## 4. System Design

- Client-side SPA using React, Vite, Tailwind CSS.
- Routing via React Router DOM.
- Data layer: `src/utils/storage.js` (localStorage wrapper).

## 5. Use Cases

- Use Case: Add Show — User fills add-show form, system validates inputs, adds show to storage, and displays confirmation.
- Use Case: Rate Show — User selects star rating, system records rating in storage and updates average.

## 6. Traceability Matrix
- FR-1 → Watchlist.jsx (add form), storage.js (addShow)
- FR-4 → Polls.jsx, storage.js (addPoll, votePoll)
