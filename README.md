# Team
|Name|GitHub Username|
|----|---------------|
|Anthony Chiu | AChiuu13|
|Abhisheha Muthuswamy | abhishehamut|


# Working Agreement

-work will be split evenly
-check ins twice a week(Wednesday and Saturday) to keep each other updated
-Done PR means teammate has reviewed and make sure it follows requirements
-To resolve disagreements we will talk amongst ourselves and consult with professor if not resolution can be found

# About This Project

Our team wants to build a study group sign-up application that helps students find and join study groups for their courses. Students can browse active study groups or create their own. Organizers can select the subject, time, and place, and the number of people that can attend the session. It supports Computing for the common good by making it easier for students to collaborate and receive support academically outside the classroom.

# Installation and Setup

To run this project locally:

1. Clone the repository
```
  git clone https://github.com/Achiuu13/CS326-TEAM3.git
```

2. Navigate in to project folder:
```
  cd CS326-TEAM3/
```

3. Install Dependencies:
```
  npm install
```

4. Start the server:
```
  node server.js
```

5. Open your browser and visit:
```
http://localhost:3000
```

You should successfully see the StudyHub home page and landing.

## Sprint 2
Sprint 2 implements a layered architecture for the StudyHub application using routes, controllers, services, and repositories. Users can create a study group by filling out a form with the subject, meeting time, location, and capacity. The application validates the input, stores the study group in studyGroups.json, and redirects the user to the study groups page where all saved groups are displayed.

## System Diagram
```text
Browser
   │ GET /groups/new
   v
attachUser (sets req.user from session)
   │
   v
Routes(studyGroupRoutes.js) - requireLogin gate
   │
   v
Controller(studyGroupController.js)
   │
   v
Service(studyGroupService.js) - isOwnerOrAdmin check
   │
   v
Repository(studyGroupRepository.js)
   │
   v
MongoDB
   │
   v
Controller
   │
   v
Render groups.ejs page
```

## Sprint 3 Progress

Service Validation: Added trimming to prevent whitespace inputs and modified capacity validation to reject invalid non-numeric inputs, zero, and negative values.
MongoDB Repository: Replaced JSON file storage with a MongoDB repository and updated existing repository to use MongoDB CRUD methods.
Jest Tests: Added Jest tests for the service layer validation rules and successful group creation. Run tests with npm test.
HTMX Delete: Added an HTMX-powered delete button to the groups page that removes a group without a page reload.
Tailwind: Installed Tailwind and restyled the header with responsive classes. Run npm run build:css to rebuild styles

## Sprint 4 Progress

Authentication: added session-based authentication. User passwords are securely hashed with `bcrypt` and are never stored as plain text.

Users can now create an account at `/auth/signup`, log in at `/auth/login` and log out as well. The `User` model includes two roles namely `member` and `admin`. New accounts are deliberately assigned the `member` role during signup and there's no option to submit their own role.

Middleware: attaches the currently logged-in user to `req.user` allowing the authorization layer to determine which user is making a request.

Health Check: The application also provides `GET /health` which returns:
```json
{
  "status": "ok"
}
```

Authorization: enforced in two layers per Unit 18. `requireLogin` gates `GET /groups/new`, `POST /groups`, and `DELETE /groups/:id` at the route ("is anyone logged in"). The resource aware check, `isOwnerOrAdmin`, runs inside `studyGroupService.removeGroup` after the record is loaded, returning a real 403. Study groups carry an `ownerId` stamped at creation. To test: create a group as one user, log in as another and try to delete should be refused with a 403. An `admin` can delete any group.

Accessibility: every form control has a real `<label>` tied by `for`/`id`, replacing placeholder-only inputs. After an HTMX delete, focus moves to the next remaining button instead of being lost to `<body>`, and the result is announced via `aria-live`. Each delete button carries an `aria-label` naming its group.

Tests: suite now covers the authorization branches (403 for non-owner, admin override, 404 for missing). `npm test` — 10 passing.
