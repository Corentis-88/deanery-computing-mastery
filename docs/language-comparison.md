# AQA programming-language comparison

AQA supports C#, Python 3 and VB.NET for exams from 2027. A learner writes assessed program code in one supported language. The Deanery's published curriculum identifies Python, so this course uses Python for deep practical fluency. The other columns help a teacher recognise equivalent concepts; they are not three separate mastery requirements.

| Concept | Python 3 | C# | VB.NET |
|---|---|---|---|
| Integer variable | `score = 0` | `int score = 0;` | `Dim score As Integer = 0` |
| Text input | `name = input()` | `string name = Console.ReadLine();` | `Dim name As String = Console.ReadLine()` |
| Integer conversion | `age = int(text)` | `int age = int.Parse(text);` | `Dim age As Integer = Integer.Parse(text)` |
| Selection | `if score >= 8:` | `if (score >= 8) { ... }` | `If score >= 8 Then ... End If` |
| Count loop | `for i in range(1, 6):` | `for (int i=1; i<=5; i++) { ... }` | `For i As Integer = 1 To 5 ... Next` |
| While loop | `while condition:` | `while (condition) { ... }` | `While condition ... End While` |
| Function header | `def double(x):` | `int Double(int x) { ... }` | `Function Double(x As Integer) As Integer` |
| Boolean operators | `and`, `or`, `not` | `&&`, `||`, `!` | `And`, `Or`, `Not` |

Syntax varies, but sequence, selection, iteration, data, parameters and return values are the same computational ideas. Always check the current AQA programming-language guidance before preparing candidates for an examination series.
