# Open-source software toolkit

The course uses a deliberately small set of inspectable tools. The included `install-open-source-tools.ps1` checks each exact winget package ID, skips packages already present and installs the five packages that completed unattended installation safely. It contains no uninstall, cleanup or deletion command.

Verified on this machine on 18 July 2026: Thonny 5.0.0, TurboWarp 1.16.0, LibreOffice 26.2.3.2, Krita 5.3.2.1 and Blender 5.2.0 are installed. Hash-verified official installers for DB Browser 3.13.1 and draw.io 30.3.14 are preserved in the sibling folder `computing-course-open-source-installers`; they are not committed to GitHub because the draw.io installer alone is over 150 MB.

| Tool | Exact winget ID | Course use | Licence | Official site |
|---|---|---|---|---|
| Thonny | `AivarAnnamaa.Thonny` | Python, debugger, variables, Tkinter | MIT | https://thonny.org/ |
| TurboWarp Desktop | `GarboMuffin.TurboWarp` | Scratch-compatible block projects offline | GPL-3.0 | https://desktop.turbowarp.org/ |
| LibreOffice | `TheDocumentFoundation.LibreOffice` | Calc spreadsheets/CSV and written evidence | MPL-2.0 | https://www.libreoffice.org/ |
| Krita | `KDE.Krita` | Raster graphics, pixels, colour and export | GPL-3.0 | https://krita.org/ |
| Blender | `BlenderFoundation.Blender` | 3D modelling and animation | GPL | https://www.blender.org/ |
| DB Browser for SQLite | `DBBrowserForSQLite.DBBrowserForSQLite` | Disposable relational database and SQL work; installer downloaded locally | MPL-2.0/GPL-3.0 | https://sqlitebrowser.org/ |
| diagrams.net Desktop | `JGraph.Draw` | Flowcharts, networks and architecture diagrams; installer downloaded locally | Apache-2.0 | https://www.diagrams.net/ |

Python 3 and Git were already available when this course was assembled. The course does not require Visual Studio or three programming toolchains: The Deanery publishes Python as its route; C# and VB.NET are supported AQA alternatives and appear in the recognition guide.

## Optional tools

- Wireshark is useful for inspecting your own authorised traffic or a public training capture. It is not installed automatically because capture drivers and permissions require a deliberate local decision. Never capture other people's traffic without explicit authority.
- The micro:bit Python Editor at https://python.microbit.org/ is open source and includes a browser simulator. Physical hardware is optional for the conceptual activity.
- Photopea and Code.org App Lab appear in the Deanery's published KS3 sequence, but they are web services rather than locally installed open-source packages. Krita and TurboWarp are used for transferable offline practice; the lesson text names the school context accurately.

## Opening the starter files

1. Download or clone the repository.
2. Open `.py` files from `activities/python` in Thonny.
3. Open CSV files from `activities/data` in LibreOffice Calc and confirm comma separation.
4. In DB Browser, create a new disposable database and use **Execute SQL → Open SQL file** with `activities/sql/library-setup.sql`.
5. Double-click `activities/logic-lab.html` to use it offline in a browser.

All datasets are fictional. Do not substitute live pupil data, credentials or real infrastructure details.
