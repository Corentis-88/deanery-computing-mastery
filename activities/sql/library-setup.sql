-- Disposable fictional SQLite training database. Safe to rerun in a new database.
PRAGMA foreign_keys = ON;

CREATE TABLE Author (
  AuthorID INTEGER PRIMARY KEY,
  Name TEXT NOT NULL
);

CREATE TABLE Book (
  BookID INTEGER PRIMARY KEY,
  Title TEXT NOT NULL,
  AuthorID INTEGER NOT NULL,
  Topic TEXT NOT NULL,
  Available INTEGER NOT NULL CHECK (Available IN (0, 1)),
  FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID)
);

INSERT INTO Author (AuthorID, Name) VALUES
  (1, 'Ada North'), (2, 'Sam Rivera'), (3, 'Mina Okafor');

INSERT INTO Book (BookID, Title, AuthorID, Topic, Available) VALUES
  (101, 'Algorithms by Hand', 1, 'Algorithms', 1),
  (102, 'Packets and Paths', 2, 'Networks', 0),
  (103, 'Data Has Meaning', 3, 'Data representation', 1),
  (104, 'Python Patterns', 1, 'Programming', 1),
  (105, 'Safer Systems', 2, 'Cyber security', 0);

-- Challenges:
-- 1. Select available titles ordered by title ascending.
-- 2. Join Book to Author and show Title with author Name.
-- 3. Insert BookID 106 with a valid AuthorID.
-- 4. Preview then update BookID 102 to Available = 1.
-- 5. Insert a temporary record, preview it, delete it by primary key, and verify.
