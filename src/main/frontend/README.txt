TODO
----------------------------
- SNACK BAR like Google material UI has
- Filtration could look same as option buttons in new note - There will be filtration on the wall and when user for example chose icon, all wall notes that don't have appropriate icon hide.
- Login screen - highlight inputs
- First view/screen should have all notes like filter has
- Idle ping and redirect
- Remember-me, Email verification link
- Signup validations
- Facebook login, Google login


CONSIDER
----------------------------
- Optimistic AJAX request
- All actions extract to actions layer

REFACTOR
----------------------------
- Use dozer or at least create interface for converters (static)
- JSX components to ecmaScript6
- Use fullcalendar from npm
- Remake AJAX to Q promises and maybe use SuperAgent
- Save note on Ctrl + ENTER but every where, not only when I am focused in text area

REJECTED
----------------------------
- Use Bootswatch like Tom said _bootswatch.sass a variables include solo own - REASON it's too complicated and several ruby gems are needed, I don't want sass in my project
- React-bootstrap-datetimepicker - REASON It's impossible to change icons in buttons

QUESTIONS
----------------------------
- Why is not possible access this.props from event triggered callback in react class? Eg. reminder-block / ANSWER this.handleResize.bind(this)